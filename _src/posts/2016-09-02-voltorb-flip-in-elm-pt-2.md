    Title: Voltorb Flip in Elm pt 2
    Date: 2016-09-02T08:06:38
    Tags: Functional Programming, Elm, Pokemon

Last week I wrote a [post][pt1] about my progess implementing the Pokemon
mini-game [Voltorb Flip][flip]. I was struggling with a bug related to generating
a new game, but the [elm mailing list][elm-discuss] helped me out
([Thanks Joseph Ni][thanks]). In this post I'll talk about [Elm][elm], my implementation, and
a sample application used in [The Elm Guide][teatut].

<!-- more -->

### Starting With the End

So, in the interest of showing off my work, here is the game. There is a CSS bug,
but... meh. CSS isn't really my focus right now. I've only been working in the browser
for about two weeks. I'll get to CSS later.

As a reminder. The green/red text in the gray cells tell you how many points/mines are
in that row/column. Exposing a mine causes you to lose. Exposing all the points > 1
causes you to win.
 
<div id="voltorb-flip"></div>
<script src="/js/voltorb-flip-2.js"></script>
<script>
var node = document.getElementById('voltorb-flip');
var app = Elm.Game.Main.embed(node);
</script>
</div>

### The Elm Architecture

It might be tempting to start by describing the Elm *language*,
but I'm not sure how useful that would be. The issue with describing the language first
comes from two main points.

1. It seems that the language is designed with [The Elm Architecture][tea] in mind.
   So, describing the language by itself wouldn't tell the higher level story of
   how you will almost certainly use the language.
2. If describing the language would be exciting to you, you are probably already sold.
   It is kind of the preaching to the choir problem. If "Purely Functional", "Reactive",
   and "Managed Effects" sound exciting to you, my job is already done. If they sound like a
   headache, I want to base the conversation in more familiar terms and walk us towards
   an understanding of why those ideas fit nicely.

As far as I can tell, all Elm applications are built in terms of a pattern/library 
called [The Elm Architecture][tea] (TEA). If you are familiar with the [Model-View-Controller][mvc]
pattern, you are more than halfway there. TEA is defined by three main components:
the model, the update function, and the view function.

My sense of the architecture sounds something like this.

1. Describe the shape of a state in the application.
2. Describe how to produce new state.
2. Describe how to view a given state.

Once you provide these pieces to TEA, it will handle the event loop.

### The Model

The model is the data that represents the state of your application.
Considering the Elm guide's [simple increment/decrement counter web app][counter] example,
the state of your application is the number of times the user has clicked the button.
That means that your model is just an Int not a class derived from some model-ish parent class.
Just an int.
If the user has clicked the increment button 3 times and the decrement button 6 times, the state
of the application should be -3.
In Elm, this looks like this.

```elm
type alias Model = Int
```

Voltorb flip is a bit more complex than a counter, so I have a more complex model.
My model represents the state of the game.
The game is in one of 4 possible states: NoGame, Playing, Won, and Lost.
The Playing, Won, and Lost states have some additional information alongside them.
They also know the state of the Board.
A Board is a combination of three pieces of data: the location of the mines, the location
of cells the user has exposed, and the locations and point values of the target cells.
In Elm, this looks like the following code.

```elm
{-
The state of the game is one of:
    No Game is currently being played
    Currently playing the provided Board
    Won the provided Board
    Lost the provided Board
-}
type Model
    = NoGame           
    | Playing Board    
    | Won Board        
    | Lost Board       

{-
A Board is each of:
    A Set of (row, column) pairs that locate the mines.
    A Set of (row, column) pairs that locate the exposed cells.
    A Dictionary mapping (row, column) pairs to point values.
-}
type alias Board =
    { mines : Set (Int, Int)
    , exposed : Set (Int, Int)
    , targets : Dict (Int, Int) Int }
```

That, in its entirety, is my model for a game of Voltorb Flip. Of course, any novel data
structure needs to have operations defined for it, and this model is no different. I define
plenty of functions that use a Model to produce some new value.
For example, the player wins the game when they expose all the target values. That sounds like
a function from Board to Bool. And that is exactly what I wrote. The function takes a Board,
and it evaluates to true if the set of target locations minus the set of exposed locations
is empty. 

```elm
allTargetsExposed : Board -> Bool
allTargetsExposed board =
    let targetPoss =
            board.targets
            |> Dict.keys
            |> Set.fromList
    in Set.diff targetPoss board.exposed
       |> Set.isEmpty
```

The point is not Elm's syntax. The point is that a Model in TEA is just data.
Simple data that is only as decorated as *you* need it to be. If the state of my application is
an integer, that is totally fine.

### The Update Function

Now that we have a description of the state of our application, we want a way to find out
the next state. I'll go ahead and show the signature for the function and unpack from there.

```elm
update : Msg -> Model -> (Model, Cmd Msg)
```

In English, the update function uses a Msg, a Model, and it evaluates to a (Model, Cmd Msg) pair.
So there are two new pieces in there: Msg, and Cmd. I'll touch on Cmd, but mostly focus on Msg.

#### Msg

An Msg value is a description of what kind of update should be applied to the Model.
In the counter example, there are two kinds of updates that can be applied: Increment, Decrement.
Here is the elm to describe that new data type.

```elm
type Msg
    = Increment
    | Decrement
```

Given these possible Msg values (ignoring that whole Cmd thing),
you could imagine that update would do something like this:

```elm
update Increment 1 -- should evaluate to (2, ???)
update Increment 9000 -- should evaluate to (9001, ???)
update Decrement 43 -- should evaluate to (42, ???)
```

In Voltorb Flip, I have 3 possible messages: location can become exposed, a new game can be
requested, and a new board can be initialized.
Here is the elm to describe that new data type.

```elm
type Msg
    = NewBoard Board
    | Expose Int Int
    | NewGame
```

The difference between NewBoard and NewGame is subtle (and possibly because I'm doing something
wrong). So for right now, we can think about it as either exposing a cell or starting a new game.
If you were in an object-oriented environment, these would probably be your public methods.

#### Cmd

At this point, you might be comfortable with the idea of taking a Msg, taking a Model,
and producing a new Model. So let's get to the weirdest thing we've seen so far.

So far, we haven't actually used anything specific to TEA; we've just let TEA guide our use of
the language. Cmd is our first explicitly TEA construct. At the beginning of the post I
said that TEA will manage the event loop for the application, and Cmd is the language
TEA speaks. Cmd is a data structure that describes something TEA should do for you.

That might sound a bit odd. You might ask yourself,
"Do something for me? As in, there are things I can't do?"
So, yes and yes. Remember those buzzwords "Purely Functional" and "Managed Effects"?
This is where those start to get big.

And before the idea sounds too harsh, I would encourage you to consider something.
As programming languages (and frameworks) have evolved over time,
I think we have gotten a lot of leverage by constraining the programmer.
We are constrained by structured programming.
We are constrained by automatic memory management.
We are constrained by static type systems.
Sometimes they don't work out, but they can be great.
So, however outlandish these ideas may sound, remember how ludicrous removing goto sounded.
Okay, so back to your regularly scheduled programming.

Right, so in a language like python (not purely functional, has *unmanaged* effects), if I want
a random integer between 0 and 100, I call the randint function from the random module.
That function gives me back an integer between some bounds that I specify.

```python
import random
definitely_an_integer = random.randint(100)
probably_a_different_integer = random.randint(100)
```

I can't do this in Elm. Generating that random number involves executing a side-effect.
If I want a random number, I have to ask TEA for that random number.
And TEA speaks Cmd, so I need to find a way to create a Cmd that describes generating
my random number. Sure enough, [Elm's Random module][elm-random-generate] has a way for me to
turn a Random.Generator (you guessed it, a description of the random value) into a Cmd.

```elm
import Random exposing (..)

int_generator : Random.Generator Int
int_generator = Random.int 0 100

-- Imagine my Msg type for some app is just an Int
type alias Msg = Int

cmd_for_tea : Cmd Int
cmd_for_tea = Random.Generate identity int_generator
```

Creating a new voltorb flip game involves some random value generation,
and this is why I have both NewGame and NewBoard Msgs.
NewGame is there to ask TEA to create a NewBoard with the randomly generated Board.
NewBoard is to construct a new Model with a (possibly randomly generated) Board.
Expose is there to expose a cell in the current Board. So here is my update function.

```elm
update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        NewBoard board -> (Playing board, Cmd.none)
        Expose row column -> (expose model row column, Cmd.none)
        NewGame -> (model, Random.generate NewBoard randomBoard)
```

That's it. You'll notice a helper function `expose`. You might be able to infer what it does.
It takes a Model, an Int, an Int, and evaluates to the Model where the corresponding cell
has been exposed. 

So to summarize Msg and Cmd.

1. Msg is the language your application speaks. 
2. Cmd is the language TEA speaks.
3. If you need some side effect performed, you to give TEA a Cmd describing it.

### The View Function

While the idea of a Model being basic data might be somewhat "back to basics," the view function
is an idea that is very much in vogue. The view function is a function that takes in a Model and
evaluates to a data structure representing HTML. Facebook's UI building library [React][react]
is popularizing this idea using the name [virtual DOM][vdom].

We've come a long way now, so let's just throw out the counter view.

```elm
view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (toString model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
```

If you've done any React work, this might feel pretty familiar.
In this case, the view for this application is a div containing two buttons and a div
that shows the string conversion of the model (Elm won't silently turn an Int into a String).

There is an interesting thing about the Html data structure.
It is `Html Msg` instead of plain `Html`.
Understandably, the Html you produce is expected to be able to feed an Msg that your
application understands back into your update function.
So, when a user clicks on the first button, TEA will call update with Decrement and the current model.
It will use the result of that call as the new application state and execute the Cmd.
Here is a bit of the voltorb flip view code.

```elm
view : Model -> Html Msg
view model =
    case model of
        NoGame -> restartButton
        Playing board -> viewBoard board
        Won board -> 
            div [] [ text "You Win!"
                   , viewBoard {board | exposed = allPoss} ]
        Lost board ->
            div [] [ text "You Lose!"
                   , viewBoard {board | exposed = allPoss}]

restartButton : Html Msg
restartButton =
    button [ onClick NewGame ] [ text "Click to Restart" ]
```

Again, you probably noticed the `viewBoard` helper function.
It takes a `Board` and evaluates to `Html Msg`.

### Final Thoughts

I've really enjoyed writing this app.
Elm is a great fit for me, and TEA provided a great way to help me break down
my application into simple pieces (that stay simple pieces).

Personally, I came to Elm for the language features.
I'm a big fan of functional programming (particularly ML style languages)
and interested in anything labelled Reactive.

I've come to believe a few things:

1. Most developers don't become visibly excited when they hear
   "purely functional, reactive ML in the browser" (I may have actually squealed).
   So, people might be more interested in TEA, and then learn how to love
   pure functional programming through the wins that TEA gives you.
2. Elm + TEA is great. It even seems that plenty of devs are moving towards
   it [one][react] .. [js][redux] ..  [library][lodash] ..  at a [time][flow] ([or maybe typescript][typescript]).
3. The Elm community is pretty great. My question to the mailing list was answered correctly
   within 24 hours (of a Friday evening post).
4. The Elm compiler is pretty remarkable. I dare you to find a compiler that is more interested
   in *helping* a developer (of any skill level) correct their code. I won't spoil your first
   compiler error for you. Go write some incorrect Elm code; learn to see compilers in a new light.

### Next Week : Robot Voltorb Flip


[pt1]: blog/2016/08/26/voltorb-flip-in-elm/ "Voltorb Flip In Elm"
[flip]: http://bulbapedia.bulbagarden.net/wiki/Voltorb_Flip "Voltorb Flip"
[elm-discuss]: https://groups.google.com/forum/#!forum/elm-discuss "Elm-Discuss"
[thanks]: https://groups.google.com/forum/#!msg/elm-discuss/_MW_1EF9jSE/dNKNqMvFBwAJ;context-place=forum/elm-discuss "Thanks!"
[elm]: http://elm-lang.org "Elm"
[teatut]: http://guide.elm-lang.org/architecture/user_input/buttons.html "Sample Application"
[tea]: http://guide.elm-lang.org/architecture/ "The Elm Architecture"
[mvc]: https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller "MVC"
[counter]: http://guide.elm-lang.org/architecture/user_input/buttons.html "Counter Example"
[react]: https://facebook.github.io/react/ "React"
[vdom]: https://facebook.github.io/react/docs/glossary.html "Virtual DOM"
[elm-random-generate]: http://package.elm-lang.org/packages/elm-lang/core/latest/Random#generate "Random.generate"
[redux]: http://redux.js.org/ "Redux"
[lodash]: https://lodash.com/ "Lodash"
[flow]: https://flowtype.org/ "Flow"
[typescript]: https://www.typescriptlang.org/ "Typescript"
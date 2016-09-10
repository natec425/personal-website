    Title: Short Post: Voltorb Flip AI
    Date: 2016-09-09T21:40:08
    Tags: Functional Programming, Elm, Pokemon, AI

So this week is going to be super short. I finished a
first pass at getting a (possibly bad) AI to auto play
the game. Also, I'm still enjoying Elm a lot. I feel like
I don't have to dread the browser anymore.

<!-- more -->

### Super Simple AI

Go forth and earn me unusable points.

<div id="voltorb-flip"></div>
<script src="/js/voltorb-flip-3.js"></script>
<script>
var node = document.getElementById('voltorb-flip');
var app = Elm.AI.Main.embed(node);
</script>
</div>

Currently the AI has uses some notion of expected points
per cell. For example, a cell that must be either a 2 or a 3
should have an expected value of 2.5 The just exposes the
cell with the highest expected points until it wins or loses.

### Elm has been great

So far the project is about 500 lines of elm, and it has been a pleasure.
It has been surprisingly pleasant to add or change features. I would be
interested to see what this project would look like if it were implemented
using javascript/typescript/coffeescript/etc. I don't know if my implementation
would be or worse. In fact, I would bet mine would be worse in some ways.
I wouldn't be surprised if my implementation was more correct or maintainable.
Elm can take a good bit of credit for helping with that. But my use of non-Elm
web tech should probably be pretty poor. Also, my use of Elm should probably
be pretty poor (less than 1 month of experience).

The code is [up on github](https://github.com/natec425/Voltorb-Flip).
Feel free to disapprove of the lack of documentation or tests.
I approve of your disapproval and hope to fix it soon.

But hey, at least I don't hate the browser anymore.

### Next Week

A student at Base Camp keeps asking me to make a learning AI.
Maybe I'll make another bad AI, but this time... it will learn.
No click bait deep learning. Just regular old vanilla reinforcement.
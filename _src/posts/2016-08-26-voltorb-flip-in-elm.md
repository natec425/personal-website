    Title: Voltorb Flip in Elm
    Date: 2016-08-26T11:09:18
    Tags: Functional Programming, Elm, Pokemon


We all suffer from attacks of nostalgia, and I'm no different.
Unfortunately, many of my weaknesses drive me to do ludicrous things like
re-subscribe to [World of Warcraft][wow],
listen to crappy emo bands (I'll spare you the links),
or ... acquiring ... the latest Pokemon game.
I'll be honest, I'm not super proud of the last one.
I've never been one to pirate anything, but I have occasionally
convinced myself that I should grab the latest ROM,
burn 2 hours of my life away, and continue about my business.
So of course, [Pokemon Go][go] should have tossed
me off the bandwagon, but this time around the fan-made
[Pokemon Uranium][uranium] caught my fall into piracy.

<!-- more -->

In Pokemon Uranium (and apparently [HeartGold and SoulSilver][goldSilver]),
there is a minesweeper-esque mini-game called [Voltorb Flip][flip].
I thought the game was neat, and a few of the students at [Base Camp Coding Academy][bcca]
are Pokemon fans, so I thought it could provide an opportunity to talk about what a simple
AI for the game might look like. Of course, [the internet has already done it][flipBot],
but education is often about rolling your own. I typically hate front-end development,
but when I heard there was a [Reactive][reactive] [ML][ml] in the browser ([Elm][elm]) I thought
I should give it a shot.

### Buggy Pokemon

The game is almost finished, but there is a bug related to generating a new game.
The goal of the game is to expose all the cells that contain a 2 or a 3 and not expose a mine.
The numbers at the ends of the columns/rows indicate the number of points (green) and mines (red)
in that row or column.
Feel free to poke around with my broken implementation.   

<div id="voltorb-flip"></div>
<script src="/js/voltorb_flip.js"></script>
<script>
    var node = document.getElementById('voltorb-flip');
    var app = Elm.Game.embed(node);
</script>
</div>

Not the sexiest bit of front end work, but I'll take it.  Next week, I hope to post
a corrected implementation. Expect plenty of technical detail on working with Elm
and where I went wrong this week.


[elm]: http://elm-lang.org "Elm"
[flipBot]: http://www.voltorbflip.com/ "Voltorb Flip Solver"
[wow]: https://worldofwarcraft.com/en-us/ "World of Warcraft"
[go]: http://www.pokemongo.com/ "Pokemon Go"
[uranium]: http://www.pokemonuranium.com/ "Pokemon Uranium"
[goldSilver]: http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_HeartGold_and_SoulSilver_Versions "HeartGold and SoulSilver"
[flip]: http://bulbapedia.bulbagarden.net/wiki/Voltorb_Flip "Voltorb Flip"
[bcca]: https://basecampcodingacademy.org/ "Base Camp Coding Academy"
[reactive]: https://en.wikipedia.org/wiki/Reactive_programming "Reactive Programming"
[ml]: https://en.wikipedia.org/wiki/ML_(programming_language) "ML"
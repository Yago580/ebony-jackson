# Ebony Jackson

Ebony Jackson is a blackjack game that I designed with JavaScript and jQuery. play online [here!](https://ebony-jackson.herokuapp.com)
![game screenshot](/images/screenshot.png)


### the code
I tried an interesting design pattern on this app by extracting all of the Dom interactions into a seperate api.

```javascript

// src/apis.js
var Dom = (function() {
  var exports = {};

  exports.newGame = function(players) {
    refreshDisplay();
    players.forEach(function (player) {
      updateHandTotal(player);
    });
  }

  exports.hideControls = function() {
    $('.control').hide();
  }
  
  //etc ...
  
    // private
  function imageFrom(card) {
    var src = card.hidden ? card.imageBack : card.image
    var $image = $('<img>').addClass('card').attr('src', src);
    if (card.doubleDown)
      $image.addClass('double-down');
    return $image
  }
  
  // etc....

}

// src/game.js
Dom.newGame(allPlayers);
```
Not sure if this is the best way to go about building a javascript app, but namespacing the Dom interactions definitely helped me organize my code and maximize readability.

If you would like to contribute there is a list at the top of `src/game.js` that details a bunch of features/minor bug fixes that I haven't been able to get around to yet. Feel free to take a crack at them!

There is one pattern that I adopted while writing the code for this app that I really like and intend to continue using: setting `onclick` and `onsubmit` attributes inline in html. I found this to be a lot cleaner than adding a bunch of event listeners with jQuery like I normally do.

All of the game logic is in `src/game.js`


### Run Locally

+ fork and cd into repo
+ `node server.js`
+ open https://localhost:8080

### Run Specs

+ https://localhost:8080/Specrunner.html

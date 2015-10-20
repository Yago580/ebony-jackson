# Ebony Jackson

Ebony Jackson is a blackjack game that I designed with JavaScript and jQuery. play online [here!](https://ebony-jackson.herokuapp.com)
![game screenshot](/images/screenshot.png)


### the dom
I tried an interesting design pattern on this app by extracting all of the Dom interactions into a seperate api. This gave me a clean interface I could use rather than littering all the game logic with jQuery Dom manipulation

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
  
  exports.updateHand = function(player) {
    player.hand.forEach(function (card, index) {
      if (!card.dealt)
        appendCard(player, card, index);
    });
    updateHandTotal(player);
  }
  
  //etc ...
  
  // private
  function appendCard(player, card, index) {
    var cardSlot = cardSlotFrom(player, card, index);
    cardSlot.append(imageFrom(card));
    $('.tableContainer').append(cardSlot);
  }
  
  function imageFrom(card) {
    var src = card.hidden ? card.imageBack : card.image
    var $image = $('<img>').addClass('card').attr('src', src);
    if (card.doubleDown)
      $image.addClass('double-down');
    return $image
  }
  
  // etc....
  return exports;
})();
```
Not sure if this is the best way to go about building a javascript app, but namespacing the Dom interactions definitely helped me organize my code and maximize readability.


### onclick / onsubmit

There is one pattern that I adopted while writing the code for this app that I really like and intend to continue using: setting `onclick` and `onsubmit` attributes inline in html. I found this to be a lot cleaner than adding a bunch of event listeners with jQuery like I normally do.

```html
<!-- onclick property -->
<div class="chips control" id="betControls" hidden>
    <input type="image" src="images/chips/25.png" class="chip" onclick="postBet(25)">
    <input type="image" src="images/chips/50.png" class="chip" onclick="postBet(50)">
    <input type="image" src="images/chips/75.png" class="chip" onclick="postBet(75)">
    <input type="image" src="images/chips/100.png" class="chip" onclick="postBet(100)">
</div>
```
Writing the html like this allowed the `postBet()` function to be really simple and clean.
```javascript
function postBet(amount) {
  player.postBet(amount);
  Dom.updateBalance(player);
  Dom.dealButton($(event.target).parent());
}
```

### contribute

If you would like to contribute there is a list at the top of `src/game.js` that details a bunch of features/minor bug fixes that I haven't been able to get around to yet. Feel free to take a crack at them!

#### Run Locally

+ fork and cd into repo
+ `node server.js`
+ open https://localhost:8080

#### Run Specs

+ https://localhost:8080/Specrunner.html

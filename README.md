# Ebony Jackson

![game screenshot](/images/screenshot.png)
Ebony Jackson is a blackjack game that I designed with JavaScript and jQuery. play online [here!](https://ebony-jackson.herokuapp.com)

### Contribute

If you would like to contribute there is a list at the top of `src/game.js` that details a bunch of features/minor bug fixes that I haven't been able to get around to yet. Feel free to take a crack at them! And please write specs for any code that's added!

##### Run Locally

+ fork and cd into repo
+ `node server.js`
+ open https://localhost:8080
+ spec https://localhost:8080/SpecRunner.html

### Patterns
I'd love to discuss some of the patterns that I used when writing this code. I tried to really plan out the design of this game in advance in order to better organize the JavaScript functionality.

##### Dom
I tried an interesting design pattern on this app by extracting all of the Dom interactions into a seperate api. In the past when trying to create an interactive app I wouldn't organize and decouple the code. This caused a lot of headaches when trying to change code deeply nested in non descriptive callbacks. Organizing Dom functionality in this way created a clean interface that was easy to work with.

##### onclick / onsubmit

There is one pattern that I adopted while writing the code for this app that I really like and intend to continue using: setting `onclick` and `onsubmit` attributes inline in html.

```html
<!-- onclick property -->
<div class="chips control" id="betControls" hidden>
    <input type="image" src="images/chips/25.png" class="chip" onclick="postBet(25)">
    <input type="image" src="images/chips/50.png" class="chip" onclick="postBet(50)">
    <input type="image" src="images/chips/75.png" class="chip" onclick="postBet(75)">
    <input type="image" src="images/chips/100.png" class="chip" onclick="postBet(100)">
</div>
```
This allowed functions like `postBet()` in `src/game.js` to be really simple.
```javascript
function postBet(amount) {
  player.postBet(amount);
  Dom.updateBalance(player);
  Dom.dealButton($(event.target).parent());
}
```

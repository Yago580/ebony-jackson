/**
 * GAME FLOW
 * 1. Prompt user for bet
 * 2. Deal Cards (two cards, dealers second card is face down)
 * 3. User can hit or stand (or keep hitting until bust/21)
 * 4. If User stands, Dealer will hit until >= 17,
 * 5. Unless Dealer bust/21, compare User and Dealer's hand and award winner.
 **/




/**
 * Game Module
 * - can initialize game
 * - can keep track of player's turns
 * - can compare player's hands and reward winner
 * - can prompt player to restart game?
 *
 * Player
 * - can hit
 * - can stay
 * - can bet
 * - can evaulate whether hand bust/21
 *
 * Dealer
 * - can hit until hand is >= 17
 * - can evaluate whether hand bust/21
 *
 * Deck
 * - can be drawn from
 * - can shuffle itself
 *
 * Card (may not need constructor)
 * - has a value
 * - has a name
 **/




function Card(name, suit) {
  this.name  = name;
  this.suit  = suit;
  this.value = getValue(name);
  this.image = imageUrl(name);

  function getValue(name) {
    var faceCards = {'Ace':1, 'Jack':10, 'Queen':10, 'King':10}
    if (parseInt(name)) return parseInt(name);
    return faceCards[name];
  }

  function imageUrl(name) {

  }
}




function Deck() {
  var suits  = ['Diamonds','Clubs','Hearts','Spades'];
  var faces  = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King']
  
  this._cards = shuffle(buildDeck());

  function buildDeck() {
    var deck = [];
    suits.forEach(function (suit) {
      faces.forEach(function (face) {
        deck.push(new Card(face, suit));
      });
    });
    return deck;
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
Deck.prototype.drawCard = function() {
  return this._cards.pop();
}


var deck = new Deck();
console.log(deck.drawCard());

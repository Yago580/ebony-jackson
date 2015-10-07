"use strict";

function Card(name, suit) {
  this.name  = name;
  this.suit  = suit;
  this.amount = getValue();
  this.image = imageUrl();
  this.dealt = false;

  function getValue() {
    var faceCards = {'A':1, 'J':10, 'Q':10, 'K':10}
    if (parseInt(name)) return parseInt(name);
    return faceCards[name];
  }

  function imageUrl() {
    return '/images/cards/card_'+name+suit+'.png'
  }
}



function Deck() {
  var suits  = ['diamonds','clubs','hearts','spades'];
  var faces  = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
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
Deck.prototype.getCard = function() {
  return this._cards.pop();
}




function User(name) {
  this.name     = name;
  this.balance  = 2000;
  this.bet      = 0;
  this.domClass = 'player';
  this.topPos   = 415;
}
User.prototype = Object.create(CardPlayer.prototype);
User.prototype.postBet = function(amount) {
  this.balance -= amount;
  this.bet = amount;
}
User.prototype.winBet = function() {
  this.balance += this.bet * 2;
  this.bet = 0;
}
User.prototype.loseBet = function() {
  this.bet = 0;
}




function Dealer() {
  this.hitting  = true;
  this.deck     = new Deck();
  this.domClass = 'dealer';
  this.topPos   = 75;
}
Dealer.prototype = Object.create(CardPlayer.prototype);
Dealer.prototype.hit = function(card) {
  this.hand.push(card);
  if (this.handTotal() >= 17) {
    this.hitting = false;
  }
}
Dealer.prototype.dealCard = function(player) {
  player.hit(this.deck.getCard());
}
Dealer.prototype.dealHands = function(players) {
  players.forEach(function (player) {
    player.hit(this.deck.getCard());
    player.hit(this.deck.getCard());
  }, this)
}





function CardPlayer() {
  this.hand = [];
}
CardPlayer.prototype.hit = function(card) {
  this.hand.push(card);
}
CardPlayer.prototype.unDealtCards = function() {
  return this.hand.filter(function (card) {
    return !card.dealt;
  });
}
CardPlayer.prototype.discardHand = function() {
  this.hand = [];
}
CardPlayer.prototype.bust = function() {
  return this.handTotal() > 21;
}
CardPlayer.prototype.twentyOne = function() {
  return this.handTotal() === 21;
}
CardPlayer.prototype.handTotal = function() {
  if (this.hand.length === 1)
    return this.hand[0].amount;

  var aces = getAces(this.hand);
  var regValues = getValues(getRegs(this.hand));
  var handTotal = regValues.reduce(function (a, b) {
    return a + b;
  });

  if (aces.length > 1 && handTotal > 9) {
    aces.forEach(function (value) {
      handTotal += 1;
    })
  } else {
    aces.forEach(function (value) {
      handTotal += (handTotal < 11) ? 11 : 1;
    });
  }


  return handTotal;

  function getAces(hand) {
    return hand.filter(function (card) {
      return card.amount === 1;
    })
  }

  function getRegs(hand) {
    return hand.filter(function (card) {
      return card.amount !== 1;
    })
  }

  function getValues(hand) {
    return hand.map(function (card) {
      return card.amount;
    });
  }

}

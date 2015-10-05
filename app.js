Array.prototype.rotate = (function() {
    // save references to array functions to make lookup faster
    var push = Array.prototype.push,
        splice = Array.prototype.splice;

    return function(count) {
        var len = this.length >>> 0, // convert to uint
            count = count >> 0; // convert to int

        // convert count to value in range [0, len)
        count = ((count % len) + len) % len;

        // use splice.call() instead of this.splice() to make function generic
        push.apply(this, splice.call(this, 0, count));
        return this;
    };
})();





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






function Game() {
  this.deck        = new Deck();
  this.dealer      = new Dealer();
  this.currentBet;
}
Game.prototype.takeBet = function(player, amount) {
  player.postBet(amount);
  this.currentBet = amount;
}
Game.prototype.dealCard = function(player) {
  player.hit(this.deck.getCard());
}
Game.prototype.dealCards = function(player) {
  this.dealCard(player);
  this.dealCard(player);
}






function Player(name) {
  this.name     = name
  this.hand     = [];
  this.balance  = 2000;
  this.domClass = 'player';
  this.bet      = 0;
}
Player.prototype.postBet = function(amount) {
  this.balance -= amount;
  this.bet = amount;
}
Player.prototype.hit = function(card) {
  this.hand.push(card);
}
Player.prototype.unDealtCards = function() {
  return this.hand.filter(function (card) {
    return !card.dealt;
  })
}
Player.prototype.winBet = function(amount) {
  this.balance += amount * 2;
}
Player.prototype.discardHand = function() {
  this.hand = [];
}
Player.prototype.bust = function() {
  return this.handTotal() > 21;
}
Player.prototype.twentyOne = function() {
  return this.handTotal() === 21;
}
Player.prototype.handTotal = function() {
  if (this.hand.length === 1)
    return this.hand[0].amount;

  var aces = getAces(this.hand);
  var regValues = getValues(getRegs(this.hand));
  var handTotal = regValues.reduce(function (a, b) {
    return a + b;
  });

  aces.forEach(function (value) {
    handTotal += (handTotal < 11) ? 11 : 1;
  });

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





function Dealer() {
  this.hand     = [];
  this.domClass = 'dealer';
  this.hitting  = true;
}
Dealer.prototype.hit = function(card) {
  this.hand.push(card);
  if (this.handTotal() >= 17) {
    this.hitting = false;
  }
}
Dealer.prototype.unDealtCards = function() {
  return this.hand.filter(function (card) {
    return !card.dealt;
  })
}
Dealer.prototype.discardHand = function() {
  this.hand = [];
  this.hitting = true;
}
Dealer.prototype.bust = function() {
  return this.handTotal() > 21;
}
Dealer.prototype.twentyOne = function() {
  return this.handTotal() === 21;
}
Dealer.prototype.handTotal = function() {
  if (this.hand.length === 1)
    return this.hand[0].amount;

  var aces = getAces(this.hand);
  var regValues = getValues(getRegs(this.hand));
  var handTotal = regValues.reduce(function (a, b) {
    return a + b;
  });

  aces.forEach(function (value) {
    handTotal += (handTotal < 11) ? 11 : 1;
  });

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

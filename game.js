"use strict";

// account for ties
// if dealer has > 17 and is going to lose.. dealer should hit
// check hand at beginning of game
// allow for more cards and make card positioning better
// redesign ace logic... 2 aces sometimes comes out to 11 and 1
  // instead of 1 and 1
// possibly hideAll() and showAll() functions for dom api
  // instead of toggleButton

var deck        = new Deck();
var player      = new User('Yag');
var dealer      = new Dealer();
var allPlayers  = [player, dealer];


function newGame() {
  Game.newGame(allPlayers);
  Dom.removeCards();
  Dom.toggleButton(event.target, '#betControls');
}

function postBet() {
  event.preventDefault();
  var bet = Dom.getBet(event.target);

  Game.postBet(player, bet);
  Dom.updateBalance(player);
  Dom.toggleButton(event.target, '#deal');
}

function dealHands() {
  Game.dealHands(allPlayers);
  Dom.dealAllHands(allPlayers);
  Dom.toggleButton(event.target, '.hitStay');
  // need to check for 21
}

function hitPlayer() {
  Game.dealCard(player);
  Dom.updateHand(player);
  playerBustCheck(player);
}

function dealerTurn() {
  while (dealer.hitting) {
    Game.dealCard(dealer);
    Dom.updateHand(dealer);
  }
  findTheWinner();
}


// private
function playerBustCheck(player) {
  var handCheck = Game.checkHand(player);
  if (handCheck === 'bust') return playerLoses();
  if (handCheck === '21')   return playerWins();
}

function findTheWinner() {
  var handCheck = Game.checkHand(dealer);
  if (handCheck === 'bust') return playerWins();
  if (handCheck === "21")   return playerLoses();

  if (Game.playerWins(player, dealer))
    playerWins();
  else
    playerLoses();
}

function playerWins() {
  alert('you win!!!!');
}

function playerLoses() {
  alert('you lose!!!!');
}

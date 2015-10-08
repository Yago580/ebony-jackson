// add split pair logic
// bet persistence
// show dealer hand total after card is no longer hidden
// if you win on deal you shouldn't have control buttons still
// make buttons very close together, big, and easy to use
// what happens if player and dealer both get 21 on the draw??
// plus sign animation on balance when you win, minus when u lose

"use strict";

var player      = new User('Yag');
var dealer      = new Dealer();
var allPlayers  = [player, dealer];


Dom.updateBalance(player);


function newGame() {
  refreshHands();
  Dom.newGame(allPlayers);
  Dom.betControls(event.target);
}


function postBet() {
  event.preventDefault();
  var bet = Dom.getBet(event.target);

  if (bet) {
    player.postBet(bet);
    Dom.updateBalance(player);
    Dom.dealButton(event.target);
  }

}


function dealHands() {
  dealer.dealHands(allPlayers);
  dealer.hideCard();
  Dom.dealHands(allPlayers);

  if (player.twentyOne()) {
    playerWins();
    Dom.hideControls();
  } else if (dealer.twentyOne()) {
    dealer.showCard();
    Dom.updateHand(dealer);
    Dom.hideControls();
    playerLoses();
  }

  Dom.hitStandButtons(event.target);
}


function hitPlayer() {
  dealer.dealCard(player);
  Dom.updateHand(player);

  if (player.twentyOne())
    playerWins();
  else if (player.bust())
    playerLoses();
}


function doubleDown() {
  player.doubleDown();
  dealer.doubleDown(player);
  Dom.updateHand(player);
  Dom.updateBalance(player);
  Dom.hideControls();

  if(player.twentyOne())
    playerWins();
  else if (player.bust())
    playerLoses();
  else
    setTimeout(dealerTurn, 1500);
}


function dealerTurn() {
  dealer.showCard();
  Dom.updateHand(dealer);

  while (dealer.hitting) {
    dealer.dealCard(dealer);
    Dom.updateHand(dealer);
  }

  if (dealer.twentyOne()) {
    playerLoses();
  } else if (dealer.bust()) {
    playerWins();
  } else if (tie()) {
    playerPush();
  } else {
    findWinner();
  } 
}





// Helpers
function findWinner() {
  player.handTotal() > dealer.handTotal() ? playerWins() : playerLoses()
}

function tie() {
  return player.handTotal() === dealer.handTotal();
}

function refreshHands() {
  allPlayers.forEach(function (player) {
    player.discardHand();
    player.hitting = true;
  })
}

function playerWins() {
  Dom.gameMessage('You win!');
  player.winBet();
  Dom.updateBalance(player);
  Dom.newGamePrompt();
}

function playerLoses() {
  Dom.gameMessage('You lose!');
  player.loseBet();
  Dom.updateBalance(player);
  Dom.newGamePrompt();
}

function playerPush() {
  Dom.gameMessage('Push!');
  player.pushBet();
  Dom.updateBalance(player);
  Dom.newGamePrompt();
}

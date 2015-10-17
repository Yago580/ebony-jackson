// add split pair logic
// bet persistence
// show dealer hand total after card is no longer hidden
// what happens if player and dealer both get 21 on the draw??
// plus sign animation on balance when you win, minus when u lose
// figure out the 'cannot read property amount of undefined error'
  // possibly redesign hit so that when cards are dealt dealer
  // won't run automatic hit method
  // inherit hit from cardUser and make dealer have own special hit?
  // it may have something to do with the flip card method
// will three aces mess up handTotal()???
// make buttons very close together, big, and easy to use

"use strict";

var player = new User('Yag');
var dealer;
var allPlayers = [player];

Dom.updateBalance(player);

function newGame() {
  initializeDealer();
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
    Dom.hideControls();
    playerWins();
  } else if (dealer.twentyOne()) {
    dealer.showCard();
    Dom.updateHand(dealer);
    Dom.hideControls();
    playerLoses();
  } else {
    Dom.hitStandButtons(event.target); 
  }

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
function initializeDealer() {
  dealer = new Dealer();
  allPlayers.push(dealer);
}

$('#betControls label').on('click', function() {
  $(event.target).addClass('selected').siblings().removeClass('selected');
});

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

// validate bets
// add more money
// display hand total to user
// display hand comparison
// possibly double down logic

"use strict";

var player      = new User('Yag');
var dealer      = new Dealer();
var allPlayers  = [player, dealer];


Dom.updateBalance(player);


function newGame() {
  refreshHands();
  Dom.newGame();
  Dom.betControls(event.target);
}

function postBet() {
  event.preventDefault();
  var bet = Dom.getBet(event.target);

  player.postBet(bet);
  Dom.updateBalance(player);
  Dom.dealButton(event.target);
}

function dealHands() {
  dealer.dealHands(allPlayers);
  dealer.hideCard();
  Dom.dealHands(allPlayers);

  if (player.twentyOne())
    playerWins();
  else if (dealer.twentyOne())
    playerLoses();

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

function dealerTurn() {
  dealer.showCard();

  while (dealer.hitting) {
    dealer.dealCard(dealer);
    Dom.updateHand(dealer);
  }

  if(dealerWinOrBust())
    return;

  while (dealer.handTotal() < player.handTotal()) {
    dealer.dealCard(dealer);
    Dom.updateHand(dealer);
  }

  if (dealerWinOrBust())
    return;
    
  findWinner();
}





// Helpers
function findWinner() {
  player.handTotal() > dealer.handTotal() ? playerWins() : playerLoses()
}

function refreshHands() {
  allPlayers.forEach(function (player) {
    player.discardHand();
    player.hitting = true;
  })
}

function dealerWinOrBust() {
  if (dealer.twentyOne()) {
    playerLoses();
    return true;
  } else if (dealer.bust()) {
    playerWins();
    return true;
  }
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

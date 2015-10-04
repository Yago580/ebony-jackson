// To do's
  // animate buttons with jQuery fadeOut etc.
  // need to account for when player ties dealer
  // uncheck radio button on new game
  // maybe store dealer with the rest of the players

"use strict";

var game   = new Game();
var player = new Player('Yag');

updateBalance();

$('#beginGame').on('click', function (event) {
  refreshHands([player, game.dealer]);
  $('.card-slot').empty();
  $('.card-slot').addClass('free');
  toggleButtons($(this), $('#betControls'));
});


$('#betControls').on('submit', function (event) {
  event.preventDefault();
  var $button = $(this).children('input[type="radio"]:checked');
  var amount = parseInt($button.val());

  game.takeBet(player, amount);
  updateBalance();
  toggleButtons($(this), $('#deal'));
});


function hitPlayer() {
  game.dealCard(player);
  appendCards(player);
  checkHand(player);
  promptNextMove();
}


function dealCards() {
  game.dealCards(player);
  game.dealCards(game.dealer);
  appendCards(player);
  appendCards(game.dealer);
  checkHand(player);
  promptNextMove();
}

function checkHand(player) {
  if (player.handTotal() === 21)
    playerWins(player);
  else if (player.handTotal() > 21)
    playerLoses(player);
}

function dealerTurn() {
  while (game.dealer.handTotal() < 17) {
    game.dealCard(game.dealer);
    appendCards(game.dealer);
  }

  // turn this into a function
  if (game.dealer.handTotal() === 21) return playerLoses();
  if (game.dealer.handTotal() > 21) return playerWins(player);

  if (playerWon(player, game.dealer)) {
    playerWins(player);
  } else {
    playerLoses();
  }
}

function appendCards(player) {
  var $freeSlots = $('.'+player.domClass+'-card-slot.free');
  player.unDealtCards().forEach(function (card, index) {
    var $slot = $($freeSlots[index]);
    $slot.removeClass('free').append(imageFrom(card));
    card.dealt = true;
  })
}

// function appendCards(card) {
//   var $freeSlots = $('.card-slot.free');
//   player.unDealtCards().forEach(function (card, index) {
//     var $slot = $($freeSlots[index]);
//     $slot.removeClass('free').append(imageFrom(card));
//     card.dealt = true;
//   });
// }

function playerWon(player, dealer) {
  return player.handTotal() > dealer.handTotal();
}

function playerWins(player) {
  awardWinner(player);
  updateBalance();
  console.log('PLAYER WINZZ');
  newGamePrompt();
}

function playerLoses() {
  console.log('PLAYER LOZEZ');
  game.currentBet = 0;
  updateBalance();
  newGamePrompt();
}

function newGamePrompt() {
  $('#beginGame').show();
  $('.hitStay').show();
  $('.hitStay').hide();
}

function toggleButtons(hide, show) {
  hide.hide();
  show.show();
}

function imageFrom(card) {
  return $('<img>').attr('class', 'card').attr('src', card.image);
}

function promptNextMove() {
  toggleButtons($('#deal'), $('.hitStay'));
}

function awardWinner(player) {
  player.winBet(game.currentBet);
  game.currentBet = 0;
  updateBalance();
}

function playerBusts() {
  console.log('you bust!');
}

function updateBalance() {
  $('#balance').text(player.balance);
  $('#currentBet').text(game.currentBet);
}

function refreshHands(players) {
  players.forEach(function (player) {
    player.discardHand();
  })
}
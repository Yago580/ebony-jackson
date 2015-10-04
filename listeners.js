// To do's
  // animate buttons with jQuery fadeOut etc.

"use strict";

var game   = new Game();
var player = new Player('Yag');

updateBalance();

$('#beginGame').on('click', function (event) {
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


function dealCards() {
  game.hitPlayer(player);
  appendCards();

  if (player.handTotal() < 21)
    promptNextMove();
  else if (player.handTotal() === 21)
    playerWins(player);
  else
    playerBusts(player);
}

function dealerTurn() {
  debugger
}


function updateBalance() {
  $('#balance').text(player.balance);
  $('#currentBet').text(game.currentBet);
}

function appendCards(card) {
  var $freeSlots = $('.card-slot.free');
  player.unDealtCards().forEach(function (card, index) {
    var $slot = $($freeSlots[index]);
    $slot.removeClass('free').append(imageFrom(card));
    card.dealt = true;
  });
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

function playerWins(player) {
  player.winBet(game.currentBet);
  updateBalance();
  console.log('You win!');
}

function playerBusts() {
  console.log('you bust!');
}
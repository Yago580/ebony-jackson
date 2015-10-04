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

$('#deal').on('click', function (event) {
  game.hitPlayer(player);
  dealCards();
})




function updateBalance() {
  $('#balance').text(player.balance);
  $('#currentBet').text(game.currentBet);
}

function dealCards(card) {
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
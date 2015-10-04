"use strict";

// Game api
var Game = (function() {
  var exports = {};

  exports.refreshHands = function(players) {
    players.forEach(function (player) { player.discardHand(); })
  }

  exports.postBet = function(players, bet) {
    players[0].postBet(bet)
  }

  return exports;
})();



// Dom api
var Dom = (function() {
  var exports = {};

  exports.removeCards = function() {
    $('.card-slot').empty();
    $('.card-slot').addClass('free');
  }

  exports.toggleButton = function(turnOff, turnOn) {
    $(turnOff).hide();
    $(turnOn).show();
  }

  exports.getBet = function(target) {
    // need to uncheck radio button after it gets hidden
    var $button = $(target).children('input[type="radio"]:checked');
    return parseInt($button.val());
  }

  exports.updateBalance = function(player) {
    $('#balance').text(player.balance);
    $('#currentBet').text(player.bet);
  }

  return exports;
})();




var players = [new Player('Yag'), new Dealer()];


function newGame() {
  Game.refreshHands(players);
  Dom.removeCards();
  Dom.toggleButton(event.target, '#betControls');
}

function postBet() {
  event.preventDefault();
  var bet = Dom.getBet(event.target);

  Game.postBet(players, bet);
  Dom.updateBalance(players[0]);
  Dom.toggleButton(event.target, '#deal');
}

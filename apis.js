"use strict";


// Dom api
var Dom = (function() {
  var exports = {};

  exports.newGame = function() {
    $('.control').hide();
    $('#beginGame').show();
    $('.card-slot').empty();
    $('.card-slot').addClass('free');
    $('#playAgainPrompt').text('');
    $('#gameMessage').text('');
  }

  exports.toggleButton = function(turnOff, turnOn) {
    $(turnOff).hide();
    $(turnOn).show();
  }

  exports.getBet = function(target) {
    // need to uncheck radio button after it gets hidden
    var $button = $(target).children('input[type="radio"]:checked');
    $button.prop('checked', false);
    return parseInt($button.val());
  }

  exports.updateBalance = function(player) {
    $('#balance').text(player.balance);
    $('#currentBet').text(player.bet);
  }

  exports.dealHands = function(players) {
    players.forEach(function (player) {
      this.updateHand(player);
    }, this);
  }

  // figure out a way to clean this up
  // also add more slots
  exports.updateHand = function(player) {
    var $freeSlots = $('.'+player.domClass+'-card-slot.free');
    player.unDealtCards().forEach(function (card, index) {
      appendCard(card, $($freeSlots[index]));
    })
  }

  exports.gameMessage = function(message) {
    $('#gameMessage').text(message);
  }

  exports.newGamePrompt = function() {
    $('.control').hide();
    $('#beginGame').show();
    $('#playAgainPrompt').text('Would you like play again?');
  }

  exports.betControls = function(target) {
    $(target).hide();
    $('#betControls').show();
  }

  exports.dealButton = function(target) {
    $(target).hide();
    $('#deal').show();
  }

  exports.hitStayButtons = function(target) {
    $(target).hide();
    $('.hitStay').show();
  }

  // private
  function appendCard(card, slot) {
    slot.removeClass('free').append(imageFrom(card));
    card.dealt = true;
  }

  function imageFrom(card) {
    return $('<img>').attr('class', 'card').attr('src', card.image);
  }

  return exports;
})();
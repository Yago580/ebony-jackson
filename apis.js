"use strict";

// Dom api
var Dom = (function() {
  var exports = {};

  exports.newGame = function() {
    $('.card-slot').remove();
    $('.control').hide();
    $('#beginGame').show();
    $('#playAgainPrompt').text('');
    $('#gameMessage').text('');
  }

  exports.getBet = function(target) {
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

  exports.updateHand = function(player) {
    player.hand.forEach(function (card, index) {
      if (!card.dealt)
        buildCard(player, card, index)
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

  exports.hitStandButtons = function(target) {
    $(target).hide();
    $('.hitStand').show();
  }

  // private
  function appendCard(card, slot) {
    slot.removeClass('free').append(imageFrom(card));
    card.dealt = true;
  }

  function imageFrom(card) {
    var src = card.hidden ? card.imageBack : card.image
    return $('<img>').attr('class', 'card').attr('src', src);
  }

  function buildCard(player, card, index) {
    var cardSlot = 
      $('<div>')
        .addClass('card-slot')
        .attr('id', player.domClass+'-card-slot'+index)
        .css({top: player.topPos, left: 325 + (index * 50), position: 'fixed'})

      cardSlot.append(imageFrom(card));

    $('.tableContainer').append(cardSlot);
  }

  return exports;
})();
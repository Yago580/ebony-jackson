"use strict";

// Dom api
var Dom = (function() {
  var exports = {};

  exports.newGame = function(players) {
    refreshDisplay();
    players.forEach(function (player) {
      updateHandTotal(player);
    });
  }

  exports.hideControls = function() {
    $('.control').hide();
  }

  exports.getBet = function(target) {
    var $button = $(target).children('input[type="radio"]:checked');
    if ($button.length === 0)
      return null;
    $button.prop('checked', false);
    return parseInt($button.attr('id'));
  }

  exports.updateBalance = function(player) {
    $('#balance').text(player.balance);
    $('#currentBet').text(player.bet);
    updateHandTotal(player);
  }

  exports.dealHands = function(players) {
    players.forEach(function (player) {
      this.updateHand(player);
    }, this);
  }

  exports.updateHand = function(player) {
    player.hand.forEach(function (card, index) {
      if (!card.dealt)
        appendCard(player, card, index);
    })
    updateHandTotal(player);
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

  exports.selectChip = function() {
    $(event.target).addClass('selected').siblings().removeClass('selected');
  }

  // private
  function imageFrom(card) {
    var src = card.hidden ? card.imageBack : card.image
    var $image = $('<img>').addClass('card').attr('src', src);
    if (card.doubleDown)
      $image.addClass('double-down');
    return $image
  }

  function appendCard(player, card, index) {
    var cardSlot = cardSlotFrom(player, card, index);
    
    cardSlot.append(imageFrom(card));
    $('.tableContainer').append(cardSlot);
  }

  function cardSlotFrom(player, card, index) {
    var topPos;
    if (card.doubleDown)
      topPos = player.topPos - 40;
    else
      topPos = player.topPos
    return $('<div>')
              .addClass('card-slot')
              .attr('id', player.domClass+'-card-slot'+index)
              .css({top: topPos + (index * player.direction), left: 325 + (index * 35), position: 'fixed'});
  }

  function updateHandTotal(player) {
    $('#'+player.domClass+'-handTotal').text(player.handTotal());
  }

  function refreshDisplay() {
    $('.card-slot').remove();
    $('.control').hide();
    $('#beginGame').show();
    $('#playAgainPrompt').text('');
    $('#gameMessage').text('');
    $('.selected').removeClass('selected');
  }

  return exports;
})();
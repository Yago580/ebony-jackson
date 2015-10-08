describe("Dealer", function() {
  var dealer;
  var playerStub;
  var handCount;
  var allPlayers;

  beforeEach(function() {
    dealer = new Dealer();
    playerStub = { hand: [], hit: function(card) { this.hand.push(card) } };
    allPlayers = [dealer, playerStub];
    dealer.dealHands(allPlayers);
    handCount = dealer.hand.length;
  });



  it("#dealCard should increment hand count by 1", function() {
    dealer.dealCard(dealer);
    expect(dealer.hand.length).toEqual(handCount + 1)
  });

  it("should be #hitting when handTotal is < 17", function() {
    dealer.discardHand();
    expect(dealer.hitting).toEqual(true);
  });

  it("#hit should set hitting to false if handTotal becomes > 17", function() {
    dealer.hit({ amount: 20 });
    expect(dealer.hitting).toEqual(false);
  });

  it("#hitting should be false when handtotal is more than 17", function() {
    for(var i = 0; i < 15; i++)
      dealer.dealCard(dealer);
    expect(dealer.hitting).toEqual(false);
  });

  it("#dealHands should deal two cards to each player", function() {
    dealer.dealHands(allPlayers);
    allPlayers.forEach(function (player) {
      expect(player.hand.length).toEqual(handCount + 2);
    });
  });

  it("should respond to #hideCard", function() {
    spyOn(dealer, 'hideCard');
    dealer.hideCard();
    expect(dealer.hideCard).toHaveBeenCalled();
  });

  it("should respond to #showCard", function() {
    spyOn(dealer, 'showCard');
    dealer.showCard();
    expect(dealer.showCard).toHaveBeenCalled();
  });

});
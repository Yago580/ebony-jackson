describe("CardPlayer", function() {
  var cardPlayer;

  beforeEach(function() {
    cardPlayer = new CardPlayer();
    cardPlayer.hit({ dealt: false, amount: 8 });
    cardPlayer.hit({ dealt: true, amount: 2 });
  });

  it("should have a hand", function() {
    expect(cardPlayer.hand).toBeDefined();
  });

  it("should respond to #hit", function() {
    spyOn(cardPlayer, 'hit');
    cardPlayer.hit();
    expect(cardPlayer.hit).toHaveBeenCalled();
  });

  it("should respond to #unDealtCards", function() {
    expect(cardPlayer.unDealtCards().length).toEqual(1);
  });

  it("#discardHand should remove cards from hand", function() {
    cardPlayer.discardHand();
    expect(cardPlayer.hand.length).toEqual(0);
  });

  it('#handTotal returns proper total', function() {
    expect(cardPlayer.handTotal()).toEqual(10);
  });

  it('#handTotal returns proper total for ace', function() {
    cardPlayer.hit({ amount: 1 });
    expect(cardPlayer.handTotal()).toEqual(21);
  });

  it('#handTotal should change ace value to 1 when needed', function() {
    cardPlayer.hit({ amount: 5 });
    cardPlayer.hit({ amount: 1 });
    expect(cardPlayer.handTotal()).toEqual(16);
  });

  it("should #bust when handtotal is over 21", function() {
    cardPlayer.hit({ amount: 10 });
    cardPlayer.hit({ amount: 10 });
    expect(cardPlayer.bust()).toEqual(true);
  });

  it("should not #bust when handtotal is under 21", function() {
    expect(cardPlayer.bust()).toEqual(false);
  });

  it("should have #twentyOne when hand total is 21", function() {
    cardPlayer.hit({ amount: 1 });
    expect(cardPlayer.twentyOne()).toEqual(true);
  });

  it("should not have #twentyOne when hand total is less than 21", function() {
    expect(cardPlayer.twentyOne()).toEqual(false);
  });

  it("should not have #twentyOne when hand total is greater than 21", function() {
    cardPlayer.hit({ amount: 10 });
    cardPlayer.hit({ amount: 10 });
    expect(cardPlayer.twentyOne()).toEqual(false);
  });


});
describe("User", function() {
  var user;
  var balance;

  beforeEach(function() {
    user = new User('Yag');
    balance = user.balance
  });

  it("should have a #name", function() {
    expect(user.name).toEqual('Yag');
  });

  it("should have a starting #balance", function() {
    expect(user.balance).toEqual(jasmine.any(Number));
  });

  it("should have a corresponding #domClass", function() {
    expect(user.domClass).toEqual('player');
  });

  it("should have a corresponding #topPos for css", function() {
    expect(user.topPos).toEqual(jasmine.any(Number));
  });


  describe("#postBet", function() {
    it("should be callable", function() {
      spyOn(user, 'postBet');
      user.postBet();
      expect(user.postBet).toHaveBeenCalled();
    });

    it("should decrement user balance by amount posted", function() {
      user.postBet(100);
      expect(user.balance).toEqual(balance - 100);
    });

    it("should change users's bet by amount posted", function() {
      var bet = user.bet;
      user.postBet(100);
      expect(user.bet).toEqual(bet + 100);
    });

  });
  
  describe("#winBet", function() {
    it("should be callable", function() {
      spyOn(user, 'winBet');
      user.winBet();
      expect(user.winBet).toHaveBeenCalled();
    });

    it("should increment user balance by current bet * 2", function() {
      user.bet = 200;
      var bet = user.bet;
      user.winBet();
      expect(user.balance).toEqual(balance + (bet * 2));
    });
  });

  describe("#lostBet", function() {
    it("should be callable", function() {
      spyOn(user, 'loseBet');
      user.loseBet();
      expect(user.loseBet).toHaveBeenCalled();
    });

    it("should set user's current bet to 0", function() {
      user.bet = 1000;
      user.loseBet();
      expect(user.bet).toEqual(0);
    });

    it("should not increment user's balancea at all", function() {
      user.bet = 1000;
      user.loseBet();
      expect(user.balance).toEqual(balance);
    });

  });


});
describe("User", function() {
  var user;
  var bet;
  var balance;

  beforeEach(function() {
    user          = new User('Yag');
    user.bet      = 1000;
    user.balance -= 1000;
    bet           = user.bet;
    balance       = user.balance
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

    it("should change users's bet to amount posted", function() {
      user.postBet(100);
      expect(user.bet).toEqual(100);
    });

  });
  
  describe("#winBet", function() {
    it("should be callable", function() {
      spyOn(user, 'winBet');
      user.winBet();
      expect(user.winBet).toHaveBeenCalled();
    });

    it("should increment user balance by current bet * 2", function() {
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
      user.loseBet();
      expect(user.bet).toEqual(0);
    });

    it("should not increment user's balance at all", function() {
      user.loseBet();
      expect(user.balance).toEqual(balance);
    });

  });

  describe("#doubleDown", function() {
    it("should double users's bet.", function() {
      user.doubleDown();
      expect(user.bet).toEqual(bet * 2);
    });

    it("should decrement user's balance by current bet", function() {
      user.doubleDown();
      expect(user.balance).toEqual(balance - bet)
    });
  });

  describe("#pushBet", function() {
    it("should return user's bet to their balance", function() {
      user.pushBet();
      expect(user.balance).toEqual(balance + bet);
    });

    it("should set user's bet back to 0", function() {
      user.pushBet();
      expect(user.bet).toEqual(0);
    });
  });

  describe("#blackJack", function() {
    it("should increment user's balance by bet * 1.5", function() {
      user.blackJack();
      expect(user.balance).toEqual(balance + (bet + bet * 1.5));
    });

    it("should set user's bet back to 0", function() {
      user.blackJack();
      expect(user.bet).toEqual(0);
    });
  });



});
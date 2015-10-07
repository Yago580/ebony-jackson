describe("Deck", function() {
  var deck = new Deck();

  it("should have cards", function() {
    expect(deck._cards).toBeDefined();
  });

  it("should respond to getCard", function() {
    expect(deck.getCard()).toBeTruthy();
  });

});



describe("Card", function() {
  var card = new Card('8', 'diamonds');

  it("should have a name", function() {
    expect(card.name).toEqual('8');
  });

  it("should have a suit", function() {
    expect(card.suit).toEqual('diamonds');
  });

  it("should convert name to proper amount", function() {
    expect(card.amount).toEqual(8);
  });

  it("should have an image url", function() {
    expect(card.image).toBeDefined();
    expect(card.imageBack).toBeDefined();
  });

  describe("as a facecard", function() {
    var card = new Card('K', 'spades');

    it("should still have a name", function() {
      expect(card.name).toEqual('K');
    });

    it("should still convert name to proper amount", function() {
      expect(card.amount).toEqual(10);
    });
  });

});
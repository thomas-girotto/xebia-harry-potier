(function() {
  'use strict';
  
  describe('basket factory', function(){
    var basketService;
    var basket;
    
    beforeEach(module('xebia'));
    beforeEach(inject(function(_basketFactory_) {
      basketService = _basketFactory_;
    }));
    beforeEach(function() {
      basket = basketService.getBasket();
    });
    describe('when adding a book to an empty basket', function() {
      var book = { isbn: 1234, price: 10 };
      beforeEach(function() {
        basketService.addBook(book);
        basket = basketService.getBasket();
      });
      
      it('should be stored in a dictionary with key as isbn', function() {
        expect(basket.books[1234]).toBeDefined();
      });  
      it('should associate the isbn entry to a quantity', function() {
        expect(basket.books[1234].quantity).toBe(1);
      });
      it('should associate the isbn entry to the book', function() {
        expect(basket.books[1234].book).toBe(book);
      });
    });
    
    describe('when adding a book that already exists in the basket', function() {
      var book = { isbn: 1234, price: 10 };
      beforeEach(function() {
        //add the same book twice
        basketService.addBook(book);
        basketService.addBook(book);
      }); 
      it('should add the quantity to the existing isbn entry', function() {
        expect(basket.books[1234].quantity).toBe(2);
      });
      it('should sum the books prices', function() {
        expect(basket.price).toBe(20);
      });
    });
    
    describe('when removing a book from the basket', function() {
      var book1 = { isbn: 1234, price: 10 };
      var book2 = { isbn: 2345, price: 15 };
      
      it('should remove the dictionary entry if the book quantity was one', function() {
        basketService.addBook(book1);
        basketService.addBook(book2);
        basketService.removeBook(book1);
        expect(basket.books[1234]).toBe(undefined);
      });
      it('should decrease quantity if the book quantity was greater than one', function() {
        basketService.addBook(book1);
        basketService.addBook(book1);
        basketService.removeBook(book1);
        expect(basket.books[1234].quantity).toBe(1);
      });
    });
    
    describe('when applying commercial offers', function() {
      var book1 = { isbn: 1234, price: 15 };
      //remark: here we don't care about the implementation of the reduction, we just want
      //to check that we apply to the basket the reduction that returns the lower price
      var bestOffer = {
        applyReduction: function(price) { return 10; }
      }
      var otherOffer = {
        applyReduction: function(price) { return 5; }
      }
      var offers = [
          otherOffer,
          bestOffer
        ];
      
      beforeEach(function() {
        basketService.addBook(book1);
      });
      it('should take the best offer', function() {
        basketService.applyOffers(offers);
        expect(basket.reducedPrice).toBe(5);
      });
    });
  });
})();

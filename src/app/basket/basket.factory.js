(function() {
  'use strict';

  angular
    .module('xebia')
    .factory('basketFactory', basketFactory);

  /** @ngInject */
  function basketFactory() {
    //basket object is kept in memory for the whole application life
    var basket = {
      books: {},
      price: 0
    };
    
    function addBook(book) {
      if (basket.books[book.isbn]) {
        basket.books[book.isbn].quantity ++;
      }
      else {
        basket.books[book.isbn] = {
          quantity: 1,
          book: book
        };
      }
      basket.price += book.price;
    }
    
    function removeBook(book) {
      if (basket.books[book.isbn]) {
        if (basket.books[book.isbn].quantity === 1) {
          delete basket.books[book.isbn];
        }
        else {
          basket.books[book.isbn].quantity --;
        }
        basket.price -= book.price;
      }
    }
    
    function getBasket() {
      return basket;
    }
    
    function applyOffers(offers) {
      var lowerPrice = basket.price;
      var bestOffer = null;
      angular.forEach(offers, function(offer) {
        var reducedPrice = offer.applyReduction(basket.price);
        if (reducedPrice < lowerPrice) {
          lowerPrice = reducedPrice;
          bestOffer = offer;
        }
      });
      basket.reducedPrice = bestOffer.applyReduction(basket.price);
      basket.usedOffer = bestOffer;
    }
    
    return {
      addBook: addBook,
      removeBook: removeBook,
      getBasket: getBasket,
      applyOffers: applyOffers
    };
  }
})();

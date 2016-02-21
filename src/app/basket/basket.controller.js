(function () {
  'use strict';

  angular
    .module('xebia')
    .controller('BasketController', BasketController);

  /** @ngInject */
  function BasketController($scope, offerService, basketFactory) {

    var vm = this;
    
    vm.basket = basketFactory.getBasket();
    vm.booksInBasket = [];
    
    Object.keys(vm.basket.books).forEach(function(isbn) {
      vm.booksInBasket.push(vm.basket.books[isbn]);
    });
    
    applyOffers();
    
    vm.removeOne = function(book) {
      basketFactory.removeBook(book);
      if (!vm.basket.books[book.isbn]) {
        vm.booksInBasket.splice(book, 1);
      }
      applyOffers();
    };
    
    vm.addOne = function(book) {
      basketFactory.addBook(book);
      applyOffers();
    };
    
    function applyOffers() {
      if (vm.booksInBasket.length > 0) {
        offerService.getOffers(vm.basket).then(function(offers) {
          basketFactory.applyOffers(offers);
        }); 
      }
    }
  }
})();

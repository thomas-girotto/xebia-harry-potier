(function () {
  'use strict';

  angular
    .module('xebia')
    .controller('BooksController', BooksController);

  /** @ngInject */
  function BooksController($scope, bookService, basketFactory) {

    var vm = this;

    bookService.getBooks().then(function(books) {
      vm.books = books;
    });

    vm.add = function(book) {
      basketFactory.addBook(book);
      $scope.$emit('itemAdded');
    };
  }
})();

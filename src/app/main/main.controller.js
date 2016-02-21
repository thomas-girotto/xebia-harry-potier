(function() {
  'use strict';

  angular
    .module('xebia')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(bookService) {
    var vm = this;

    bookService.getBooks().then(function(books) {
        vm.books = books; 
    });
  }
})();

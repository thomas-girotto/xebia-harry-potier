(function() {
  'use strict';

  angular
    .module('xebia')
    .service('bookService', bookService);

  /** @ngInject */
  function bookService($http) {
    this.getBooks = function() {
      return $http.get('http://henri-potier.xebia.fr/books').then(function(books) {
         return books.data;
      });
    };
  }
})();

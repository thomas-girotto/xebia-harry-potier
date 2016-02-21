(function() {
  'use strict';

  angular
    .module('xebia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('books', {
        url: '/books',
        templateUrl: 'app/books/books.html',
        controller: 'BooksController',
        controllerAs: 'vm'
      })
      .state('basket', {
        url: '/basket',
        templateUrl: 'app/basket/basket.html',
        controller: 'BasketController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/books');
  }

})();

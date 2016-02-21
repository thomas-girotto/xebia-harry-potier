(function() {
  'use strict';

  angular
    .module('xebia')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($rootScope, $scope, $timeout) {
      var vm = this;
      vm.newItems = 0;
      
      $rootScope.$on('itemAdded', function() {
        vm.newItems ++;
        
        vm.classAnimation = 'rubberBand';
        $timeout(function() {
          vm.classAnimation = '';
        }, 2000);
      });
      
      vm.newItemsSeen = function() {
        vm.newItems = 0;
      };
    }
  }
})();

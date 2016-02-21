(function() {
  'use strict';

  angular
    .module('xebia')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

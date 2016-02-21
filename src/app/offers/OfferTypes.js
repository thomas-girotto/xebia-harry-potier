(function(){
  /** @ngInject */
  angular
    .module('xebia')
    .constant('OfferTypes', {
      Percentage: 'percentage',
      Minus: 'minus',
      Slice: 'slice'
    });
})();
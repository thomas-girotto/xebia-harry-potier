(function() {
  'use strict';

  angular
    .module('xebia')
    .service('offerService', offerService);

  /** @ngInject */
  function offerService($http, $log, OfferTypes) {
    this.getOffers = function(basket) {
      var ids = Object.keys(basket.books);
      return $http.get('http://henri-potier.xebia.fr/books/' + ids.join(',') + '/commercialOffers').then(function(commercialOffers) {
        var myOffers = [];
        angular.forEach(commercialOffers.data.offers, function(offer) {
          switch(offer.type)
          {
            case OfferTypes.Percentage:
              myOffers.push(new OfferPercentage(offer));
              break;
            case OfferTypes.Minus:
              myOffers.push(new OfferMinus(offer));
              break;
            case OfferTypes.Slice:
              myOffers.push(new OfferSlice(offer));
              break;
            default:
              $log.error('Offer type ' + offer.type + ' is not implemented yet');
              break;
          }
        });
        return myOffers;
      });
    };
    
    function OfferPercentage(offer) {
      this.type = offer.type;
      this.value = offer.value;
      this.applyReduction = function(price) {
        return price - this.value / 100 * price;
      }
    }
    
    function OfferMinus(offer) {
      this.type = offer.type;
      this.value = offer.value;
      this.applyReduction = function(price) {
        return price - this.value;
      }
    }
    
    function OfferSlice(offer) {
      this.type = offer.type;
      this.value = offer.value;
      this.sliceValue = offer.sliceValue;
      this.applyReduction = function(price) {
        return price - Math.floor(price / this.sliceValue) * this.value;
      }
    }
  }
})();

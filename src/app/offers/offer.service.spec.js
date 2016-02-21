(function () {
  'use strict';

  describe('offers service', function () {
    var offerService;
    var $httpBackend;

    var commercialOffers = {
      "offers": [
        {
          "type": "percentage",
          "value": 5
        },
        {
          "type": "minus",
          "value": 15
        },
        {
          "type": "slice",
          "sliceValue": 60,
          "value": 10
        }
      ]
    };

    beforeEach(module('xebia'));
    beforeEach(inject(function (_$httpBackend_, _offerService_) {
      $httpBackend = _$httpBackend_;
      offerService = _offerService_;
    }));

    describe('when retreiving commercial offers', function () {
      var basket;
      var offers;
      beforeEach(function () {
        basket = {
          books: {
            1234: {
              quantity: 1,
              book: {
                isbn: 1234,
                price: 10,
                title: 'hairy potter'
              }
            },
            2345: {
              quantity: 1,
              book: {
                isbn: 2345,
                price: 15,
                title: 'hairy potter'
              }
            }
          }
        };
        $httpBackend.whenGET('http://henri-potier.xebia.fr/books/1234,2345/commercialOffers').respond(200,
          commercialOffers);
        offerService.getOffers(basket).then(function(offersWithReductionImpl) {
          offers = offersWithReductionImpl;
        });
        $httpBackend.flush();
      });

      it('should call GET service with serialized book\'s isbn in url', function () {
        $httpBackend.expectGET('http://henri-potier.xebia.fr/books/1234,2345/commercialOffers').respond(commercialOffers);
      });
      it('should add the applyReduction method to the percentage offer with percentage implementation', function () {
        //percentage reduction is 5%
        expect(offers[0].applyReduction(100)).toBe(95);
      });
      it('should add the applyReduction method to the minus offer with minus implementation', function () {
        //minus reduction is 15€
        expect(offers[1].applyReduction(100)).toBe(85);
      });
      it('should add the applyReduction method to the slice offer with slice implementation', function () {
        //slice reduction is 10€ every 60€
        expect(offers[2].applyReduction(100)).toBe(90);
      });
    });
  });
})();

(function() {
    'use strict';

    describe('Nav', function() {

        var $compile,
            $rootScope,
            $httpBackend

        beforeEach(function() {
            module('vpod');
            module('templates');

            inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
            });
        });

        describe('vpodNav directive', function() {

            var element,
                $scope,
                html = '<vpod-nav items="\'foo\'"></vpod-nav>';

            beforeEach(function() {
                $scope = $rootScope.$new();
                // element = $compile(angular.element(html))($scope);
                element = $compile(html)($scope);
                $scope.$digest();
            });

            it('should compile and have class, \'episodes\'', function() {
                // dump(element);
                expect(element.isolateScope().items).toEqual('foo'); // undefined
                expect(element.hasClass('episodes')).toBe(true);
            });
        });

        describe('navCtrl', function() {

        });
    });
})();

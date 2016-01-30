(function() {
    'use strict';

    describe('Nav', function() {

        var $rootScope;

        beforeEach(function() {
            module('vpod');
            module('templates');

            inject(function(_$rootScope_) {
                $rootScope = _$rootScope_;
            });
        });

        describe('vpodNav directive', function() {

            var $compile,
                $httpBackend,
                element,
                $scope,
                html = '<vpod-nav items="\'foo\'"></vpod-nav>';

            beforeEach(function() {

                inject(function(_$compile_, _$httpBackend_) {
                    $compile = _$compile_;
                    $httpBackend = _$httpBackend_;
                });

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

            it('should bind \'items\' to isolateScope');
            it('should bind \'onSelect\' callback to isolateScope');
            it('should call \'onSelect\' callback when items clicked');
            it('should set \'focussed\' flag when an item receives focus');
            it('should navigate focus up and down list of items');
        });

        describe('navCtrl', function() {
            var navCtrl,
                $controller;

            beforeEach(function() {
                inject(function(_$controller_) {
                    $controller = _$controller_;
                });
                navCtrl = $controller('navCtrl');
            });

            it('should be defined', function() {
                expect(navCtrl).toBeDefined();
            });
        });
    });
})();

(function() {
    'use strict';

    describe('Player', function() {

        var $compile,
            $rootScope,
            $httpBackend;

        beforeEach(function() {
            module('vpod');
            module('templates');

            inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
            });
        });

        describe('vpodPlayer directive', function() {

            var element,
                $scope,
                html = '<vpod-player class="vpod-player"></vpod-player>';

            beforeEach(function() {

                $scope = $rootScope.$new();
                element = $compile(html)($scope);
                $scope.$digest();
            });

            it('should compile and have class, \'video\'', function() {
                expect(element.hasClass('video')).toBe(true);
            });

            it('should...');
        });

        describe('playerCtrl', function() {
            var playerCtrl,
                $controller;

            beforeEach(function() {
                inject(function(_$controller_) {
                    $controller = _$controller_;
                });
                playerCtrl = $controller('playerCtrl');
            });

            it('should be defined', function() {
                expect(playerCtrl).toBeDefined();
            });
        });
    });
})();

(function() {
    'use strict';

    describe('Components', function() {

        var $filter,
            $compile,
            $rootScope,
            $httpBackend,
            $sce;

        // beforeEach(module(function($provide) {
        //     $provide.provider('pubSub', function () { 
        //         this.$get = function () {
        //             return {};
        //         }
        //     });
        //     $provide.provider('Feed', function () { 
        //         this.$get = function () {
        //             return {};
        //         }
        //     });
        // }));

        beforeEach(function() {
            module('vpod.components');
            module('templates');

            inject(function(_$filter_, _$compile_, _$rootScope_, _$httpBackend_, _$sce_) {
                $filter = _$filter_;
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
                $sce = _$sce_;
            });
        });

        describe('trustUrl filter', function() {
            it('should wrap trusted url and allow to be output as is', function() {
                var trustUrl = $filter('trustUrl');
                expect(trustUrl).not.toBeNull();
                var trustedUrl = trustUrl('http://google.com');
                expect($sce.valueOf(trustedUrl)).toEqual('http://google.com');
            });
        });

        describe('videoSrc filter', function() {

        });

        describe('parseDate filter', function() {

        });

        describe('pubSub factory', function() {

        });

        describe('Feed factory', function() {

        });

        describe('loader factory', function() {

        });

        describe('loader factory', function() {

        });

        describe('vpodNav directive', function() {

            var element,
                $scope,
                html = '<vpod-nav></vpod-nav>';

            beforeEach(function() {
                $scope = $rootScope.$new();
                element = $compile(html)($scope);
                $scope.$digest();
            });

            it('should compile and have class, \'episodes\'', function() {
                dump(element);
                expect(element.hasClass('episodes')).toBe(true);
            });
        });

        // describe('vpodPlayer directive', function() {

        //     var element,
        //         $scope,
        //         html = '<vpod-player></vpod-player>';

        //     beforeEach(function() {

        //         $scope = $rootScope.$new();
        //         element = $compile(html)($scope);
                
        //         $scope.$digest();
        //     });

        //     it('should compile and have class, \'video\'', function() {
        //         expect(element.hasClass('video')).toBe(true);
        //     });
        // });
    });
})();

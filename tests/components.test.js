(function() {
    'use strict';

    describe('Components', function() {

        var $filter,
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
            module('vpod');
            // module('vpod.components');
            module('templates');

            inject(function(_$filter_, _$sce_) {
                $filter = _$filter_;
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

            var Feed;

            beforeEach(inject(function(_Feed_) {
                Feed = _Feed_;
            }));

            it('should be defined', function() {
                expect(typeof Feed.get).toEqual('function');
            });
        });

        describe('loader factory', function() {

        });

        describe('loader factory', function() {

        });
    });
})();

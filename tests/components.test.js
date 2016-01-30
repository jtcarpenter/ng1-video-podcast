(function() {
    'use strict';

    describe('Components', function() {

        var $filter;

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
            module('templates');

            inject(function(_$filter_) {
                $filter = _$filter_;
            });
        });

        describe('trustUrl filter', function() {

            var $sce;

            beforeEach(function() {
                inject(function(_$sce_) {
                    $sce = _$sce_;
                });
            });

            it('should wrap trusted url and allow to be output as is', function() {
                var trustUrl = $filter('trustUrl');
                expect(trustUrl).not.toBeNull();
                var trustedUrl = trustUrl('http://google.com');
                expect($sce.valueOf(trustedUrl)).toEqual('http://google.com');
            });
        });

        describe('videoSrc filter', function() {

            var videoSrc,
                mockSources = [
                    {type:'video/mp4'},
                    {type:'audio/mpeg'},
                    {type:'video/ogg'},
                ];

            beforeEach(function() {
                videoSrc = $filter('videoSrc');
            });

            it('should be defined', function() {
                expect(videoSrc).not.toBeNull();
            });

            it('should filter out invalid video sources', function() {
                var filteredSources = videoSrc(mockSources);
                expect(filteredSources.length).toEqual(2);
                expect(filteredSources[0]).toEqual(mockSources[0]);
                expect(filteredSources[1]).toEqual(mockSources[2]);
            });
        });

        describe('formatDate filter', function() {

            var formatDate;

            beforeEach(function() {
                formatDate = $filter('formatDate');
            });

            it('should be defined', function() {
                expect(formatDate).not.toBeNull();
            });

            it('should return a valid date string in format ...', function() {
                var dateStr = 'Fri Jan 01 2016 00:00:00 GMT+0000 (GMT)',
                    formattedDate = formatDate(dateStr);
                expect(formattedDate).toEqual('01/01/2016 00:00');
            });

            it('should return an invalid date string as is', function() {
                var dateStr = 'Fri Jan 32 2016 00:00:00 GMT+0000 (GMT)',
                    formattedDate = formatDate(dateStr);
                expect(formattedDate).toEqual(dateStr);
            });
        });

        describe('pubSub factory', function() {
            it('should...');
        });

        describe('Feed factory', function() {

            var Feed;

            beforeEach(inject(function(_Feed_) {
                Feed = _Feed_;
            }));

            it('should be defined', function() {
                expect(Feed).toBeDefined();
                expect(typeof Feed.get).toEqual('function');
                expect(typeof Feed.getCached).toEqual('function');
            });
        });

        describe('loader factory', function() {

            var loader;

            beforeEach(inject(function(_loader_) {
                loader = _loader_;
            }));

            it('should be defined', function() {
                expect(loader).toBeDefined();
                expect(typeof loader.loading).toEqual('boolean');
            });
        });

        describe('interceptor factory', function() {
            it('should...');
        });
    });
})();

// describe('example test', function() {
//     it('should be true', function() {
//         expect('foo').toBe('foo');
//     });
// });

(function() {
    'use strict';

    describe('Components', function() {

        var $filter;

        beforeEach(function() {
            module('vpod.components');

            inject(function(_$filter_) {
                $filter = _$filter_;
            });
        });

        describe('slice filter', function() {

            it('should take a slice from an array', function() {
                expect('foo').toBe('foo');
                expect(typeof inject).toEqual('function');
                expect(typeof angular.mock.inject).toEqual('function');

                var slice = $filter('slice');
                expect(slice).not.toBeNull();
                expect(slice([1,2,3,4,5], 1, 3)).toEqual([2, 3]);
            });
        });
    });
})();

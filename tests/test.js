// describe('example test', function() {
//     it('should be true', function() {
//         expect('foo').toBe('foo');
//     });
// });

(function() {
    'use strict';

    describe('Components', function() {

        var $filter;

        // beforeEach(module('vpod')); //load module

        beforeEach(function() {
            module('vpod');
            module('vpod.components');

            inject(function(_$filter_) {
                $filter = _$filter_;
            });
        });

        // beforeEach(inject(function(_$filter_){
        //     $filter = _$filter_;
        // }));

        // beforeEach(inject(['_$filter_', function (_$filter_) {
        //     $filter = _$filter_;
        // }]));

        describe('slice filter', function() {

            // it('has a slice filter', inject(function($filter) {
            //     expect($filter('slice')).not.toBeNull();
            // }));
            

            // var slice;
            // beforeEach(inject(function($filter){ //initialize your filter
            //     slice = $filter('slice',{});
            // }));

            it('should take a slice from an array', function() {
                expect('foo').toBe('foo');
                expect(typeof inject).toEqual('function');
                expect(typeof angular.mock.inject).toEqual('function');

                // var slice = $filter('slice');
                // expect(slice).not.toBeNull();
                // expect(slice([1,2,3])).toEqual([3,2,1]);
            });
        });
    });
})();




// (function() {
//     'use strict';

//     angular
//         .module('vpod.components')
//         .filter('slice', slice);

//     function slice() {
//         return function(arr, start, end) {
//             if (typeof arr === 'undefined') return;

//             // TODO: Check if items actually have valid videos
//             return arr.slice(start, end);
//         }
//     }
// })();
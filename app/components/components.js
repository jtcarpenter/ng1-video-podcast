(function() {
    'use strict';

    angular
        .module('vpod.components', [])
})();

(function() {
    'use strict';

    angular
        .module('vpod.components')
        .factory('Feed', Feed);

    Feed.$inject = ['$resource', '$q'];

    function Feed($resource, $q) {
        var res = $resource(
            '/api',
            {get: {method: 'GET', cache: true}}
        );

        var _feed = {},
            //_selected = $q.defer(),
            _player;

        return {
            get: function() {
                _feed = res.get.apply(this, arguments);
                return this.getCached();
            },

            getCached: function() {
                return _feed;
            },

            select: function(i) {
                // _selected = $q.defer();
                // _selected.resolve(_feed.items[i]);
                _player(_feed.items[i]);
            },

            register: function(player) {
                _player = player;
            }
        };
    }
})();

// (function() {
//     'use strict';

//     angular
//         .module('vpod.components')
//         .factory('Player', Player);

//     function Player() {
//         return function (feed) {
//             return {
//                 loaded: function() {
//                     return feed.getSelected();
//                 }
//             }
//         };
//     }
// })();

(function() {
    'use strict';

    angular
        .module('vpod.components')
        .service('debounce', debounce);

    function debounce() {
        return function debounce(func, wait, immediate) {
            var timeout;
            return function () {
                var that = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(that, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(that, args);
            };
        };
    }
})();

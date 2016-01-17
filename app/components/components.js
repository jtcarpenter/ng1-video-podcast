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

    Feed.$inject = ['$resource'];

    function Feed($resource) {
        var res = $resource(
            '/api',
            {get: {method: 'GET', cache: true}}
        );

        var _feed = {},
            _curr = {};

        return {
            load: function() {
                _feed = res.get.apply(this, arguments);
                return this.get();
            },

            get: function() {
                return _feed;
            },

            setCurr: function(i) {
                _curr = _feed.items[i];
            },

            getCurr: function() {
                return _curr;
            }
        };
    }
})();

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

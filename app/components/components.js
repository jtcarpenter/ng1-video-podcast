(function() {
    'use strict';

    angular
        .module('vpod.components', [])
})();

/**
 * Feed Factory
 * @namespace Factories
 */
(function() {
    'use strict';

    angular
        .module('vpod.components')
        .factory('Feed', Feed);

    Feed.$inject = ['$resource', '$q'];

    /**
     * @namespace Feed
     * @desc resource wrapper
     * @memberOf Factories.Feed
     */
    function Feed($resource, $q) {
        var res = $resource(
            '/api',
            {get: {method: 'GET', cache: true}}
        );

        var _feed = {};
            //_selected = $q.defer(),
            // _player;

        return {

            get: function() {
                _feed = res.get.apply(this, arguments);
                return this.getCached();
            },

            getCached: function() {
                return _feed;
            },

            /**
             * @name select
             * @desc Selects an item in the feed
             * @param {integer} index of item
             * @returns {object}
             * @memberOf Factories.Feed
             */
            // select: function(i) {
            //     // _selected = $q.defer();
            //     // _selected.resolve(_feed.items[i]);
            //     _player(_feed.items[i]);
            // },

            // register: function(player) {
            //     _player = player;
            // }
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('vpod.components')
        .filter('trustUrl',trustUrl);

    trustUrl.$inject = ['$sce'];

    function trustUrl($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('vpod.components')
        .filter('videoSrc',videoSrc);

    videoSrc.$inject = [];

    function videoSrc() {
        return function(enclosures) {
            if (typeof enclosures === 'undefined') return false;
            return enclosures.filter(function(enc) {
                return /^video\/[a-zA-Z0-9]+$/.test(enc.type);
            });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('vpod.components')
        .filter('slice', slice);

    function slice() {
        return function(arr, start, end) {
            if (typeof arr === 'undefined') return;

            // TODO: Check if items actually have valid videos
            return arr.slice(start, end);
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('vpod.components')
        .factory('pubSub', pubSub);

    var events = {}

    function sub(event, onPub) {
        if (!events[event]) {
            events[event] = [];
        }
        events[event].push(onPub);
    }

    function unSub(event, onPub) {
        if (!events[event]) {
            return;
        }
        if (events[event].indexOf(onPub) !== -1) {
            events[event].splice(events[event].indexOf(onPub), 1);
        }
    }

    function pub(event, args) {
        if (!events[event]) {
            console.error(event + 'does not exist');
            return;
        }
        for (var i = 0, l = events[event].length; i < l; i++) {
            events[event][i].apply(events[event][i], args, []);
        }
    }

    function pubSub() {
        return {
            sub: sub,
            unSub: unSub,
            pub: pub
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('vpod.components')
        .directive('vpodPlayer', vpodPlayer);

    vpodPlayer.$inject = ['pubSub', 'Feed'];

    function vpodPlayer(pubSub, Feed) {

        return {
            restrict: 'E',
            replace: true,

            link: function ($scope, elem, attrs, ctrl, transclude) {

                pubSub.sub('play', function() {
                    $scope.episode = Feed.getCached().items[arguments[0]];
                    elem[0].load();
                    elem[0].play();
                });
            },

            compile: function(elem, attrs) {
                return this.link;
            },

            templateUrl: '/components/vpodplayer.view.html'
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('vpod.components')
        .directive('vpodNav', vpodNav);

    vpodNav.$inject = [];

    function vpodNav() {

        function up() {
            alert('up');

        }

        function down() {
            alert('down');
        }

        return {
            restrict: 'E',
            replace: true,
            // require: 'vpodPlayer',
            scope: {
                items: '=',
                onSelect: '='
            },

            link: function ($scope, elem, attrs, ctrl, transclude) {
                $scope.up = up;
                $scope.down = down;

                var _elem = angular.element(document.getElementsByTagName('body'));
                _elem.bind('keydown', function (event) {

                    if (event.keyCode === 38) { // Up
                        event.preventDefault();
                        event.stopPropagation();
                        alert($scope.pointer.i);
                        up();
                    }
                    if (event.keyCode === 40) { // Up
                        event.preventDefault();
                        event.stopPropagation();
                        down();
                    }
                });
            },

            compile: function(elem, attrs) {
                return this.link;
            },

            templateUrl: '/components/vpodnav.view.html'
        }
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

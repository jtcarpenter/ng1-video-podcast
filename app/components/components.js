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

    vpodNav.$inject = ['$document'];

    function vpodNav($document) {

        var IDENTIFIER = 'episode-';

        function up(elem) {
            console.log('up');
        }

        function down(elem) {
            console.log('down');
        }

        return {
            restrict: 'E',
            replace: true,
            scope: {
                items: '=',
                onSelect: '='
            },

            link: function ($scope, elem, attrs, ctrl, transclude) {
                $scope.up = up;
                $scope.down = down;

                $scope.count = 20;
                $scope.start = 0;

                $scope.identifier = IDENTIFIER;

                // TODO:
                // -- cursors should navigate through list
                // -- Tab should only reach ul (remove href?)
                // -- (Tab when inside should skip to next element in DOM)
                // -- Up and Down buttons

                elem.bind('keydown', function (event) {

                    if (event.keyCode === 38) { // Up
                        if (document.activeElement === elem[0]) {
                            console.log('focus is on containing div - do nothing');
                        }
                        if (new RegExp('^' + IDENTIFIER + '[0-9]+$').test(document.activeElement.id)) {
                            var curr = parseInt(document.activeElement.id.replace(IDENTIFIER, ''), 10),
                                next = curr -= 1,
                                nextEl = document.getElementById(IDENTIFIER + next);

                            if (nextEl) {
                                nextEl.focus();
                            }
                        }
                    }
                    if (event.keyCode === 40) { // Down

                        if (document.activeElement === elem[0]) {
                            var nextEl = document.getElementById(IDENTIFIER + '0');
                        }

                        if (new RegExp('^' + IDENTIFIER + '[0-9]+$').test(document.activeElement.id)) {
                            var curr = parseInt(document.activeElement.id.replace(IDENTIFIER, ''), 10),
                                next = curr += 1,
                                nextEl = document.getElementById(IDENTIFIER + next);
                        }

                        if (nextEl) {
                            nextEl.focus();
                        }
                    }

                    if (event.keyCode === 9) {
                        console.log('tab pressed');
                        if (document.activeElement === elem[0]) {
                            //
                        }
                    }

                    if (event.shiftKey && event.keyCode == 9) {
                        console.log('shift+tab pressed');
                        //elem[0].focus();
                    }
                });

                $scope.onFocus = function(items, item, $event) {
                    item.focussed = 'focussed';
                };

                $scope.onBlur = function(item, $event) {
                    item.focussed = undefined;
                };

                $scope.onKeydown = function(item) {
                    console.log('keydown');
                };
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

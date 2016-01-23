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
            {
                get: {
                    method: 'GET',
                    cache: true,
                }
            }
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
            }


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

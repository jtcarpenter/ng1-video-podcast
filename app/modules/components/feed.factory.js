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

        var res = $resource('/api', {get: {method: 'GET',cache: true,}}),
            _feed = {};

        return {

            /**
             * @name get
             * @desc Gets a feed resource from server
             * -- @param {integer} index of item
             * @returns {object}
             * @memberOf Factories.Feed
             */
            get: function() {
                _feed = res.get.apply(this, arguments);
                return this.getCached();
            },

            getCached: function() {
                return _feed;
            }
        };
    }
})();

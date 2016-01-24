(function() {
    'use strict';

    angular
        .module('vpod.components')
        .factory('Feed', Feed);

    Feed.$inject = ['$resource', '$q'];

    /**
     * @name Feed
     * @desc Uses the $resourse factory 
     * to provides a API to query video podcast feed      
     */
    function Feed($resource, $q) {

        var res = $resource('/api', {get: {method: 'GET',cache: true,}}),
            _feed = {};

        return {

            /**
             * @name get
             * @desc Gets a feed from server
             * @returns {Object} Promise instance
             */
            get: function() {
                _feed = res.get.apply(this, arguments);
                return this.getCached();
            },

            /**
             * @name getCached
             * @desc Gets current feed object
             * (does not attempt to go to the server) 
             * @returns {Object} Promise instance or empty object
             */
            getCached: function() {
                return _feed;
            }
        };
    }
})();

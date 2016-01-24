(function() {
    'use strict';

    angular
        .module('vpod.components')
        .factory('interceptor', interceptor);

    interceptor.$inject = ['$q', 'loader'];

    /**
     * @name interceptor
     * @desc Factory which intercepts all HTTP requests
     * made using angular $http service.
     * Updates the loading state on the injected loader factory
     * @param  {Object} $q
     * @param  {Object} loader
     * @return {Object}
     */
    function interceptor($q, loader) {

        // Keep a count of all currently onresolved requests
        var requests = 0;

        return {
            request: function(config) {
                requests++;
                loader.loading = true;
                return config;
            },
            requestError: function(rejection) {
                requests--;
                if (requests === 0)
                    loader.loading = false;
                console.error('Error', rejection);
                return $q.reject(rejection);
            },
            response: function(response) {
                requests--;
                if (requests === 0)
                    loader.loading = false;
                return response;
            },
            responseError: function(rejection) {
                requests--;
                if (requests === 0)
                    loader.loading = false;
                console.error('Response error:', rejection);
                return $q.reject(rejection);
            }
        };
    }
})();

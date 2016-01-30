(function() {
    'use strict';

    // Name of main app module
    var APP_NAME = 'vpod';

    angular
        .module(APP_NAME, dependencies())
        .config(config);

    config.$inject = ['$httpProvider']

    function config($httpProvider) {
        $httpProvider.interceptors.push('interceptor');
    }

    angular.forEach(subModules(), function(mod) {
        angular.module(mod, []);
    });

    /**
     * @desc Gets all third party and sub module dependencies
     * @return {array}  Array of dependency names
     */
    function dependencies() {
        return [
            'ngResource'
        ]
        .concat(subModules());
    }

    /**
     * @desc Gets all sub modules
     * @return  {array} Array of sub modules
     */
    function subModules() {
        return [
            'components',
            'header',
            'nav',
            'player'
        ]
        .map(function(mod) {
            return APP_NAME + '.' + mod;
        });
    }
})();

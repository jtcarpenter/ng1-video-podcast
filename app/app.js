(function() {
    'use strict';

    var APP_NAME = 'vpod';

    angular
        .module(APP_NAME, dependencies())
        .config(config);

    config.$inject = ['$httpProvider']

    function config($httpProvider) {
        $httpProvider.interceptors.push('interceptor');
    }

    angular.forEach(subModules(), function(mod) {
        console.log(mod);
        angular.module(mod, []);
    });

    function dependencies() {
        return [
            'ui.router',
            'ngResource'
        ]
        .concat(subModules());
    }

    function subModules() {
        return [
            'components',
            'header',
            'nav',
            'player'
        ].map(function(mod) {
            return APP_NAME + '.' + mod;
        });
    }
})();

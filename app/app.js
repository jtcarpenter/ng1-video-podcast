(function() {
    'use strict';

    angular
        .module('vpod', dependencies())
        .config(config);

    config.$inject = ['$httpProvider', '$stateProvider']

    function config($httpProvider, $stateProvider) {
        // $stateProvider
        //     .state('home', {
        //         url: '/',
        //         templateUrl: null,
        //     })
        //     .state('episode', {
        //         url: '/:index'
        //     });
        $httpProvider.interceptors.push('interceptor');
    }

    function dependencies() {
        return [
            'ui.router',
            'ngResource',
            'vpod.components',
            'vpod.header',
            'vpod.nav',
            'vpod.player'
        ];
    }
})();

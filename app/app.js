(function() {
    'use strict';

    angular
        .module('vpod', dependencies())
        .config(config);

    config.$inject = ['$stateProvider']

    function config($stateProvider) {
        // $stateProvider
        //     .state('home', {
        //         url: '/',
        //         templateUrl: null,
        //     })
        //     .state('episode', {
        //         url: '/:index'
        //     });
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

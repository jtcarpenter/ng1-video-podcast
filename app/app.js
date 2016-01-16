(function() {
    'use strict';

    angular
        .module('vpod', dependencies())
        .config(config);

    config.$inject = ['$stateProvider']

    function config($stateProvider) {
        // $stateProvider
        //     .state('/', {
        //         url: '',
        //         templateUrl: null,
        //         onEnter: ['$stateParams', '$state', function ($stateParams, $state) {

        //         }]
        //     })
    }

    function dependencies() {
        return [
            'ui.router',
            'ngResource',
            'vpod.components',
            'vpod.header',
            'vpod.feed',
            'vpod.player'
        ];
    }
})();


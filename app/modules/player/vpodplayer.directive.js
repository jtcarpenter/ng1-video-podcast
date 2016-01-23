(function() {
    'use strict';

    angular
        .module('vpod.player')
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

            templateUrl: '/modules/player/vpodplayer.view.html'
        }
    }
})();

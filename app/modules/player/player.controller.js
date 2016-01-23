(function() {
    'use strict';

    angular
        .module('vpod.player')
        .controller('playerCtrl', playerCtrl);

    playerCtrl.$inject = ['Feed', 'pubSub'];

    function playerCtrl(Feed, pubSub) {

        var that = this;

        this.feed = Feed.getCached();

        function onPlay() {
            that.i = arguments[0];
        }

        pubSub.sub('play', onPlay);
    }
})();

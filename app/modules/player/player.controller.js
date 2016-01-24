(function() {
    'use strict';

    angular
        .module('vpod.player')
        .controller('playerCtrl', playerCtrl);

    playerCtrl.$inject = ['Feed', 'pubSub'];

    /**
     * @name playerCtrl
     * @desc Controller attached to video wrapper.
     * Subscribes to play event so if can access the currently playing episode
     * @param  {Object} Feed
     * @param  {Object} pubSub
     */
    function playerCtrl(Feed, pubSub) {

        var that = this;

        this.feed = Feed.getCached();

        function onPlay() {
            that.i = arguments[0];
        }

        pubSub.sub('play', onPlay);
    }
})();

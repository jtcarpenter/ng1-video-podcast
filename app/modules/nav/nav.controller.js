(function() {
    'use strict';

    angular
        .module('vpod.nav')
        .controller('navCtrl', navCtrl);

    navCtrl.$inject = ['Feed', 'pubSub'];

    /**
     * @name navCtrl
     * @desc Controller attached to the episode navigation of the app.
     * Responds to when user plays an episode by publishing the event
     * @param  {Object} Feed
     * @param  {Object} pubSub
     */
    function navCtrl(Feed, pubSub) {

        this.feed = Feed.getCached();

        /**
         * @name select
         * @desc Called when user selects an episode to play.
         * Publishes the play event.
         * @param  {Number} i Index of episode in items list
         * @return {void}
         */
        this.select = function(i) {
            pubSub.pub('play', [i]);
        }
    }
})();

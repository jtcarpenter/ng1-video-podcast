(function() {
    'use strict';

    angular
        .module('vpod.nav')
        .controller('navCtrl', navCtrl);

    navCtrl.$inject = ['Feed', 'pubSub'];

    function navCtrl(Feed, pubSub) {
        var that = this;
        this.feed = Feed.getCached();

        this.select = function(i) {
            pubSub.pub('play', [i]);
        }
    }
})();

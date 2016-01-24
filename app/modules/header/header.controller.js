(function() {
    'use strict';

    angular
        .module('vpod.header')
        .controller('headerCtrl', headerCtrl);

    headerCtrl.$inject = ['Feed', 'loader'];

    /**
     * @name headerCtrl
     * @desc Controller attached to the header element in the app.
     * The feed is retrieved from here.
     * @param  {Object} Feed
     * @param  {Object} loader
     */
    function headerCtrl(Feed, loader) {
        var that = this;
        
        this.spinning = true;
        this.loader = loader;

        loadFeed();

        function loadFeed() {
            that.feed = Feed.get({}, function() {}, function(error) {
                console.log(error);
            });
        }
    }
})();

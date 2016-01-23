(function() {
    'use strict';

    angular
        .module('vpod.header')
        .controller('headerCtrl', headerCtrl);

    headerCtrl.$inject = ['Feed', 'loader'];

    function headerCtrl(Feed, loader) {
        var that = this;
        
        this.spinning = true;
        this.loader = loader;

        loadFeed();

        function loadFeed() {
            that.feed = Feed.get({}, function() {that.spinning = false}, function(error) {
                console.log(error);
            });
        }
    }
})();

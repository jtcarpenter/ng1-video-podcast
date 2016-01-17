(function() {
    'use strict';

    angular
        .module('vpod.nav', [])
})();

(function() {
    'use strict';

    angular
        .module('vpod.nav')
        .controller('navCtrl', navCtrl);

    navCtrl.$inject = ['Feed'];

    function navCtrl(Feed) {
        var that = this;
        this.feed = Feed.getCached();

        this.select = function(i) {
            Feed.select(i);
        }
    }
})();

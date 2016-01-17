(function() {
    'use strict';

    angular
        .module('vpod.header', [])
})();

(function() {
    'use strict';

    angular
        .module('vpod.header')
        .controller('headerCtrl', headerCtrl);

    headerCtrl.$inject = ['Feed'];

    function headerCtrl(Feed) {
        var that = this;
        this.feed = Feed.get({}, function() {}, function(error) {
            console.log(error);
        });
    }
})();

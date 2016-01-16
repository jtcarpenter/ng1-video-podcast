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

    headerCtrl.$inject = [];

    function headerCtrl() {
        this.title = '[podcast title]';
        this.description = '[podcast description]';
    }
})();
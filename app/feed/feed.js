(function() {
    'use strict';

    angular
        .module('vpod.feed', [])
})();

(function() {
    'use strict';

    angular
        .module('vpod.feed')
        .controller('feedCtrl', feedCtrl);

    feedCtrl.$inject = [];

    function feedCtrl() {
        this.episodes = [{name: '[episode name]'}, {name: '[episode name]'}];
    }
})();

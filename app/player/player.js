(function() {
    'use strict';

    angular
        .module('vpod.player', [])
})();

(function() {
    'use strict';

    angular
        .module('vpod.player')
        .controller('playerCtrl', playerCtrl);

    playerCtrl.$inject = ['Feed', '$sce'];

    function playerCtrl(Feed, $sce) {
        var that = this;

        function play(o) {
            that.episode = $sce.trustAsResourceUrl(o.link);
        }

        Feed.register(play);
    }
})();

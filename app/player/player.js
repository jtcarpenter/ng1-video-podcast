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

        function play(episode) {
            that.episode = episode;
            that.episode.enclosures = episode.enclosures.map(function(enc) {
                if (/^video\/[a-zA-Z0-9]+$/.test(enc.type)) {
                    return enc;
                }
            });
        }

        Feed.register(play);
    }
})();

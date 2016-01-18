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

    // TODO: change module name
    function playerCtrl(Feed, $sce) {
        var that = this;

        this.episode = {};
        this.controls = {};

        function play(episode) {
            that.episode.title = episode.title;
            that.episode.enclosures = episode.enclosures.map(function(enc) {
                if (/^video\/[a-zA-Z0-9]+$/.test(enc.type)) { // TODO: Move into directive
                    return enc;
                }
            });

            that.controls.play();
        }

        Feed.register(play);
    }
})();

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
            that.episode.enclosures = episode.enclosures.filter(function(enc) {
                // TODO: Move - this probably also needs to happen when reducing list to 4 episodes
                return /^video\/[a-zA-Z0-9]+$/.test(enc.type);
            });

            that.controls.play();
        }

        Feed.register(play);
    }
})();

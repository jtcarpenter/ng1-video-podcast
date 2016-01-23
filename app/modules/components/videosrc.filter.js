(function() {
    'use strict';

    angular
        .module('vpod.components')
        .filter('videoSrc',videoSrc);

    videoSrc.$inject = [];

    function videoSrc() {
        return function(enclosures) {
            if (typeof enclosures === 'undefined') return false;
            return enclosures.filter(function(enc) {
                return /^video\/[a-zA-Z0-9]+$/.test(enc.type);
            });
        }
    }
})();

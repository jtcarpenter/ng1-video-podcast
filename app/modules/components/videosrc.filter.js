(function() {
    'use strict';

    angular
        .module('vpod.components')
        .filter('videoSrc',videoSrc);

    videoSrc.$inject = [];

    /**
     * @name videoSrc
     * @desc Filters an array of objects
     * checking their type property to see if it looks like a video
     * @return {Array} Filtered array of objects
     */
    function videoSrc() {
        return function(enclosures) {
            if (typeof enclosures === 'undefined') return false;
            return enclosures.filter(function(enc) {
                return /^video\/[a-zA-Z0-9]+$/.test(enc.type);
            });
        }
    }
})();

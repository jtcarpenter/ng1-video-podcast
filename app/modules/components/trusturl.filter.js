(function() {
    'use strict';

    angular
        .module('vpod.components')
        .filter('trustUrl',trustUrl);

    trustUrl.$inject = ['$sce'];

    /**
     * @name trustUrl
     * @desc Allow defining a dynamic url to be trusted
     * @param {Object} $sce Service which provides Strict Contextual Escaping
     * @return {Function}
     */
    function trustUrl($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        }
    }
})();

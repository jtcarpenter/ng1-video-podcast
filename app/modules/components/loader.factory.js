(function() {
    'use strict';

    angular
        .module('vpod.components')
        .factory('loader', loader);

    /**
     * @name loader
     * @desc Simple factory to hold global loading state
     * @return {Object}
     */
    function loader() {

        return {
            loading: false
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('vpod.components')
        .factory('loader', loader);

    function loader() {

        return {
            loading: false
        };
    }
})();

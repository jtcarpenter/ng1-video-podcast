(function() {
    'use strict';

    angular
        .module('vpod.components')
        .filter('formatDate',formatDate);

    formatDate.$inject = [];

    /**
     * to2D
     * @param  {Number} num 
     * @return {String} 
     */
    function to2D(num) {
        return ('0' + num).slice(-2);
    }

    /**
     * FormatDate
     * @desc Takes a date strng and returns in a different format
     */
    function formatDate() {
        return function(dateStr) {
            var d = new Date(dateStr);

            // If dateStr is invalid date (d is NaN) just return the string
            if (d.getTime() !== d.getTime()) {
                return dateStr;
            }
            return to2D(d.getDate()) +
                '/' + to2D(d.getMonth() + 1) +
                '/' + d.getFullYear() +
                ' ' + to2D(d.getHours()) +
                ':' + to2D(d.getMinutes());
        }
    }
})();

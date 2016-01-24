/**
 * formatDate Filter
 * @namespace Filters
 */
(function() {
    'use strict';

    angular
        .module('vpod.components')
        .filter('formatDate',formatDate);

    formatDate.$inject = [];

    function to2D(num) {
        return ('0' + num).slice(-2);
    }

    function formatDate() {
        return function(dateStr) {
            var d = new Date(dateStr);
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

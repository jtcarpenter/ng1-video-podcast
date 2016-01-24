/**
 * vpodNav Directive
 * @namespace Directives
 */
(function() {
    'use strict';

    angular
        .module('vpod.nav')
        .directive('vpodNav', vpodNav);

    vpodNav.$inject = ['$document'];

    function vpodNav($document) {

        var ITEM_ID = 'episode-',
            UP_ID = 'up-id',
            DOWN_ID = 'down-id';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                items: '=',
                onSelect: '='
            },

            link: function ($scope, elem, attrs, ctrl, transclude) {
                $scope.up = up;
                $scope.down = down;

                $scope.itemId = ITEM_ID;
                $scope.upId = UP_ID;
                $scope.downId = DOWN_ID;

                function nextEl(diff) {
                    var curr = $scope.items.map(function(item){
                            return item.focussed;
                        })
                        .indexOf('focussed'),
                        next = curr += diff;

                    return document.getElementById(ITEM_ID + next);
                }

                function move(el) {
                    if (el) el.focus();
                }

                function up() {
                    move(nextEl(-1));
                }

                function down() {
                    move(nextEl(1));
                }

                elem.bind('keydown', function (event) {

                    if (event.keyCode === 38) { // Up

                        // If we are currently focussed on the down button
                        // move focus to the last item
                        if (document.activeElement.id === DOWN_ID) {
                            move(document.getElementById(ITEM_ID +
                                ($scope.items.length - 1)));
                        }

                        // Else attempt move to next item above
                        else {
                            move(nextEl(-1));
                        }
                    }

                    if (event.keyCode === 40) { // Down

                        // If we are currently focussed on the container or the up button
                        // move focus to first item
                        if (document.activeElement === elem[0] ||
                            document.activeElement.id === UP_ID) {

                            move(document.getElementById(ITEM_ID + '0'));
                        }

                        // Else attempt move to next item below
                        else {
                            move(nextEl(1));
                        }
                    }
                });

                $scope.onFocus = function(item, $event) {
                    angular.forEach($scope.items, function(item) {
                        item.focussed = undefined;
                    });
                    item.focussed = 'focussed';
                };
            },

            templateUrl: '/modules/nav/vpodnav.view.html'
        }
    }
})();

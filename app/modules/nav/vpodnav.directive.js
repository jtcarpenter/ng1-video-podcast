(function() {
    'use strict';

    angular
        .module('vpod.nav')
        .directive('vpodNav', vpodNav);

    vpodNav.$inject = ['$document'];

    /**
     * @name vpodNav
     * @desc Directive to handle navigation of the episodes list.
     * Responds to users clicking the up/down buttons
     * and also the up/down cursor keys.
     * @param  {Object} $documents
     * @return {Object}
     */
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

                /**
                 * @name nextEl
                 * @desc Attempts to navigate to next/prev episode in list.
                 * @param  {Number} diff Number of positions to move in list.
                 * 1 navigates to next, -1 navigates to prev.
                 * @return {Object|null} HTML node if found
                 */
                function nextEl(diff) {
                    var curr = $scope.items.map(function(item){
                            return item.focussed;
                        })
                        .indexOf('focussed'),
                        next = curr += diff;

                    console.log(typeof document.getElementById(ITEM_ID + next));
                    return document.getElementById(ITEM_ID + next);
                }

                /**
                 * @name move
                 * @desc Move focus to element
                 * @param  {Object} el
                 */
                function move(el) {
                    if (el) el.focus();
                }

                /**
                 * @name up
                 * @desc Move to next element in list
                 */
                function up() {
                    move(nextEl(-1));
                }

                /**
                 * @name down
                 * @desc Move to previous element in list
                 */
                function down() {
                    move(nextEl(1));
                }

                elem.on('keydown', function (event) {

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

                /**
                 * @name onFocus
                 * @desc Callback function when element takes focus.
                 * Sets 'focussed' property to undefined on all elements,
                 * Sets it to true on element taking focus
                 * @param  {Object} item   item object in model
                 */
                $scope.onFocus = function(item) {
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

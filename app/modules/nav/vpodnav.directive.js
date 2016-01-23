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

                function up() {
                    var curr = $scope.items.map(function(item){ return item.focussed; }).indexOf('focussed'),
                        next = curr -= 1,
                        nextEl = document.getElementById(ITEM_ID + next);
                    if (nextEl) {
                        nextEl.focus();
                    }
                }

                function down() {
                    var curr = $scope.items.map(function(item){ return item.focussed; }).indexOf('focussed'),
                        next = curr += 1,
                        nextEl = document.getElementById(ITEM_ID + next);
                    if (nextEl) {
                        nextEl.focus();
                    }
                }
                elem.bind('keydown', function (event) {

                    if (event.keyCode === 38) { // Up
                        if (document.activeElement.id === DOWN_ID) {
                            console.log(ITEM_ID + ($scope.items.length - 1));
                            var nextEl = document.getElementById(ITEM_ID + ($scope.items.length - 1));
                        }
                        if (new RegExp('^' + ITEM_ID + '[0-9]+$').test(document.activeElement.id)) {
                            var curr = parseInt(document.activeElement.id.replace(ITEM_ID, ''), 10),
                                next = curr -= 1,
                                nextEl = document.getElementById(ITEM_ID + next);
                        }
                        if (nextEl) {
                            nextEl.focus();
                        }
                    }

                    if (event.keyCode === 40) { // Down

                        if (document.activeElement === elem[0] ||
                            document.activeElement.id === UP_ID) {

                            var nextEl = document.getElementById(ITEM_ID + '0');
                        }

                        if (new RegExp('^' + ITEM_ID + '[0-9]+$').test(document.activeElement.id)) {
                            var curr = parseInt(document.activeElement.id.replace(ITEM_ID, ''), 10),
                                next = curr += 1,
                                nextEl = document.getElementById(ITEM_ID + next);
                        }

                        if (nextEl) {
                            nextEl.focus();
                        }
                    }
                });

                $scope.onFocus = function(item, $event) {
                    angular.forEach($scope.items, function(item) {
                        item.focussed = undefined;
                    });
                    item.focussed = 'focussed';
                };

                $scope.onBlur = function(item, $event) {
                    // item.focussed = undefined;
                };
            },

            compile: function(elem, attrs) {
                return this.link;
            },

            templateUrl: '/modules/nav/vpodnav.view.html'
        }
    }
})();

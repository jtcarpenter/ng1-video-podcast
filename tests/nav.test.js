(function() {
    'use strict';

    var triggerKeyDown = function (el, keyCode) {
        var event = document.createEvent('Event');
        event.keyCode = keyCode;
        event.initEvent('keydown');
        el[0].dispatchEvent(event);
    };

    describe('Nav', function() {

        var $rootScope;

        beforeEach(function() {
            module('vpod');
            module('templates');

            inject(function(_$rootScope_) {
                $rootScope = _$rootScope_;
            });
        });

        describe('vpodNav directive', function() {

            var $compile,
                $httpBackend,
                element,
                $scope,
                html =  '<vpod-nav items="items" on-select="onSelect">' +
                        '</vpod-nav>',
                mockItems = [{name:'test1'},{name:'test2'}],
                mockOnSelect = function(i) {return i},
                itemAnchors,
                buttons;

            beforeEach(function() {

                inject(function(_$compile_, _$httpBackend_) {
                    $compile = _$compile_;
                    $httpBackend = _$httpBackend_;
                });

                $scope = $rootScope.$new();
                $scope.items = mockItems;
                $scope.onSelect = mockOnSelect;
                element = $compile(html)($scope);
                angular.element(document.body).append(element);
                $scope.$digest();
                itemAnchors = element[0].querySelectorAll('ul a');
                buttons = element[0].querySelectorAll('.nav-btn');

            });

            it('should compile and have class, \'episodes\'', function() {
                expect(element.hasClass('episodes')).toBe(true);
            });

            it('should bind \'items\' to isolateScope', function() {
                expect(element.isolateScope().items).toEqual(mockItems);
            });

            it('should bind \'onSelect\' callback to isolateScope', function() {
                var i = 1;
                expect(typeof element.isolateScope().onSelect).toEqual('function');
                expect(element.isolateScope().onSelect(i)).toEqual(i);
            });

            it('should call \'onSelect\' callback when items clicked', function() {
                var onSelectSpy = spyOn(element.isolateScope(), 'onSelect');

                expect(itemAnchors.length).toBe(2);
                expect(onSelectSpy).not.toHaveBeenCalled();

                angular.element(itemAnchors[1]).triggerHandler('click');
                expect(onSelectSpy).toHaveBeenCalled();
            });

            it('should set \'focussed\' flag when an item receives focus', function() {
                var i = 1;
                expect($scope.items[i].focussed).toBeFalsy();

                angular.element(itemAnchors[i]).triggerHandler('focus');
                expect($scope.items[i].focussed).toBeTruthy();
            });

            it('should navigate focus up list of items using keyboard', function() {
                var i = 1;
                angular.element(itemAnchors[i]).triggerHandler('focus');
                expect($scope.items[i].focussed).toBeTruthy();
                triggerKeyDown(element, 38);
                expect($scope.items[i - 1].focussed).toBeTruthy();
            });

            it('should navigate focus down list of items using keyboard', function() {
                var i = 0;
                angular.element(itemAnchors[i]).triggerHandler('focus');
                expect($scope.items[i].focussed).toBeTruthy();
                triggerKeyDown(element, 40);
                expect($scope.items[i + 1].focussed).toBeTruthy();
            });

            it('should not navigate up at start of list of items', function() {
                var i = 0;
                angular.element(itemAnchors[i]).triggerHandler('focus');
                expect($scope.items[i].focussed).toBeTruthy();
                triggerKeyDown(element, 38);
                expect($scope.items[i - 1]).not.toBeDefined();
                expect($scope.items[i].focussed).toBeTruthy();
            });

            it('should not navigate down at end of list of items', function() {
                var i = 1;
                angular.element(itemAnchors[i]).triggerHandler('focus');
                expect($scope.items[i].focussed).toBeTruthy();
                triggerKeyDown(element, 40);
                expect($scope.items[i + 1]).not.toBeDefined();
                expect($scope.items[i].focussed).toBeTruthy();
            });

            it('should navigate up when up button clicked', function() {
                var i = 1,
                    upButton = buttons[0];

                expect(upButton).toBeDefined();
                angular.element(itemAnchors[i]).triggerHandler('focus');
                expect($scope.items[i].focussed).toBeTruthy();
                angular.element(upButton).triggerHandler('click');
                expect($scope.items[i - 1].focussed).toBeTruthy();
            });

            it('should navigate down when down button clicked', function() {
                var i = 0,
                    downButton = buttons[1];

                expect(downButton).toBeDefined();
                angular.element(itemAnchors[i]).triggerHandler('focus');
                expect($scope.items[i].focussed).toBeTruthy();
                angular.element(downButton).triggerHandler('click');
                expect($scope.items[i + 1].focussed).toBeTruthy();
            });
        });

        describe('navCtrl', function() {
            var navCtrl,
                $controller;

            beforeEach(function() {
                inject(function(_$controller_) {
                    $controller = _$controller_;
                });
                navCtrl = $controller('navCtrl');
            });

            it('should be defined', function() {
                expect(navCtrl).toBeDefined();
            });
        });
    });
})();

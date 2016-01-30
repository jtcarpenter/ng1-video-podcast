(function() {
    'use strict';

    describe('Header', function() {

        beforeEach(function() {
            module('vpod');
        });

        describe('headerCtrl', function() {
            var headerCtrl,
                $controller;

            beforeEach(function() {
                inject(function(_$controller_) {
                    $controller = _$controller_;
                });
                headerCtrl = $controller('headerCtrl');
            });

            it('should be defined', function() {
                expect(headerCtrl).toBeDefined();
            });
        });
    });
})();

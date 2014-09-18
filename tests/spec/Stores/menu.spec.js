define([
    'jasmine_matchers', 'react', 'jquery', 'fluxxor', 'sugar',
    'build/Stores/menu'
], function () {
    describe('Menu store', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('its state should be an object', function () {

            var Store = require('build/Stores/menu');
            var store = new Store();

            expect(store.getState()).toBeAnObject();

        });

    });

});
define([
    'jasmine_matchers', 'react', 'jquery', 'fluxxor', 'sugar',
    'build/Stores/page'
], function () {
    describe('Page store', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('its state should be an array', function () {

            var Store = require('build/Stores/page');
            var store = new Store();

            expect(store.getState()).toBeAnArray();

        });
        
    });

});
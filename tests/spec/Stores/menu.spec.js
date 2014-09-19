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

        it('sorting should return same menu', function() {

            var Store = require('build/Stores/menu');
            var store = new Store();

            var menu = {
                menu: [
                    {
                        id: 2
                    },
                    {
                        id: 3
                    }
                ]
            }

            expect(store.addKeys(menu).menu.length).toBe(menu.menu.length);
        });

        it('adding keys should return same menu', function() {

            var Store = require('build/Stores/menu');
            var store = new Store();

            var menu = {
                menu: [
                    {
                        id: 2
                    },
                    {
                        id: 3
                    }
                ]
            }

            expect(store.addKeys(menu).menu.length).toBe(menu.menu.length);
        });
        
    });

});
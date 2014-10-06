define([
    'jasmine_matchers', 'react', 'jquery', 'fluxxor', 'sugar',
    'build/Stores/items'
], function () {
    describe('Items store', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('its state should have all keys', function () {

            var Store = require('build/Stores/items');
            var store = new Store();

            expect(store.getState('/the/resource')).toHaveKeys([
                'target',
                'items',
                'paging'
            ]);

        });

        it('should set items when setItems is called', function () {

            var Store = require('build/Stores/items');
            var store = new Store();

            expect(store.getState('/the/resource').items.length).toBe(0);

            store.setItems(
                {
                    target: '/the/resource'
                },
                {
                    items: [
                        {
                            id: 2
                        },
                        {
                            id: 3
                        }
                    ]
                }
            );

            expect(store.getState('/the/resource').items.length).toBe(2);

        });

        it('should add items when addItems is called', function () {

            var Store = require('build/Stores/items');
            var store = new Store();

            expect(store.getState('/the/resource').items.length).toBe(2);

            store.addItems(
                {
                    resource: '/the/resource',
                    items: {
                        items: [
                            {
                                id: 2
                            }
                        ]
                    }
                }
            );

            expect(store.getState('/the/resource').items.length).toBe(3);

        });
        
        it('should return a boolean when exists is called', function() {

            var Store = require('build/Stores/items');
            var store = new Store();
            
            store.getState('/the/resource');
            expect(store.exists('/the/resource')).toBe(true);
        });

        it('should return the a list of items', function() {

            var Store = require('build/Stores/items');
            var store = new Store();
            
            var items = [
                {
                    id: 2,
                    order: 1
                },
                {
                    id: 3,
                    order: 2
                }
            ];

            expect(store.sortItems(items).length).toBe(items.length);
        })
    });

});
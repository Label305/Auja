define(['build/Objects/Menu/resource'], function (Item) {
    describe('Resource menu item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should implement a menu item', function () {

            var item = new Item({});
            
            item.setOrder(72);
            item.setIsActive(true);
            
            expect(item.getType()).toBe('resource');
            expect(item.getOrder()).toBe(72);
            expect(item.getProperties()).toBeAnObject();
            expect(item.isActive()).toBe(true);
        });


        it('should have properties', function () {

            var item = new Item({
                properties: {
                    searchable: {
                        target: 'http://searchme'
                    }
                }
            });
            
            expect(item.hasProperty('searchable')).toBe(true);
            expect(item.getProperties().length).toBe(1);
            expect(item.getProperty('searchable').getTarget()).toBe('http://searchme');

            var item = new Item({});
            expect(item.hasProperty('searchable')).toBe(false);
            expect(item.getProperties()).toBeAnArray();

        });
    });
});

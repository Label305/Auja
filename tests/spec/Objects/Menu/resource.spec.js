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
            expect(item.isActive()).toBe(true);
        });
        
        //TODO: implement other methods
    });
});

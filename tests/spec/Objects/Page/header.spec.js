define(['build/Objects/Page/header'], function (Item) {
    describe('Header page item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });
        
        it('should implement a text property', function() {

            var item = new Item({});
            
            expect(item.getText()).toBe('');
            item.setText('A nice title');
            expect(item.getText()).toBe('A nice title');
        });
        
        it('should implement a page item', function () {
            
            var item = new Item({});
            
            expect(item.getType()).toBe('header');
            expect(item.getOrder()).toBe(0);
            
            item.setOrder(7);
            
            expect(item.getOrder()).toBe(7);
        });
    });
});

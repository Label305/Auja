define(['build/Objects/Page/form'], function (Item) {
    describe('Form page item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });
        
        it('should implement form methods', function() {


            var item = new Item({});

            //Setting of items
            expect(item.getItems().length).toBe(0);
            item.setItems([
                {
                    type: 'text',
                    text: {
                        //Not needed
                    }
                }    
            ]);
            expect(item.getItems().length).toBe(1);
            
            //Form method
            expect(item.getMethod()).toBe('post');
            item.setMethod('get');
            expect(item.getMethod()).toBe('get');
            
            //Form action
            expect(item.getAction()).toBe(null);
            item.setAction('/users');
            expect(item.getAction()).toBe('/users');
        });
        
        it('should implement a page item', function () {
            
            var item = new Item({});
            
            expect(item.getType()).toBe('form');
            expect(item.getOrder()).toBe(0);
            
            item.setOrder(7);
            
            expect(item.getOrder()).toBe(7);
        });
    });
});

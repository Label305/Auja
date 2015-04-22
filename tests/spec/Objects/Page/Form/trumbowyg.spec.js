define(['build/Objects/Page/Form/trumbowyg'], function (Item) {
    describe('Trumbowyg RTE form item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });
        
        it('should return corresponding attributes', function () {
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: 'James',
                required: true
            });

            expect(item.getAttributes()).toHaveKeys([
                'type',
                'value',
                'name'
            ]);

        });
        
        it('should implement a form item', function () {

            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: 'James',
                required: true
            });

            //Text spec of transferring initial data
            expect(item.getType()).toBe('trumbowyg');
            expect(item.getOrder()).toBe(10);
            expect(item.getName()).toBe('thename');
            expect(item.getLabel()).toBe('The name');
            expect(item.getValue()).toBe('James');
            expect(item.isRequired()).toBe(true);

            //Test spec of setters
            item.setOrder(2);
            item.setName('somename');
            item.setLabel('Your name');
            item.setValue('Charles');
            item.setRequired(false);
            
            expect(item.getOrder()).toBe(2);
            expect(item.getName()).toBe('somename');
            expect(item.getLabel()).toBe('Your name');
            expect(item.getValue()).toBe('Charles');
            expect(item.isRequired()).toBe(false);
            
        });

        it('should allow for overriding the default buttons', function() {

            var buttons = ['bold'];
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: 'James',
                required: true,
                buttons: buttons
            });
            
            expect(item.getButtons()).toBe(buttons);
        });
        
        it('should have default buttons', function() {

            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: 'James',
                required: true
            });

            expect(item.getButtons().length).toBe(['header', 'bold', 'italic', '|', 'unorderedList', 'orderedList', '|', 'insertImage', 'link', '|', 'viewHTML', 'fullscreen'].length);
            
        });
    });
});

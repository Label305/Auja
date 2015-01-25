define(['build/Objects/Page/Form/range'], function (Item) {
    describe('Range form item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should return corresponding attributes', function () {
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: 11,
                min: 1,
                max: 100,
                required: true
                
            });

            expect(item.getAttributes()).toHaveKeys([
                'type',
                'value',
                'name',
                'min',
                'max'
            ]);
            
            expect(item.getValue()).toBe(11);

        });

        it('should implement a form item', function () {

            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: 11,
                min: 1,
                max: 100,
                required: true
            });

            //Test spec of transferring initial data
            expect(item.getType()).toBe('range');
            expect(item.getOrder()).toBe(10);
            expect(item.getName()).toBe('thename');
            expect(item.getLabel()).toBe('The name');
            expect(item.getValue()).toBe(11);
            expect(item.getMin()).toBe(1);
            expect(item.getMax()).toBe(100);
            expect(item.isRequired()).toBe(true);

            //Test spec of setters
            item.setOrder(2);
            item.setName('somename');
            item.setLabel('Your name');
            item.setMin(3);
            item.setMax(56);
            item.setValue(14);
            item.setRequired(false);
            
            expect(item.getOrder()).toBe(2);
            expect(item.getName()).toBe('somename');
            expect(item.getLabel()).toBe('Your name');
            expect(item.getMin()).toBe(3);
            expect(item.getMax()).toBe(56);
            expect(item.getValue()).toBe(14);
            expect(item.isRequired()).toBe(false);
            
        });

    });
});

define(['build/Objects/Page/Form/date'], function (Item) {
    describe('Date form item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should return corresponding attributes', function () {
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: '17-08-1982',
                format: 'MM-DD-YYYY',
                required: true
            });
            
            expect(item.getAttributes()).toHaveKeys([
                'type',
                'value',
                'name',
                'format'
            ]);
            
        });

        it('should implement a form item', function () {

            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: '17-08-1982',
                format: 'MM-DD-YYYY',
                required: true
            });

            //Text spec of transferring initial data
            expect(item.getType()).toBe('date');
            expect(item.getOrder()).toBe(10);
            expect(item.getName()).toBe('thename');
            expect(item.getLabel()).toBe('The name');
            expect(item.getValue()).toBe('17-08-1982');
            expect(item.isRequired()).toBe(true);

            //Test spec of setters
            item.setOrder(2);
            item.setName('somename');
            item.setLabel('Your name');
            item.setValue('30-03-2014');
            item.setFormat('DD-MM-YYYY');
            item.setRequired(false);

            expect(item.getOrder()).toBe(2);
            expect(item.getName()).toBe('somename');
            expect(item.getLabel()).toBe('Your name');
            expect(item.getValue()).toBe('30-03-2014');
            expect(item.getFormat()).toBe('DD-MM-YYYY');
            expect(item.isRequired()).toBe(false);

        });

    });
});

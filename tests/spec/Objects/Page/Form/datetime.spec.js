define(['build/Objects/Page/Form/datetime'], function (Item) {
    describe('DateTime form item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should return corresponding attributes', function () {
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: '17-08-1982 07:17:04',
                format: 'YYYY-MM-DD HH:mm:ss',
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
                value: '17-08-1982 07:17:04',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true
            });

            //Text spec of transferring initial data
            expect(item.getType()).toBe('datetime');
            expect(item.getOrder()).toBe(10);
            expect(item.getName()).toBe('thename');
            expect(item.getLabel()).toBe('The name');
            expect(item.getValue()).toBe('17-08-1982 07:17:04');
            expect(item.isRequired()).toBe(true);

            //Test spec of setters
            item.setOrder(2);
            item.setName('somename');
            item.setLabel('Your name');
            item.setValue('30-03-2014 02:05:01');
            item.setFormat('DD-MM-YYYY hh:mm');
            item.setRequired(false);

            expect(item.getOrder()).toBe(2);
            expect(item.getName()).toBe('somename');
            expect(item.getLabel()).toBe('Your name');
            expect(item.getValue()).toBe('30-03-2014 02:05:01');
            expect(item.getFormat()).toBe('DD-MM-YYYY hh:mm');
            expect(item.isRequired()).toBe(false);

        });

    });
});

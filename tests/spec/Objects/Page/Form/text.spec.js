define(['build/Objects/Page/Form/text'], function (Item) {
    describe('Text form item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should have a maxlength property', function () {
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: 'James',
                required: true,
                maxLength: 111
            });
            
            expect(item.getMaxLength()).toBe(111);
            
            item.setMaxLength(72);
            
            expect(item.getMaxLength()).toBe(72);
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
                'name',
                'maxLength'
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
            expect(item.getType()).toBe('text');
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

    });
});

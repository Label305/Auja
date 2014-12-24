define(['build/Objects/Page/Form/checkbox'], function (Item) {
    describe('Checkbox form item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should return corresponding attributes', function () {
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: true,
                checked: true,
                required: true,
                fallback: false
            });

            expect(item.getAttributes()).toHaveKeys([
                'type',
                'value',
                'name',
                'checked',
                'fallback'
            ]);

        });

        it('should implement a form item', function () {

            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: true,
                checked: true,
                required: true,
                fallback: false
            });

            //Text spec of transferring initial data
            expect(item.getType()).toBe('checkbox');
            expect(item.getOrder()).toBe(10);
            expect(item.getName()).toBe('thename');
            expect(item.getLabel()).toBe('The name');
            expect(item.isChecked()).toBe(true);
            expect(item.isRequired()).toBe(true);
            expect(item.hasFallback()).toBe(false);

            //Test spec of setters
            item.setOrder(2);
            item.setName('somename');
            item.setLabel('Your name');
            item.setIsChecked(false);
            item.setRequired(false);
            item.setHasFallback(true);

            expect(item.getOrder()).toBe(2);
            expect(item.getName()).toBe('somename');
            expect(item.getLabel()).toBe('Your name');
            expect(item.isChecked()).toBe(false);
            expect(item.isRequired()).toBe(false);
            expect(item.hasFallback()).toBe(true);

        });

    });
});

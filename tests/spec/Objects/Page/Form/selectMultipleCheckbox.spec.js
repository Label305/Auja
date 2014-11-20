define(['build/Objects/Page/Form/select_multiple_checkbox'], function (Item) {
    describe('SelectMultipleCheckbox form item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should return corresponding attributes', function () {
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                options: [
                    {
                     label: 'Jupiler',
                     checked: false
                    },
                    {
                    label: 'Grolsch',
                    checked: true
                    },
                ],
                required: true
            });

            expect(item.getAttributes()).toHaveKeys([
                'type',
                'value',
                'name',
                'options'
            ]);

        });

        it('should implement a form item', function () {

            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                options: [
                    {
                     label: 'Jupiler',
                     checked: false
                    },
                    {
                    label: 'Grolsch',
                    checked: true
                    },
                ],
                required: true
            });

            //Text spec of transferring initial data
            expect(item.getType()).toBe('selectMultipleCheckbox');
            expect(item.getOrder()).toBe(10);
            expect(item.getName()).toBe('thename');
            expect(item.getLabel()).toBe('The name');
            expect(item.getOptions().length).toBe(2);
            expect(item.isRequired()).toBe(true);

            //Test spec of setters
            item.setOrder(2);
            item.setName('somename');
            item.setLabel('Your name');
            item.setOptions([
                    {
                     label: 'Jupiler',
                     checked: false
                    }                    
                ]);
            item.setRequired(false);
            
            expect(item.getOrder()).toBe(2);
            expect(item.getName()).toBe('somename');
            expect(item.getLabel()).toBe('Your name');
            expect(item.getOptions().length).toBe(1);
            expect(item.isRequired()).toBe(false);
            
        });

    });
});

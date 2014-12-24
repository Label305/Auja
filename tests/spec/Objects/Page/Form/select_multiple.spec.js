define(['build/Objects/Page/Form/select_multiple'], function (Item) {
    describe('SelectMultiple form item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should return corresponding attributes', function () {
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: ['JL','GL'],
                options: [
                    {
                    type: 'option',
                     label: 'Jupiler',
                     value: 'JL'
                    },
                    {
                    type: 'option',
                    label: 'Grolsch',
                    value: 'GL'
                    },
                    {
                    type: 'option',
                    label: 'Super Bier',
                    value: 'SB'
                    }
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
                value: ['JL','GL'],
                options: [
                    {
                    type: 'option',
                     label: 'Jupiler',
                     value: 'JL'
                    },
                    {
                    type: 'option',
                    label: 'Grolsch',
                    value: 'GL'
                    },
                    {
                    type: 'option',
                    label: 'Super Bier',
                    value: 'SB'
                    }
                ],
                required: true
            });

            //Text spec of transferring initial data
            expect(item.getType()).toBe('selectMultiple');
            expect(item.getValue()).toEqual(['JL','GL']);
            expect(item.getOrder()).toBe(10);
            expect(item.getName()).toBe('thename');
            expect(item.getLabel()).toBe('The name');
            expect(item.getOptions().length).toBe(3);
            expect(item.isRequired()).toBe(true);

            //Test spec of setters
            item.setOrder(2);
            item.setName('somename');
            item.setLabel('Your name');
            item.setValue(['GOLD']);
            item.setOptions([
                    {
                    type: 'option',
                    label: '305',
                    value: 'GOLD'
                    },
                    {
                    type: 'option',
                    label: 'Black',
                    value: 'BLACK'
                    }                    
                ]);
            item.setRequired(false);
            
            expect(item.getOrder()).toBe(2);
            expect(item.getValue()).toEqual(['GOLD']);
            expect(item.getName()).toBe('somename');
            expect(item.getLabel()).toBe('Your name');
            expect(item.getOptions().length).toBe(2);
            expect(item.isRequired()).toBe(false);
            
        });

    });
});

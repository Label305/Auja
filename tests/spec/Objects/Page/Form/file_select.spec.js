define(['build/Objects/Page/Form/file_select'], function (Item) {
    describe('File form item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should have a target property', function () {
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: 'James',
                required: true,
                target: '/uploads'
            });

            expect(item.getTarget()).toBe('/uploads');

            item.setTarget('/images/uploads');

            expect(item.getTarget()).toBe('/images/uploads');
        });

        it('should have a multiple property', function () {
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: 'James',
                required: true,
                target: '/uploads',
                ref: 123,
                multiple: false
            });

            expect(item.isMultiple()).toBe(false);

            item.setIsMultiple(true);

            expect(item.isMultiple()).toBe(true);
        });

        it('should have a files property', function () {
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: 'James',
                required: true,
                target: '/uploads',
                ref: 123,
                multiple: true,
                files: [
                    {
                        'name': 'bla'
                    }
                ]
            });

            expect(item.getFiles()[0].name).toBe('bla');

            item.setFiles([{
                'name': 'asdf'
            }]);

            expect(item.getFiles()[0].name).toBe('asdf');
        });

        it('should have a accept single file as property', function () {
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: 'James',
                required: true,
                target: '/uploads',
                ref: 123,
                multiple: false,
                file: {
                    'name': 'bla'
                }
            });

            expect(item.getFiles()[0].name).toBe('bla');
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
            expect(item.getType()).toBe('file_select');
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

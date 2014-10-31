define(['build/Objects/Menu/sortable_item'], function (Item) {
    describe('Sortable menu item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should implement link item specific methods', function () {

            var item = new Item({
                target: '/users',
                text: 'Howdy',
                left: 7,
                right: 8
            });

            expect(item.getTarget()).toBe('/users');
            expect(item.getText()).toBe('Howdy');
            expect(item.getLeft()).toBe(7);
            expect(item.getRight()).toBe(8);
            
            item.setTarget('/companies');
            item.setText('Label305');
            item.setLeft(5);
            item.setRight(6);

            expect(item.getTarget()).toBe('/companies');
            expect(item.getText()).toBe('Label305');
            expect(item.getLeft()).toBe(5);
            expect(item.getRight()).toBe(6);
        });

        it('should implement an update method which transfers properties', function () {
            var item = new Item({
                target: '/users',
                text: 'Howdy',
                left: 7,
                right: 8
            });

            expect(item.getTarget()).toBe('/users');
            expect(item.getText()).toBe('Howdy');
            expect(item.getLeft()).toBe(7);
            expect(item.getRight()).toBe(8);

            var updateItem = new Item({
                target: '/companies',
                text: 'Label305',
                left: 6,
                right: 7
            });            
            item.update(updateItem);

            expect(item.getTarget()).toBe('/companies');
            expect(item.getText()).toBe('Label305');
            expect(item.getLeft()).toBe(6);
            expect(item.getRight()).toBe(7);
        });

        it('should implement a menu item', function () {

            var item = new Item({});

            item.setOrder(72);
            item.setIsActive(true);

            expect(item.getType()).toBe('sortable_item');
            expect(item.getOrder()).toBe(72);
            expect(item.isActive()).toBe(true);
        });
    });
});

define(['build/Objects/Menu/link'], function (Item) {
    describe('Link menu item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should use its target as an ID', function () {

            var item = new Item({
                target: '/users'
            });

            expect(item.getTarget()).toBe('/users');
            expect(item.getId()).toBe(item.getTarget());
        });

        it('should implement link item specific methods', function () {

            var item = new Item({
                icon: 'face',
                target: '/users',
                text: 'Howdy'
            });

            expect(item.getIcon()).toBe('face');
            expect(item.getTarget()).toBe('/users');
            expect(item.getText()).toBe('Howdy');
            
            item.setIcon('factory');
            item.setTarget('/companies');
            item.setText('Label305');

            expect(item.getIcon()).toBe('factory');
            expect(item.getTarget()).toBe('/companies');
            expect(item.getText()).toBe('Label305');
        });

        it('should implement an update method which transfers properties', function () {
            var item = new Item({
                icon: 'face',
                target: '/users',
                text: 'Howdy'
            });

            expect(item.getIcon()).toBe('face');
            expect(item.getTarget()).toBe('/users');
            expect(item.getText()).toBe('Howdy');

            var updateItem = new Item({
                icon: 'factory',
                target: '/companies',
                text: 'Label305'
            });            
            item.update(updateItem);

            expect(item.getIcon()).toBe('factory');
            expect(item.getTarget()).toBe('/companies');
            expect(item.getText()).toBe('Label305');
        });

        it('should implement a menu item', function () {

            var item = new Item({});

            item.setOrder(72);
            item.setIsActive(true);

            expect(item.getType()).toBe('link');
            expect(item.getOrder()).toBe(72);
            expect(item.isActive()).toBe(true);
        });
    });
});

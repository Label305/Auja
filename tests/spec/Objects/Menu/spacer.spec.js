define(['build/Objects/Menu/spacer'], function (Item) {
    describe('Spacer menu item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should implement spacer item specific methods', function () {

            var item = new Item({
                text: 'Howdy'
            });

            expect(item.getText()).toBe('Howdy');

            item.setText('Label305');
            
            expect(item.getText()).toBe('Label305');
        });

        it('should implement an update method which transfers properties', function () {
            var item = new Item({
                text: 'Howdy'
            });
            
            expect(item.getText()).toBe('Howdy');

            var updateItem = new Item({
                text: 'Label305'
            });
            item.update(updateItem);

            expect(item.getText()).toBe('Label305');
        });


        it('should implement a menu item', function () {

            var item = new Item({});
            
            item.setId('some-id');
            item.setOrder(72);
            item.setIsActive(true);
            
            expect(item.getId()).toBe('some-id');
            expect(item.getType()).toBe('spacer');
            expect(item.getOrder()).toBe(72);
            expect(item.isActive()).toBe(true);
        });
    });
});

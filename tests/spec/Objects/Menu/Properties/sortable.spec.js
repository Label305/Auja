define(['build/Objects/Menu/Properties/sortable'], function (Property) {
    describe('Sortable property', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should implement a Property', function () {
            var property = new Property({});

            expect(property.getName()).toBe('sortable');
        });

        it('should have a target', function () {

            var property = new Property({
                target: 'http://sortme'
            });

            expect(property.getTarget()).toBe('http://sortme');

        })
    });
});

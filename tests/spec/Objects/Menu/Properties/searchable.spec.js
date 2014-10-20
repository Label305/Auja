define(['build/Objects/Menu/Properties/searchable'], function (Property) {
    describe('Searchable property', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should implement a Property', function () {
            var property = new Property({});

            expect(property.getName()).toBe('searchable');
        });

        it('should have a target', function () {

            var property = new Property({
                target: 'http://searchme'
            });

            expect(property.getTarget()).toBe('http://searchme');

        })
    });
});

/** @jsx React.DOM */
/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/menu.react', //Required since resource renders a menu inside itself
    'build/Components/Panels/Menu/resource.react',
    'build/Objects/Menu/resource',
    'build/Objects/menu',
    'jasmine_matchers'
], function (React, MenuView, Resource, Item, Menu) {
    describe('Resource menu item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should render a list item', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                text: "Text on the resource"
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Resource({
                item: item,
                panel: new Menu()
            }));

            //There just should be one single li rendered
            var elements = TestUtils.scryRenderedDOMComponentsWithTag(text, 'li');
            expect(elements.length).toBe(1);
        });
        
        it('should render a search input field', function () {
            var TestUtils = React.addons.TestUtils;
        
            var item = new Item({
                text: "Text on the resource",
                properties: {
                    "searchable": {
                        "target": "example/club_index.json?q=%s"
                    }
                }
            });
        
            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Resource({
                item: item,
                panel: new Menu()
            }));
        
            //There just should be one single input rendered
            var elements = TestUtils.scryRenderedDOMComponentsWithTag(text, 'input');
            expect(elements.length).toBe(1);
        })
    });
});
    
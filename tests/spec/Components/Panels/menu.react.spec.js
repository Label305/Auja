/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/menu.react',
    'build/Objects/menu',
    'jasmine_matchers'
], function (React, Menu, MenuObject) {

    describe('Menu', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should be able to render a menu item', function () {
            var TestUtils = React.addons.TestUtils;

            var menu = new MenuObject({});
            menu.setId(1);
            menu.setItems([
                {
                    "type": "link",
                    "order": 1,
                    "link": {
                        "text": "Add club",
                        "target": "example/clubs/create",
                        "icon": "ion-compose"
                    }
                },
                {
                    "type": "link",
                    "order": 1,
                    "link": {
                        "text": "Add club",
                        "target": "example/clubs/create",
                        "icon": "ion-compose"
                    }
                }
            ]);

            // Render a checkbox with label in the document
            var menu = TestUtils.renderIntoDocument(Menu({
                message: null,
                panel: menu
            }));

            //There just should be two li's rendered
            var elements = TestUtils.scryRenderedDOMComponentsWithTag(menu, 'li');
            expect(elements.length).toBe(2);
        });

    });
});
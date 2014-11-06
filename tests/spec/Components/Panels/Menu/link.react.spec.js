/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Menu/link.react',
    'build/Objects/Menu/link',
    'jasmine_matchers'
], function (React, Link, Item) {

    describe('Text menu item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should display its text', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                text: "Text on the link"
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Link({
                item: item
            }));

            var a = TestUtils.findRenderedDOMComponentWithTag(text, 'span');
            expect(a.getDOMNode().textContent).toEqual('Text on the link');
        });
    });
});
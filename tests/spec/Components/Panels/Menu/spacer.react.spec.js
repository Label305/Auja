/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Menu/spacer.react',
    'build/Objects/Menu/spacer',
    'jasmine_matchers'
], function (React, Spacer, Item) {

    describe('Text menu item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should display its text', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                text: "Text on the spacer"
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Spacer({
                item: item
            }));

            var a = TestUtils.findRenderedDOMComponentWithTag(text, 'li');
            expect(a.getDOMNode().textContent).toEqual('Text on the spacer');
        });
    });
});
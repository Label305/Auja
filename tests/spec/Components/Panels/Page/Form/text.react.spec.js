/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Page/Form/text.react',
    'build/Objects/Page/Form/text',
    'jasmine_matchers'
], function (React, Text, Item) {

    describe('Text form input', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should display its value', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: "Value of the input"
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Text({
                item: item
            }));

            var input = TestUtils.findRenderedDOMComponentWithTag(text, 'input');
            expect(input.getDOMNode().value).toEqual('Value of the input');
        });

        it('should have a label', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: "Value of the input",
                label: "This is the label"
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Text({
                item: item
            }));

            var label = TestUtils.findRenderedDOMComponentWithTag(text, 'label');
            expect(label.getDOMNode().textContent).toEqual('This is the label');
        });
    });
});
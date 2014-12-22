/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Page/Form/number.react',
    'build/Objects/Page/Form/number',
    'jasmine_matchers'
], function (React, Number, Item) {

    describe('Number form input', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should display its value', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: 10.25
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Number({
                item: item
            }));

            var input = TestUtils.findRenderedDOMComponentWithTag(text, 'input');

            //parseFloat since the value of an input is always a string
            expect(parseFloat(input.getDOMNode().value)).toEqual(10.25);
        });

        it('should have a label', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: 10.25,
                label: "This is the label"
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Number({
                item: item
            }));

            var label = TestUtils.findRenderedDOMComponentWithTag(text, 'label');
            expect(label.getDOMNode().textContent).toEqual('This is the label');
        });
    });
});
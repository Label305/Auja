/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Page/Form/range.react',
    'build/Objects/Page/Form/range',
    'jasmine_matchers'
], function (React, Range, Item) {

    describe('Range form input', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should display its value', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: 10
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Range({
                item: item
            }));

            var input = TestUtils.findRenderedDOMComponentWithTag(text, 'input');

            //parseInt since the value of an input is always a string 
            expect(parseInt(input.getDOMNode().value)).toEqual(10);
        });

        it('should have a label', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: 10,
                label: "This is the label"
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Range({
                item: item
            }));

            var label = TestUtils.findRenderedDOMComponentWithTag(text, 'label');
            expect(label.getDOMNode().textContent).toEqual('This is the label');
        });
    });
});
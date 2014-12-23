/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Page/Form/checkbox.react',
    'build/Objects/Page/Form/checkbox',
    'jasmine_matchers'
], function (React, Checkbox, Item) {

    describe('Checkbox form input', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should display its value', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                checked: true
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Checkbox({
                item: item
            }));

            var input = TestUtils.scryRenderedDOMComponentsWithTag(text, 'input');

                //Check the the fallback field
                expect(input[0].getDOMNode().type).toBe('hidden');
                expect(input[0].getDOMNode().value).toBe('0');

                //Check the checked state of the visible checkbox
                expect(input[1].getDOMNode().checked).toBe(true);
        });

        it('should have a label', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                checked: true,
                label: "This is the label"
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Checkbox({
                item: item
            }));

            var label = TestUtils.findRenderedDOMComponentWithTag(text, 'label');
            expect(label.getDOMNode().textContent).toEqual('This is the label');
        });
    });
});
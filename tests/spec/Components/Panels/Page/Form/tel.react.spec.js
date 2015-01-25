/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Page/Form/tel.react',
    'build/Objects/Page/Form/tel',
    'jasmine_matchers'
], function (React, Tel, Item) {

    describe('Tel form input', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should display its value', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: '+13 499537113'
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Tel({
                item: item
            }));

            var input = TestUtils.findRenderedDOMComponentWithTag(text, 'input');

            //parseInt since the value of an input is always a string
            expect(input.getDOMNode().value).toBe('+13 499537113');
        });

        it('should have a label', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: '+13 499537113',
                label: "This is the label"
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Tel({
                item: item
            }));

            var label = TestUtils.findRenderedDOMComponentWithTag(text, 'label');
            expect(label.getDOMNode().textContent).toEqual('This is the label');
        });
    });
});
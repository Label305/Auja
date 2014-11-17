/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Page/Form/color.react',
    'build/Objects/Page/Form/color',
    'jasmine_matchers'
], function (React, Color, Item) {

    describe('Color form input', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should display its value', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: '#aabbcc'
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Color({
                item: item
            }));

            var input = TestUtils.findRenderedDOMComponentWithTag(text, 'input');

            //parseInt since the value of an input is always a string 
            expect(input.getDOMNode().value).toEqual('#aabbcc');
        });

        it('should have a label', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: '#aabbcc',
                label: "This is the label"
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Color({
                item: item
            }));

            var label = TestUtils.findRenderedDOMComponentWithTag(text, 'label');
            expect(label.getDOMNode().textContent).toEqual('This is the label');
        });
    });
});
/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Page/Form/select.react',
    'build/Objects/Page/Form/select',
    'jasmine_matchers'
], function (React, SelectMultiple, Item) {

    describe('SelectMultiple form input', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should display its value', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: 'Luilekkerland, Nederland'
            });

            // Render a dropdown with label in the document
            var text = TestUtils.renderIntoDocument(SelectMultiple({
                item: item
            }));

            var input = TestUtils.findRenderedDOMComponentWithTag(text, 'input');
             
            expect(input.getDOMNode().value).toEqual('Luilekkerland, Nederland');
        });

        it('should have a label', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: 'Luilekkerland, Nederland',
                label: 'This is the label'
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(SelectMultiple({
                item: item
            }));

            var label = TestUtils.findRenderedDOMComponentWithTag(text, 'label');
            expect(label.getDOMNode().textContent).toEqual('This is the label');
        });
    });
});
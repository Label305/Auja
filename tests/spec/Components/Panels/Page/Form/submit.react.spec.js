/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Page/Form/submit.react',
    'build/Objects/Page/Form/submit',
    'jasmine_matchers'
], function (React, Submit, Item) {

    describe('Submit form input', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should display its value', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: 10
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Submit({
                item: item
            }));

            var input = TestUtils.findRenderedDOMComponentWithTag(text, 'input');

            //parseInt since the value of an input is always a string 
            expect(parseInt(input.getDOMNode().value)).toEqual(10);
        });

    });
});
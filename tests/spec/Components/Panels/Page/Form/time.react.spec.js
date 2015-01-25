/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Page/Form/time.react',
    'build/Objects/Page/Form/time',
    'jasmine_matchers'
], function (React, Time, Item) {

    describe('Time form input', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should display its value', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: '10:25',
                format: 'HH:mm:ss'
            });

            // Render a time field with label in the document
            var text = TestUtils.renderIntoDocument(Time({
                item: item
            }));

            var input = TestUtils.findRenderedDOMComponentWithTag(text, 'input');

            //parseInt since the value of an input is always a string 
            expect(input.getDOMNode().value).toEqual('10:25:00');
        });

        it('should have a label', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: '10:25',
                label: 'This is the label'
            });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Time({
                item: item
            }));

            var label = TestUtils.findRenderedDOMComponentWithTag(text, 'label');
            expect(label.getDOMNode().textContent).toEqual('This is the label');
        });
    });
});
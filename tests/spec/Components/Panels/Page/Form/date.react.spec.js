/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Page/Form/date.react',
    'build/Objects/Page/Form/date',
    'jasmine_matchers'
    ], function (React, Date, Item) {

        describe('Date form input', function () {

            beforeEach(function () {
                this.addMatchers(require('jasmine_matchers'));
            });

            it('should display its value', function () {
                var TestUtils = React.addons.TestUtils;

                var item = new Item({
                    value: '1982-08-17',
                    format: 'YYYY-MM-DD'
                });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Date({
                item: item
            }));

            var input = TestUtils.findRenderedDOMComponentWithTag(text, 'input');


                expect(input.getDOMNode().value).toEqual('1982-08-17');
        });

            it('should have a label', function () {
                var TestUtils = React.addons.TestUtils;

                var item = new Item({
                    value: "1982-08-17",
                    format: 'YYYY-MM-DD',
                    label: "This is the label"
                });

            // Render a checkbox with label in the document
            var text = TestUtils.renderIntoDocument(Date({
                item: item
            }));

            var label = TestUtils.findRenderedDOMComponentWithTag(text, 'label');
            expect(label.getDOMNode().textContent).toEqual('This is the label');
        });
        });
});
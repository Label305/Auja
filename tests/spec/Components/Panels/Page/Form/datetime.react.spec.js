/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Page/Form/datetime.react',
    'build/Objects/Page/Form/datetime',
    'jasmine_matchers'
    ], function (React, DateTime, Item) {

        describe('DateTime form input', function () {

            beforeEach(function () {
                this.addMatchers(require('jasmine_matchers'));
            });

            it('should display its value', function () {
                var TestUtils = React.addons.TestUtils;

                var item = new Item({
                    value: '1982-08-17 23:15:10',
                    format: 'YYYY-MM-DD HH:mm:ss'
                });

            // Render a datetime input with label in the document
            var text = TestUtils.renderIntoDocument(DateTime({
                item: item
            }));

            var input = TestUtils.scryRenderedDOMComponentsWithTag(text, 'input');

                expect(input[0].getDOMNode().value).toEqual('1982-08-17');
                expect(input[1].getDOMNode().value).toEqual('23:15');

                expect(input[2].getDOMNode().value).toEqual('1982-08-17 23:15:10');
        });

            it('should have a label', function () {
                var TestUtils = React.addons.TestUtils;

                var item = new Item({
                    value: '1982-08-17 23:15:10',
                    format: 'YYYY-MM-DD HH:mm:ss',
                    label: "This is the label"
                });

            // Render a datetime input with label in the document
            var text = TestUtils.renderIntoDocument(DateTime({
                item: item
            }));

            var label = TestUtils.findRenderedDOMComponentWithTag(text, 'label');
            expect(label.getDOMNode().textContent).toEqual('This is the label');
        });
        });
});
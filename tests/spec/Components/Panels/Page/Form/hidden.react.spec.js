/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Page/Form/hidden.react',
    'build/Objects/Page/Form/hidden',
    'jasmine_matchers'
], function (React, Hidden, Item) {

    describe('Hidden form input', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should contain its value', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: "Value of the input"
            });

            var text = TestUtils.renderIntoDocument(Hidden({
                item: item
            }));

            var input = TestUtils.findRenderedDOMComponentWithTag(text, 'input');
            expect(input.getDOMNode().value).toEqual('Value of the input');
        });

        it('should be hidden', function () {
            var TestUtils = React.addons.TestUtils;

            var item = new Item({
                value: "Value of the input"
            });

            var text = TestUtils.renderIntoDocument(Hidden({
                item: item
            }));

            var input = TestUtils.findRenderedDOMComponentWithTag(text, 'input');
            expect(input.getDOMNode().type).toEqual('hidden');
        });
    });
});
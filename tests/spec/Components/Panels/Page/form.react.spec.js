/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/Page/form.react',
    'build/Objects/Page/form',
    'jasmine_matchers'
], function (React, Form, FormObject) {

    describe('Form', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should render a form', function () {
            var TestUtils = React.addons.TestUtils;

            var form = new FormObject({
                "action": "example/clubs/store",
                "method": "post"
            });

            // Render a checkbox with label in the document
            var form = TestUtils.renderIntoDocument(Form({
                message: null,
                panel: {},
                item: form
            }));

            var tag = TestUtils.findRenderedDOMComponentWithTag(form, 'form');

            //Url will be absolute
            expect(tag.getDOMNode().action).toContain('example/clubs/store');
            expect(tag.getDOMNode().method).toContain('post');
        });

        it('should display form items', function () {
            var TestUtils = React.addons.TestUtils;

            var form = new FormObject({
                "action": "example/clubs/store",
                "method": "put",
                "items": [
                    {
                        "type": "text",
                        "text": {
                            "name": "name",
                            "label": "Name of club",
                            "value": "Some club"
                        }
                    }
                ]
            });

            // Render a checkbox with label in the document
            var form = TestUtils.renderIntoDocument(Form({
                message: null,
                panel: {},
                item: form
            }));

            var input = TestUtils.findRenderedDOMComponentWithTag(form, 'input');
            expect(input.getDOMNode().value).toEqual('Some club');
        });
    });
});
/** @jsx React.DOM */

define([
    'react',
    'build/Components/Panels/page.react',
    'build/Objects/page',
    'jasmine_matchers'
], function (React, Page, PageObject) {

    describe('Page', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should be able to render a form', function () {
            var TestUtils = React.addons.TestUtils;

            var page = new PageObject({});
            page.setId(1);
            page.setContent([
                {
                    "type": "form",
                    "form": {
                        "action": "example/clubs/store",
                        "method": "post",
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
                    }
                }
            ]);

            // Render a checkbox with label in the document
            var page = TestUtils.renderIntoDocument(Page({
                message: null,
                panel: page
            }));

            var tag = TestUtils.findRenderedDOMComponentWithTag(page, 'form');

            //Url will be absolute
            expect(tag.getDOMNode().action).toContain('example/clubs/store');
            expect(tag.getDOMNode().method).toContain('post');

            var input = TestUtils.findRenderedDOMComponentWithTag(tag, 'input');
            expect(input.getDOMNode().value).toEqual('Some club');
        });

    });
});
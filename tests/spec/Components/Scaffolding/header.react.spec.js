/** @jsx React.DOM */

define([
    'react',
    'build/Components/Scaffolding/header.react',
    'jasmine_matchers'
], function (React, Header) {

    describe('Menu', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should show the title', function () {
            var TestUtils = React.addons.TestUtils;

            // Render a checkbox with label in the document
            var header = TestUtils.renderIntoDocument(Header({
                auja: {
                    title: "This is the title"
                }
            }));

            var header = TestUtils.findRenderedDOMComponentWithTag(header, 'h1');

            //parseInt since the value of an input is always a string 
            expect(header.getDOMNode().textContent).toEqual("This is the title");
        });

        it('should show the user name', function () {
            var TestUtils = React.addons.TestUtils;

            // Render a checkbox with label in the document
            var header = TestUtils.renderIntoDocument(Header({
                auja: {
                    title: "This is the title",
                    user: {
                        name: "Joris Blaak"
                    }
                }
            }));

            var elements = TestUtils.scryRenderedDOMComponentsWithTag(header, 'div');

            var flag = false;
            for (var i in elements) {
                if (elements[i].getDOMNode().textContent == 'Joris Blaak') {
                    flag = true;
                    break;
                }
            }
            expect(flag).toBe(true);
        });

        it('should show buttons', function () {
            var TestUtils = React.addons.TestUtils;

            // Render a checkbox with label in the document
            var header = TestUtils.renderIntoDocument(Header({
                auja: {
                    title: "This is the title",
                    user: {
                        name: "Joris Blaak"
                    },
                    buttons: [
                        {
                            text: "Logout",
                            target: "#logout"
                        }
                    ]
                }
            }));

            var elements = TestUtils.scryRenderedDOMComponentsWithTag(header, 'a');

            var flag = false;
            for (var i in elements) {
                if (elements[i].getDOMNode().textContent == 'Logout') {
                    flag = true;
                    break;
                }
            }
            expect(flag).toBe(true);
        })

    });
});
/** @jsx React.DOM */

define([
    'react',
    'build/Components/Scaffolding/hamburger.react',
    'jasmine_matchers'
], function (React, Hamburger) {

    describe('Menu', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        
        it('should show the user name', function () {
            var TestUtils = React.addons.TestUtils;

            // Render a checkbox with label in the document
            var hamburger = TestUtils.renderIntoDocument(Hamburger({
                auja: {
                    user: {
                        name: "Joris Blaak"
                    }
                }
            }));

            var elements = TestUtils.scryRenderedDOMComponentsWithTag(hamburger, 'div');

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
            var hamburger = TestUtils.renderIntoDocument(Hamburger({
                auja: {
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

            var elements = TestUtils.scryRenderedDOMComponentsWithTag(hamburger, 'a');

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
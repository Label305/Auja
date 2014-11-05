/** @jsx React.DOM */

define(['jasmine_matchers', 'react'], function (j, r) {
    
    window.React = r;
    
    require([
        'build/Components/Panels/Page/Form/textarea.react',
        'build/Objects/Page/Form/textarea'
    ], function(Textarea, Item) {
        
        describe('Textarea form input', function () {
    
            beforeEach(function () {
                this.addMatchers(require('jasmine_matchers'));
            });
            
            it('should display its value', function () {
                var TestUtils = React.addons.TestUtils;

                var item = new Item({
                    value: "Value of the input"
                });

                // Render a checkbox with label in the document
                var textarea = TestUtils.renderIntoDocument(Textarea({
                    item: item
                }));

                var input = TestUtils.findRenderedDOMComponentWithTag(textarea, 'textarea');
                expect(input.getDOMNode().value).toEqual('Value of the input');
            });
    
            it('should have a label', function () {
                var TestUtils = React.addons.TestUtils;
                
                var item = new Item({
                    value: "Value of the input",
                    label: "This is the label"
                });
                                
                // Render a checkbox with label in the document
                var textarea = TestUtils.renderIntoDocument(Textarea({
                    item: item
                }));

                var label = TestUtils.findRenderedDOMComponentWithTag(textarea, 'label');
                expect(label.getDOMNode().textContent).toEqual('This is the label');
            });
        });
    });
});
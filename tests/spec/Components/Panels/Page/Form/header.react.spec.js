/** @jsx React.DOM */

define(['jasmine_matchers', 'react'], function (j, r) {
    
    window.React = r;
    
    require([
        'build/Components/Panels/Page/header.react',
        'build/Objects/Page/Form/header'
    ], function(Header, Item) {
        
        describe('Header form input', function () {
    
            beforeEach(function () {
                this.addMatchers(require('jasmine_matchers'));
            });
    
            it('should display the title', function () {
                var TestUtils = React.addons.TestUtils;
                
                var item = new Item({
                    text: "Moi title"
                });
                                
                // Render a checkbox with label in the document
                var header = TestUtils.renderIntoDocument(Header({
                    item: item
                }));
                
                var h2 = TestUtils.findRenderedDOMComponentWithTag(header, 'h2');
                expect(h2.getDOMNode().textContent).toEqual('Moi title');
            });
        });
    });
});
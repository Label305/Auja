/**
 * A menu panel
 *
 * @jsx React.DOM
 */

//Listing of all supported menu items
var MenuItems = {
    'link': 'build/Components/Panels/Menu/link.react.js',
    'spacer': 'build/Components/Panels/Menu/spacer.react.js'
};

//Map as an array to load panel dependencies
define($.map(MenuItems, function(value) { return value; }), function() {
    return React.createClass({
        render: function() {
            
            //Order the items in the menu as they are defined
            this.props.panel.menu = this.props.panel.menu.sort(function(a, b) {
                if(a.order && b.order) {
                    return a.order > b.order ? 1 : -1;
                }
                return 0;
            });
            
            //Combine menu items together to form a single list
            var menu = this.props.panel.menu.map(function(item) {
                if(!MenuItems[item.type]) {
                    console.error("Unsupported menu item type requested: " + item.type);
                    return;
                }
                var Item = require(MenuItems[item.type]);
                return ( <Item panel={this.props.panel} item={item} /> );
            }.bind(this));
            
            return (
                <ul>
                    {menu}
                </ul>
                );
        }
    });

});
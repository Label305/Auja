/**
 * A menu panel
 *
 * @jsx React.DOM
 */

//Listing of all supported menu items
var MenuItems = {
    'link': 'build/Components/Panels/Menu/link.react.js'
};

//Map as an array to load panel dependencies
define($.map(MenuItems, function(value) { return value; }), function() {
    return React.createClass({
        render: function() {
            
            var menu = this.props.panel.menu.map(function(item) {
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
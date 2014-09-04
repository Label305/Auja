/**
 * A menu panel
 *
 * @jsx React.DOM
 */

//Listing of all supported menu items
var MenuItems = {
    'link': 'build/Components/Panels/Menu/link.react.js',
    'spacer': 'build/Components/Panels/Menu/spacer.react.js',
    'resource': 'build/Components/Panels/Menu/resource.react.js'
};

//Map as an array to load panel dependencies
define($.map(MenuItems, function(value) { return value; }), function() {
    return React.createClass({
        render: function() {
            //Copy so that we wont apply changes twice
            var menu = this.props.panel.menu;
            
            //First check if we need to sort
            //TODO move sorting to Store?
            var flag = false;
            for(var i in menu) {
                if(menu[i].order) {
                    flag = true;
                    break;
                }
            }
            //Order the items in the menu as they are defined
            if(flag) {
                menu.sort(function(a, b) {
                    return a.order > b.order ? 1 : -1;
                });
            }
            
           
            //Combine menu items together to form a single list
            menu = menu.map(function(item) {
                if(!MenuItems[item.type]) {
                    console.error("Unsupported menu item type requested: " + item.type);
                    return;
                }
                var Item = require(MenuItems[item.type]);
                return ( <Item scrollContainer={this.props.scrollContainer} flux={this.props.flux} activeItem={this.props.panel.activeItem} panel={this.props.panel} item={item} /> );
            }.bind(this));
            
            return (
                <ul>
                    {menu}
                </ul>
                );
        }
    });

});
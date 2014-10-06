/**
 * A menu panel
 *
 * @jsx React.DOM
 */

//Listing of all supported menu items
var MenuItems = {
    'link': 'build/Components/Panels/Menu/link.react',
    'spacer': 'build/Components/Panels/Menu/spacer.react',
    'resource': 'build/Components/Panels/Menu/resource.react'
};

//Map as an array to load panel dependencies
define([
    'build/Components/Panels/Menu/link.react',
    'build/Components/Panels/Menu/spacer.react',
    'build/Components/Panels/Menu/resource.react'
], function() {
    return React.createClass({
        render: function() {
            
            //Create the possibility to set a custom "origin panel", to use as reference
            var originPanel = this.props.originPanel || this.props.panel;
            
            //Combine menu items together to form a single list
            var menu = this.props.panel.getItems().map(function(item) {
                if(!MenuItems[item.getType()]) {
                    console.error("Unsupported menu item type requested: " + item.getType());
                    return;
                }
                
                var Item = require(MenuItems[item.getType()]);
                return ( <Item key={item.key} scrollContainer={this.props.scrollContainer} flux={this.props.flux} activeItem={this.props.panel.getActiveItem()} panel={originPanel} item={item} /> );
            }.bind(this));
            
            return (
                <ul>
                    {menu}
                </ul>
                );
        }
    });

});
/**
 * A resource menu item, properties:
 *
 * - target
 *
 * @jsx React.DOM
 */

define(['build/Components/Panels/Menu/Mixins/paging.mixin', 'build/Objects/menu'], function(Paging, Menu) {
    
    return React.createClass({
        mixins: [Paging],
        getInitialState: function() {
            return {
                item: this.props.item,
                paging: this.props.item.paging ? this.props.item.paging : {}
            };
        },
        /**
         * Mount the resource by triggering initial loading
         */
        componentDidMount: function() {
            flux.actions.extendResource(this.props.panel, this.props.item);
        },
        render: function() {     
            
            var MenuPanel = require('build/Components/Panels/menu.react');
                        
            //Transfer different props to mock Menu
            var panel = new Menu();
            panel.setOrigin(this.props.panel.getOrigin());
            panel.setItems(this.props.item.getItems());
            
            return (
                <li className="menu-item-resource">
                    <MenuPanel panel={panel} />
                </li>
                );
        }
    });

});
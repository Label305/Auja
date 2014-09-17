/**
 * A resource menu item, properties:
 *
 * - target
 *
 * @jsx React.DOM
 */

define(['build/Components/Panels/Menu/Mixins/paging.mixin'], function(Paging) {
    
    return React.createClass({
        mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('ItemsStore'), Paging],
        getStateFromFlux: function() {
            return flux.store('ItemsStore').getState(this.props.item.resource.target);
        },
        componentWillMount: function() {
            flux.actions.mountResource(this.props.item.resource.target);
        },  
        render: function() {     
            
            var Menu = require('build/Components/Panels/menu.react');
                        
            //Use the panel where this item is present in as the panel of the submenu
            var panel = Object.clone(this.props.panel);
            panel.menu = this.state.items;
                        
            return (
                <li className="menu-item-resource">
                    <Menu panel={panel} />
                </li>
                );
        }
    });

});
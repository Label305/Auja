/**
 * A link menu item, properties:
 *
 * - name
 * - href
 * - icon
 *
 * @jsx React.DOM
 */

define([], function() {
    return React.createClass({
        handleClick: function() {
            flux.actions.click(this.props.item.link.target, this.props.panel, this.props.item);
        },
        render: function() {
            
            var className = 'menu-item-link auja-border-secondary ';
            
            //Create the icon class
            var icon = "fallback";
            if(this.props.item.link.icon) {
                icon = this.props.item.link.icon;    
            }
            className += "icon ion-" + icon;
            
            //Check if we match the active item
            if(this.props.activeItem && this.props.activeItem.link && this.props.activeItem.link.target == this.props.item.link.target) {
                className += " auja-color-main";
            }
            
            return (
                <li className={className} onClick={this.handleClick}>
                    <span>{this.props.item.link.name}</span>
                </li>
                );
        }
    });

});
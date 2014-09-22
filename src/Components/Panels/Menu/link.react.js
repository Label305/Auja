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
            flux.actions.click(this.props.item.getTarget(), this.props.panel, this.props.item);
        },
        render: function() {
            
            var className = 'menu-item-link auja-border-secondary ';
            
            //Create the icon class
            var icon = "fallback";
            if(this.props.item.icon) {
                icon = this.props.item.icon;    
            }
            className += "icon ion-" + icon;
            
            //Check if we match the active item
            if(this.props.activeItem && this.props.activeItem.link && this.props.activeItem.link.getTarget() == this.props.item.getTarget()) {
                className += " auja-color-main";
            }
            
            return (
                <li className={className} onClick={this.handleClick}>
                    <span>{this.props.item.getText()}</span>
                </li>
                );
        }
    });

});
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
            flux.actions.click(this.props.item.link.href, this.props.panel);
        },
        render: function() {

            var className = 'menu-item-link auja-border-secondary ';
            
            //Create the icon class
            var icon = "fallback";
            if(this.props.item.icon) {
                icon = this.props.item.icon;    
            }
            className += "icon-" + icon;
            
            return (
                <li className={className} onClick={this.handleClick}>
                    <p>{this.props.item.link.name}</p>
                </li>
                );
        }
    });

});
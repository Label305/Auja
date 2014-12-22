/**
 * A link menu item, properties:
 *
 * - name
 * - href
 * - icon
 *
 * @jsx React.DOM
 */

define(['react'], function(React) {
    return React.createClass({
        handleClick: function() {
            flux.actions.click(this.props.item.getTarget(), this.props.panel, this.props.item);
        },
        render: function() {

            var className = 'menu-item-link auja-border-secondary ';

            //Create the icon class
            var icon = this.props.item.getIcon();

            className += "icon " + icon;

            //Check if we match the active item
            if(this.props.item.isActive()) {
                if (this.props.item.getActiveIcon()){
                    var activeIcon = this.props.item.getActiveIcon();
                    className = className.replace(icon, activeIcon);
                }
                className += " auja-color-main active auja-active-border-main";
            }

            return (
                <li className={className} onClick={this.handleClick}>
                    <span>{this.props.item.getText()}</span>
                </li>
                );
        }
    });

});
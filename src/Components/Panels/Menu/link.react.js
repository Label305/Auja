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
            return (
                <li onClick={this.handleClick}>{this.props.item.link.name}</li>
                );
        }
    });

});
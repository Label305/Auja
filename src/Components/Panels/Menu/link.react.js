/**
 * A menu panel
 *
 * @jsx React.DOM
 */

define([], function() {
    return React.createClass({
        handleClick: function() {
            flux.actions.click(this.props.item.href, this.props.panel);
        },
        render: function() {            
            return (
                <li onClick={this.handleClick}>{this.props.item.name}</li>
                );
        }
    });

});
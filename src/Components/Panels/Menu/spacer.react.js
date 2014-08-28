/**
 * A spacer menu item, properties:
 * 
 * - name
 * - order
 *
 * @jsx React.DOM
 */

define([], function() {
    return React.createClass({
        render: function() {
            return (
                <li className="spacer">{this.props.item.name}</li>
                );
        }
    });

});
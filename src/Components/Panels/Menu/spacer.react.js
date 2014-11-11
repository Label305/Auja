/**
 * A spacer menu item, properties:
 * 
 * - name
 *
 * @jsx React.DOM
 */

define(['react'], function(React) {
    return React.createClass({
        render: function() {
            return (
                <li className="menu-item-spacer auja-color-main auja-border-secondary">{this.props.item.getText()}</li>
                );
        }
    });

});
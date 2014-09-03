/**
 * A page header
 *
 * - contents
 *
 * @todo Add support to place buttons inside header
 * 
 * @jsx React.DOM
 */

define([], function() {
    return React.createClass({
        render: function() {
            return (
                <h2>{this.props.item.header.text}</h2>
                );
        }
    });

});
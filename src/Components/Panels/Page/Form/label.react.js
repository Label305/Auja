/**
 * A label as in <label>, properties:
 *
 * - name
 * - item
 *
 * @todo Add validation
 *
 * @jsx React.DOM
 */

define([], function () {
    return React.createClass({
        render: function () {
            return (
                <label>{this.props.name}</label>
                );
        }
    });

});
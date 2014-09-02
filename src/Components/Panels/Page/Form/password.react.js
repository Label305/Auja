/**
 * A password field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */

define([], function() {
    return React.createClass({
        render: function() {
            var attributes = Object.clone(this.props.item.password);

            //Remove otherwise engaged attributes
            delete attributes.label;

            Object.merge(attributes, {
                id: this.props.itemId,
                type: 'password'
            });

            return (
                <div>
                    <label>{this.props.item.password.label}</label>
                    {React.DOM.input(attributes)}
                </div>
                );
        }
    });

});
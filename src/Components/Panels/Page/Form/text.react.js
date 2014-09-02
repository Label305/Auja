/**
 * A text field, properties:
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
            var attributes = Object.clone(this.props.item.text);
            
            //Remove otherwise engaged attributes
            delete attributes.label;
            
            Object.merge(attributes, {
                id: this.props.itemId,
                type: 'text'
            });
            
            return (
                <div>
                    <label>{this.props.item.text.label}</label>
                    {React.DOM.input(attributes)}
                </div>
                );
        }
    });

});
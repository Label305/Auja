/**
 * A textarea, properties:
 *
 * - label
 * - name
 * - value will be entered as value
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */

define([], function() {
    return React.createClass({
        render: function() {
            var attributes = Object.clone(this.props.item.textarea);
            
            //Remove otherwise engaged attributes
            delete attributes.label;
            delete attributes.value;
            
            Object.merge(attributes, {
                id: this.props.itemId,
                type: 'text'
            });
            
            return (
                <div>
                    <label>{this.props.item.textarea.label}</label>
                    {React.DOM.textarea(attributes, this.props.item.value ? this.props.item.value : '')}
                </div>
                );
        }
    });

});
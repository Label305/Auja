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
define(['build/Components/Panels/Page/Form/label.react'], function(Label) {
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
                    <Label item={this.props.item} name={this.props.item.textarea.label} />
                    {React.DOM.textarea(attributes, this.props.item.value ? this.props.item.value : '')}
                </div>
                );
        }
    });

});
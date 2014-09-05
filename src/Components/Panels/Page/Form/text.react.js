/**
 * A text field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define(['build/Components/Panels/Page/Form/label.react'], function(Label) {
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
                    <Label item={this.props.item} name={this.props.item.text.label} />
                    {React.DOM.input(attributes)}
                </div>
                );
        }
    });

});
/**
 * A number field, properties:
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
            var attributes = Object.clone(this.props.item.number);
            
            //Remove otherwise engaged attributes
            delete attributes.label;
            
            Object.merge(attributes, {
                id: this.props.itemId,
                type: 'number'
            });
            
            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.number.label} />
                    {React.DOM.input(attributes)}
                </div>
                );
        }
    });

});
/**
 * A email field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
 define(['build/Components/Panels/Page/Form/label.react'], function(Label) {
    return React.createClass({
        getInitialState: function() {
            return {value: this.props.item.email.value};
        },
        handleChange: function(event) {
            this.setState({value: event.target.value});
        },
        render: function() {
            var attributes = Object.clone(this.props.item.email);

            //Remove otherwise engaged attributes
            delete attributes.label;
            
            Object.merge(attributes, {
                id: this.props.itemId,
                type: 'email',
                onChange: this.handleChange,
                value: this.state.value
            });            
            
            return (
                <div>
                <Label item={this.props.item} name={this.props.item.email.label} />
                {React.DOM.input(attributes)}
                </div>
                );
        }
    });

});
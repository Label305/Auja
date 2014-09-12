/**
 * A checkbox field, properties:
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
            if (this.props.item.checkbox.checked && this.props.item.checkbox.checked == "true")
            {               
                return {checked: true};
            } else {
                return {checked: false};
            }              
        },
        handleChange: function(event) {
            this.setState({checked: event.target.checked});
        },
        render: function() {
            var attributes = Object.clone(this.props.item.checkbox);

            //Remove otherwise engaged attributes
            delete attributes.label;
            
            Object.merge(attributes, {
                id: this.props.itemId,
                type: 'checkbox',
                onChange: this.handleChange,
                checked: this.state.checked,
                value: this.props.item.checkbox.value
            });            
            
            return (
                <div>
                <Label item={this.props.item} name={this.props.item.checkbox.label} />
                {React.DOM.input(attributes, this.props.item.value ? this.props.item.value : this.props.item.checkbox.value)}
                </div>
                );
        }
    });

});
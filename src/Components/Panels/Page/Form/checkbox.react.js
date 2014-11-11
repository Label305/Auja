/**
 * A checkbox field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 * @jsx React.DOM
 */
 define(['react', 'build/Components/Panels/Page/Form/label.react'], function(React, Label) {
    return React.createClass({
        getInitialState: function() {
            return {checked: this.props.item.isChecked()}   
        },
        handleChange: function(event) {
            this.setState({checked: event.target.checked});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.checked = this.state.checked;
            attributes.onChange = this.handleChange;

            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                {React.DOM.input(attributes)}
                </div>
            );
        }
    });
});
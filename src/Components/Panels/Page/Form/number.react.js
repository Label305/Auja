/**
 * A number field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define(['react', 'build/Components/Panels/Page/Form/label.react'], function (React, Label) {
    return React.createClass({
        getInitialState: function () {
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            this.setState({value: event.target.value});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;
            /* Tell the stepping prop any increment is allowed, for browser validation of the number input type */
            attributes.step = "any";

            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                {React.DOM.input(attributes)}
                </div>
            );
        }
    });
});
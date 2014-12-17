/**
 * A range input, properties:
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
             //Add stuff that moves the value-block to the correct initial position
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            this.setState({value: event.target.value});
            //Add stuff that moves the value-block
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;
            attributes.ref = 'range';

            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                {React.DOM.input(attributes)}
                <input type='text' value={attributes.value}/>
                </div>
            );
        }
    });
});
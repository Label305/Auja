/**
 * A color field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
 define(['react', 'build/Components/Panels/Page/Form/label.react', 'minicolors'], function (React, Label) {
    return React.createClass({
        componentDidMount: function() {
            $(this.refs.color.getDOMNode()).minicolors({
                changeDelay: 200
            });
        },
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
            attributes.type = 'text';
            attributes.ref = 'color';
            
            return (
                <div>
                <Label item={this.props.item} name={this.props.item.getLabel()} />
                {React.DOM.input(attributes)}
                </div>
                );
        }
    });
});
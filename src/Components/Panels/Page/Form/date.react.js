/**
 * A date field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
 define(['build/Components/Panels/Page/Form/label.react', 'moment', 'pikaday', 'pikadayjq'], function (Label) {
    return React.createClass({
        componentDidMount: function() {
         var $datepicker = $('#datepicker').pikaday({
            firstDay: 1,
            format: 'YYYY-MM-DD',
        });
     },


     getInitialState: function () {
        return {value: this.props.item.getValue()};
    },
    handleChange: function (event) {
        this.setState({value: event.target.value});
    },
    render: function () {


    // chain a few methods for the first datepicker, jQuery style!


    var attributes = this.props.item.getAttributes();
    attributes.value = this.state.value;
    attributes.onChange = this.handleChange;
    attributes.id = 'datepicker';

    return (
        <div>
        <Label item={this.props.item} name={this.props.item.getLabel()} />
        {React.DOM.input(attributes)}
        </div>
        );
}
});
});
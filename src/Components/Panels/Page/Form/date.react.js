/**
 * A date field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
 define(['react', 'build/Components/Panels/Page/Form/label.react','moment', 'pikadayjq'], function (React, Label) {
    return React.createClass({
        componentDidMount: function() {            
         var datepicker = $(this.refs.date.getDOMNode()).pikaday({
            firstDay: 1,
            format: ('DD MM YYYY'),
            defaultDate: new Date(this.props.item.getValue()),
            showWeekNumber: true
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
    attributes.value = moment(this.state.value).format('DD MM YYYY');
    console.log(this.state.value);
    attributes.onChange = this.handleChange;
    attributes.ref = 'date';
    attributes.readOnly = true;

    return (
        <div>
        <Label item={this.props.item} name={this.props.item.getLabel()} />
        {React.DOM.input(attributes)}
        </div>
        );
}
});
});
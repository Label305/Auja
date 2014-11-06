/**
 * A date field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define(['build/Components/Panels/Page/Form/label.react', 'pikaday', 'pikadayjq'], function (Label) {
    return React.createClass({
        getInitialState: function () {
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            this.setState({value: event.target.value});
        },
        render: function () {

           var $datepicker = $('#datepicker').pikaday({
        firstDay: 1,
        minDate: new Date('2000-01-01'),
        maxDate: new Date('2020-12-31'),
        yearRange: [2000,2020]
    });
    // chain a few methods for the first datepicker, jQuery style!
    $datepicker.pikaday('show').pikaday('nextMonth');
    
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
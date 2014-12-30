/**
 * A date field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
 define(['react', 'build/Components/Panels/Page/Form/label.react', 'moment', 'pikadayjq'], function (React, Label, moment) {
    return React.createClass({
        componentDidMount: function() {
            if (this.props.item.getMin())
         {
            console.log("minDate: "+moment(this.props.item.getMin()).toDate());
            $(this.refs.date.getDOMNode()).pikaday({
                minDate: moment(this.props.item.getMin()).toDate()
            });
         };
           if (this.props.item.getMax())
         {
            $(this.refs.date.getDOMNode()).pikaday({
                maxDate: moment(this.props.item.getMax()).toDate()
            });
         };
         var picker = $(this.refs.date.getDOMNode()).pikaday({
            firstDay: 1,
            bound: true,
            format: this.props.format ? this.props.format : this.props.item.getFormat(),//Allow override from parent
            defaultDate: new Date(this.props.item.getValue()),
            container: this.refs.calender.getDOMNode(),
            showWeekNumber: true,
            onSelect: function(date) {
                this.handleChange(date);
            }.bind(this)
            });

     },
    getInitialState: function () {
        return {value: this.props.item.getValue()};
    },
    handleChange: function (date) {
        date = moment(date).format(this.props.item.getFormat());
        //If parent element want us to broadcast our changes to it we'll oblige
        if(this.props.onChange) {
            this.props.onChange(date);
        }

        this.setState({value: date});
    },
    render: function () {
        var attributes = this.props.item.getAttributes();
        attributes.value = moment(this.state.value).format(this.props.item.getFormat());
        attributes.onChange = this.handleChange;
        attributes.ref = 'date';
        attributes.readOnly = true;
        //Insure label is ommited when the item is part of another component.
        attributes.type == 'date' ? label = <Label item={this.props.item} name={this.props.item.getLabel()} /> : label='';
        attributes.type = 'text';

        return (
            <div>
            {label}
            {React.DOM.input(attributes)}
            <div className="pika-container" ref='calender'></div>
            </div>
            );
    }
});
});
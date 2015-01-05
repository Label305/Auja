/**
 * A time field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define(['react', 'build/Components/Panels/Page/Form/label.react', 'moment', 'clockpicker'], function (React, Label, moment) {
    return React.createClass({
        componentDidMount: function () {
            $(this.refs.time.getDOMNode()).clockpicker({
                autoclose: true
            });
        },
        getInitialState: function () {
            return {value: this.props.item.getValue(),
                error: ""};
        },
        handleChange: function (event) {
            time = moment(event.target.value, this.props.item.getFormat()).format(this.props.item.getFormat());

            //If parent element want us to broadcast our changes to it we'll oblige, and let this item know it has an input parent
            if (this.props.onChange) {
                var parent = true;
                this.props.onChange(time);
            }
            this.setState({value: time});
            if (parent != true){
                this.validateTime();
            }
        },
        validateTime: function(){
            min = moment(this.props.item.getMin(), this.props.item.getFormat()).format(this.props.item.getFormat());
            max = moment(this.props.item.getMax(), this.props.item.getFormat()).format(this.props.item.getFormat());
            value = moment(time, this.props.item.getFormat()).format(this.props.item.getFormat());
            console.log("Min: "+min+" Max: "+max+" Value: "+value+" Format: "+this.props.item.getFormat());
            if (value > max){
                this.setState({error: "This is later than allowed"});
            }
            if (value < min){
                this.setState({error: "This is earlier than allowed"});
            }
            if (value > min && value < max){
                this.setState({error: ""});
            }
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = moment(this.state.value, this.props.item.getFormat()).format(this.props.item.getFormat());

            //onBlur needed to detect time change through clockpicker
            attributes.onBlur = this.handleChange;

            //Fallback if clockpicker somehow doesn't work
            attributes.onChange = this.handleChange;

            attributes.ref = 'time';
            attributes.readOnly = true;

            //Insure label is ommited when the item is part of another component.
            attributes.type == 'time' ? label = <Label item={this.props.item} name={this.props.item.getLabel()} /> : label = '';
            return (
                <div>
            {label}
                {React.DOM.input(attributes)}
                {this.state.error}
                </div>
            );
        }
    });
});
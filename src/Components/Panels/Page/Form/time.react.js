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
            var clockpicker = $(this.refs.time.getDOMNode()).clockpicker({
                autoclose: true
            });

            console.log($(this.refs.time.getDOMNode()).position());
        },
        getInitialState: function () {
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            time = moment(event.target.value, this.props.item.getFormat()).format(this.props.item.getFormat());

            //If parent element want us to broadcast our changes to it we'll oblige
            if (this.props.onChange) {
                this.props.onChange(time);
            }

            this.setState({value: time});
        },
        handleClick: function () {
            console.log('click-pos: '+ $(this.refs.time.getDOMNode()).offset().top);
            $("div.clockpicker-popover").appendTo(this.refs.time.getDOMNode());
            // $('div.clockpicker-popover').css({
            //     top: 100 + "px"
            // });
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = moment(this.state.value, this.props.item.getFormat()).format(this.props.item.getFormat());

            //onBlur needed to detect time change through clockpicker
            attributes.onBlur = this.handleChange;
            attributes.onClick = this.handleClick;
            //Fallback if clockpicker somehow doesn't work
            attributes.onChange = this.handleChange;
            attributes.ref = 'time';
            attributes.readOnly = true;
            console.log(this.offset);

            //Insure label is ommited when the item is part of another component.
            attributes.type == 'time' ? label = <Label item={this.props.item} name={this.props.item.getLabel()} /> : label = '';

            return (
                <div>
            {label}
                {React.DOM.input(attributes)}
                </div>
            );
        }
    });
});
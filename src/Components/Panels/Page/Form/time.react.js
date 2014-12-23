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
            //force clockpicker to be put in the DOM
            $(this.refs.time.getDOMNode()).clockpicker('show');

            //Now that it's in the DOM, we'll override its placement so it will scroll nicely
            var defaultClockPosition = $("body > div.clockpicker-popover");
            var moveClockToPosition = this.refs.timeContainer.getDOMNode();
            var defaultClockPositionFirst = $("body > div.clockpicker-popover:first");
            var moveClockToPosition = this.refs.timeContainer.getDOMNode();
            defaultClockPositionFirst.detach().appendTo(moveClockToPosition);
            $(moveClockToPosition).css({
                 display: "block",
                 position: "relative"
            });

            var newClockPosition = $('> div.clockpicker-popover', this.refs.timeContainer.getDOMNode());
            newClockPosition.removeAttr('style');
            newClockPosition.css({
                 display: "block",
                 position: "absolute"
            });

            $(this.refs.time.getDOMNode()).clockpicker('hide');
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
        //This overrides the clockpickers inline styling
        overrideClock: function () {
            $(this.refs.time.getDOMNode()).clockpicker('show');
            var newClockPosition = $('> div.clockpicker-popover', this.refs.timeContainer.getDOMNode());
            newClockPosition.removeAttr('style');
            newClockPosition.css({
                 display: "block",
                 position: "absolute"
            });
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = moment(this.state.value, this.props.item.getFormat()).format(this.props.item.getFormat());

            //onBlur needed to detect time change through clockpicker
            attributes.onBlur = this.handleChange;
            //OnFocus needed to show clock without clickevent
            attributes.onFocus = this.overrideClock;
            attributes.onClick = this.overrideClock;
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
                <div ref="timeContainer"></div>
                </div>
            );
        }
    });
});
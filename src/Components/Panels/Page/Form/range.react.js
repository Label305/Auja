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
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            this.setState({value: event.target.value});

        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;
            attributes.ref = 'range';

            //Get the position of the thumb element
            var range = $("input[type='range']");
            var thumbWidth = 16;
            var width = range.width()-thumbWidth;
            var newPoint = (range.val() - range.attr("min")) / (range.attr("max") - range.attr("min"));
            var newPlace = Math.round(newPoint*width);

            range.next("div")
             .css({
               marginLeft: newPlace-thumbWidth + "px",
               minWidth: 50 + "px",
               display: 'inline-block',
               textAlign: 'center'
             })
             .text(range.val());

            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                {React.DOM.input(attributes)}
                <div className="range-value">{attributes.value}</div>
                <div className="range-min">{attributes.min}</div>
                <div className="range-max">{attributes.max}</div>
                </div>
            );
        }
    });
});
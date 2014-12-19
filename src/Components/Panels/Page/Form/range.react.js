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
             //Get the position of the thumb element
            var rangeWidth = $(this.refs.range.getDOMNode()).width();
            var offset = 38;
            var thumbWidth = 16;
            var min = this.props.item.getMin();
            var max = this.props.item.getMax();
            var width = rangeWidth-thumbWidth;
            var newPoint = (this.state.value - min) / (max - min);
            var newPlace = Math.round(newPoint*width);

            $(this.refs.valuebox.getDOMNode())
             .css({
               marginLeft: offset + newPlace - thumbWidth + "px",
               minWidth: 50 + "px",
               display: 'inline-block',
               textAlign: 'center'
             })
             .text(this.state.value);

        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;
            attributes.ref = 'range';



            return (
                    <div className="input range">
                        <Label item={this.props.item} name={this.props.item.getLabel()} />
                    <div className="range-container">
                        <div className="range-min">{attributes.min}</div>
                        {React.DOM.input(attributes)}
                        <div className="range-max">{attributes.max}</div>
                        <div className="range-value" ref="valuebox">{attributes.value}</div>
                    </div>
                </div>
            );
        }
    });
});
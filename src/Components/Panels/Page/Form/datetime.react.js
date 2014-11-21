/**
 * A date field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
 define(['react', 'build/Components/Panels/Page/Form/label.react', 'build/Components/Panels/Page/Form/date.react', 'build/Components/Panels/Page/Form/time.react'], function (React, Label) {
    return React.createClass({
    render: function () {
    var attributes = this.props.item.getAttributes();
    attributes.value = moment(this.state.value).format(this.props.item.getFormat());
    attributes.onChange = this.handleChange;
    attributes.ref = 'datetime';
    attributes.readOnly = true;

    return (
        <div>
        <Label item={this.props.item} name={this.props.item.getLabel()} />

        </div>
        );
}
});
});
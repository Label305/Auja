/**
 * A range input, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define(['build/Components/Panels/Page/Form/label.react', 'build/Components/Panels/Page/Form/Mixins/validation.mixin'], function (Label, Validation) {
    return React.createClass({
        mixins: [Validation],
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;

            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                {React.DOM.input(attributes)}
                </div>
            );
        }
    });
});
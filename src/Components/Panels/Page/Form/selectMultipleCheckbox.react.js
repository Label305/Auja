/**
 * A select field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 * @jsx React.DOM
 */
 define(['build/Components/Panels/Page/Form/label.react', 'build/Components/Panels/Page/Form/checkbox.react'], function(Label, Checkbox) {
    return React.createClass({
        render: function () {
            var options = this.props.item.getOptions().map(function(option) {
                option._fallback = false;
                return (<Checkbox item={option} />);
            }.bind(this));            
            console.log({options});
            return (
                <div>
                <Label item={this.props.item} name={this.props.item.getLabel()} />
                {options}
                </div>
                );
        }
    });
});

/**
 * A select field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 * @jsx React.DOM
 */
 define(['build/Components/Panels/Page/Form/label.react'], function(Label) {
    return React.createClass({
        getInitialState: function() {
            return {options: this.props.item.getOptions(),
                selected: this.props.item.getSelected()}   
        },
        handleChange: function(event) {
            this.setState({options: event.target.options,
                selected: event.target.selected});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            var options = function(){
                
            }
            attributes.selected = this.state.selected;
            attributes.onChange = this.handleChange;

            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                {React.DOM.select(attributes, this.props.item.getOptions())}
                </div>
            );
        }
    });
});
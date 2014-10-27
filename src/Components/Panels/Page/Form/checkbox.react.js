/**
 * A checkbox field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 * @jsx React.DOM
 */
 define(['build/Components/Panels/Page/Form/label.react'], function(Label) {
    return React.createClass({
        getInitialState: function() {
            return {checked: this.props.item.isChecked()}   
        },
        handleChange: function(event) {
            this.setState({checked: event.target.checked});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.checked = this.state.checked;
            attributes.onChange = this.handleChange;
            if (this.props.item.isChecked() != null){
            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                {React.DOM.input(attributes)}
                </div>
            );
            } else if (attributes.fallback == true){
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                <input type="hidden" name="some_flag" value="0" />
                <input type="checkbox" name="some_flag" value="1" />
                </div>
            }
            }        
    });
});
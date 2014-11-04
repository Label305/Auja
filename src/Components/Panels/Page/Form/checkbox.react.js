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
            if (this.props.item.getName() == null ){
            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                {React.DOM.input(attributes)}
                </div>
            )
        } else if (this.props.item.hasFallback() == true){
            return(
            <div>
            <input type="hidden" value="0"/>
            <input type="checkbox" value="1"/>
            </div>
            )
        } else {
            return(<p>Darn, another checkbox got away!</p>)
        }
        }
    });
});
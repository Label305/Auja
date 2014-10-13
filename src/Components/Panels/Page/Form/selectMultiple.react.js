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
                value: this.props.item.getValue()};
        },
        handleClick: function(event) {
            var selected = this.state.value.indexOf(event.target.value);
            selected != -1 ? this.state.value.splice(selected ,1) :this.state.value.push(event.target.value)
        
            this.setState({value: this.state.value});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();

            var options = this.props.item.getOptions().map(function(option) {
            return (React.DOM.option(option, option.label)
                );
            });
            attributes.value = this.state.value;
            attributes.onClick = this.handleClick;
            attributes.multiple = true;
                       
            return (
                <div>
                <Label item={this.props.item} name={this.props.item.getLabel()} />
                {React.DOM.select(attributes,
                    options
                    )}

                </div>
            );
        }
    });
});

/**
 * A select field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 * @jsx React.DOM
 */
 define(['react', 'build/Components/Panels/Page/Form/label.react', 'chosen'], function(React, Label) {
    return React.createClass({
        componentDidMount: function() {            
         var chosen = $(this.refs.multi-select.getDOMNode()).chosen({
            });
        },
        getInitialState: function() {
            return {options: this.props.item.getOptions(),
                value: this.props.item.getValue()};
        },
        handleClick: function(event) {
            var selected = this.state.value.indexOf(event.target.value);
            selected != -1 ? this.state.value.splice(selected ,1) : this.state.value.push(event.target.value);
            
            return this.setState({value: this.state.value});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();

            var options = this.props.item.getOptions().map(function(option) {
            return (React.DOM.option(option, option.label)
                );
            });
            //We want to be able to deselect all options, onChange does not allow this
            attributes.onClick = this.handleClick;
            attributes.value = this.state.value;
            attributes.ref = 'multi-select';
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

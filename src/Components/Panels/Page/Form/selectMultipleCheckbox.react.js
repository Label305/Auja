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
                checked: this.props.item.isChecked()};
        },
        handleChange: function(label) {
            var state = this.state.options.map(function(option) {
            return {
                label: option.label,
                checked: (option.label === label ? !option.checked : option.checked)
            };
        });

        this.setState({ options: state });

    },
        render: function () {           
            var options = this.props.item.getOptions();
            var selected = this.state.options.map(function(option) {
            return (
                <div>
                    <input type="checkbox" checked={option.checked} onChange={this.handleChange.bind(this, option.label)}/>
                    {option.label}
                    <br />
                </div>
                );
            }.bind(this));
            
                 
            return (
                <div>
                <Label item={this.props.item} name={this.props.item.getLabel()} />
                {selected}
                </div>
            );
        }
    });
});

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
        handleChange: function(event) {
            this.setState({checked: event.target.checked});
        },
        render: function () {           

            var options = this.props.item.getOptions().map(function(option) {
            return (

                <div>
                    <input type="checkbox" checked={option.checked} onChange={this.handleChange}/>
                    {option.label}
                    <br />
                </div>
                );
            });
            
                 
            return (
                <div>
                <Label item={this.props.item} name={this.props.item.getLabel()} />
                {options}
                </div>
            );
        }
    });
});

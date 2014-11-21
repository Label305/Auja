/**
 * A label as in <label>, properties:
 *
 * - name
 * - item
 *
 * @todo Add validation
 *
 * @jsx React.DOM
 */

define(['react'], function (React) {
    return React.createClass({
        render: function () {
            
            //Extract the validation message
            var validation = '';
            if(this.props.item.validationMessage != null) {
                validation = (
                    <span className="validation-message auja-color-alert">{this.props.item.validationMessage}</span>
                    );
            }
            
            return (
                <label>
                <span>{this.props.name}</span>
                {validation}
                </label>
                );
        }
    });

});
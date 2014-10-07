/**
 * Validation mixin for input fields
 * 
 * @jsx React.DOM
 */
define([], function () {
    return {
        /**
         * State of the form element
         * @returns {{value: *}}
         */
        getInitialState: function () {
            return {
                value: this.props.item.getValue()
            };
        },
        /**
         * Handles mutibility of validated form fields
         * 
         * @todo add actual validation
         * @param event
         */
        handleChange: function (event) {
            this.setState({
                value: event.target.value
            });
        },
        /**
         * Attributes including the onchange handler
         * @returns {*|Object}
         */
        getAttributes: function() {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;
            return attributes;
        }
    };
});
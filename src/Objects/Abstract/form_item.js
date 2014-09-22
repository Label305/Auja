/**
 * Abstract form of a form item
 */
define([], function() {

    return function(data) {

        /**
         * Location of menu item
         * @type {integer}
         */
        this.order = 0;

        /**
         * Type of the menu item
         * @type {string}
         */
        this.type = 'unknown';
        
        /**
         * Name
         * @type {string}
         */
        this.name = data.name || null;

        /**
         * Label
         * @type {string}
         */
        this.label = data.label || '';

        /**
         * Value
         * @type {string}
         */
        this.value = data.value || '';

        /**
         * Required
         * @type {boolean}
         */
        this.required = data.required || false;


        /**
         * Setter for the order
         * @param order
         */
        this.setOrder = function(order) {
            this.order = order;
        };

        /**
         * Getter for the order
         * @returns integer
         */
        this.getOrder = function() {
            return this.order;
        };

        /**
         * Setter for the type
         * @param type
         */
        this.setType = function(type) {
            this.type = type;
        };

        /**
         * Getter for the type
         * @returns {type|*}
         */
        this.getType = function() {
            return this.type;
        };

        /**
         * Setter for name
         * @param name
         */
        this.setName = function(name) {
            this.name = name;
        };

        /**
         * Getter for name
         * @returns {string}
         */
        this.getName = function() {
            return this.name;
        };

        /**
         * Setter for label
         * @param label
         */
        this.setLabel = function(label) {
            this.label = label;
        };

        /**
         * Getter for label
         * @returns {string}
         */
        this.getLabel = function() {
            return this.label;
        };

        /**
         * Setter for value
         * @param value
         */
        this.setValue = function(value) {
            this.value = value;
        };

        /**
         * Getter for value
         * @returns {string}
         */
        this.getValue = function() {
            return this.value;
        };

        /**
         * Setter for required
         * @param required
         */
        this.setRequired = function(required) {
            this.required = required;
        };

        /**
         * Getter for required
         * @returns {boolean}
         */
        this.isRequired = function() {
            return this.required;
        };
        
    };    
});
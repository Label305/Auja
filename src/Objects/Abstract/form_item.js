/**
 * Abstract form of a form item
 */
define([], function() {

    return function(data) {
        
        /**
         * Location of menu item
         * @type {integer}
         */
        this._order = data.order || 0;

        /**
         * Type of the menu item
         * @type {string}
         */
        this._type = 'unknown';
        
        /**
         * Name
         * @type {string}
         */
        this._name = data.name || null;
                
        /**
         * Label
         * @type {string}
         */
        this._label = data.label || '';

        /**
         * Value
         * @type {string}
         */
        this._value = data.value || null;

        /**
         * Required
         * @type {boolean}
         */
        this._required = data.required || false;

        /**
         * Setter for the order
         * @param order
         */
        this.setOrder = function(order) {
            this._order = order;
        };

        /**
         * Getter for the order
         * @returns integer
         */
        this.getOrder = function() {
            return this._order;
        };

        /**
         * Setter for the type
         * @param type
         */
        this.setType = function(type) {
            this._type = type;
        };

        /**
         * Getter for the type
         * @returns {type|*}
         */
        this.getType = function() {
            return this._type;
        };

        /**
         * Setter for name
         * @param name
         */
        this.setName = function(name) {
            this._name = name;
        };

        /**
         * Getter for name
         * @returns {string}
         */
        this.getName = function() {
            return this._name;
        };

        /**
         * Setter for label
         * @param label
         */
        this.setLabel = function(label) {
            this._label = label;
        };

        /**
         * Getter for label
         * @returns {string}
         */
        this.getLabel = function() {
            return this._label;
        };

        /**
         * Setter for value
         * @param value
         */
        this.setValue = function(value) {
            this._value = value;
        };

        /**
         * Getter for value
         * @returns {string}
         */
        this.getValue = function() {
            return this._value;
        };

        /**
         * Setter for required
         * @param required
         */
        this.setRequired = function(required) {
            this._required = required;
        };

        /**
         * Getter for required
         * @returns {boolean}
         */
        this.isRequired = function() {
            return this._required;
        };
        
    };    
});
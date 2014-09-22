/**
 * Abstract form of a form item
 * @todo remove item dependency
 */
define(['build/Objects/Abstract/item'], function(Item) {

    var FormItem = function(data) {

        //Call the parent constructor
        Item.call(this, arguments);

        /**
         * Our custom type
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
        
    };

    // Inherit Panel
    FormItem.prototype = Item;

    // Fix constructor
    FormItem.prototype.constructor = FormItem;

    /**
     * Setter for name
     * @param name
     */
    FormItem.prototype.setName = function(name) {
        this.name = name;
    };

    /**
     * Getter for name
     * @returns {string}
     */
    FormItem.prototype.getName = function() {
        return this.name;
    };

    /**
     * Setter for label
     * @param label
     */
    FormItem.prototype.setLabel = function(label) {
        this.label = label;
    };

    /**
     * Getter for label
     * @returns {string}
     */
    FormItem.prototype.getLabel = function() {
        return this.label;
    };

    /**
     * Setter for value
     * @param value
     */
    FormItem.prototype.setValue = function(value) {
        this.value = value;
    };

    /**
     * Getter for value
     * @returns {string}
     */
    FormItem.prototype.getValue = function() {
        return this.value;
    };

    /**
     * Setter for required
     * @param required
     */
    FormItem.prototype.setRequired = function(required) {
        this.required = required;
    };

    /**
     * Getter for required
     * @returns {boolean}
     */
    FormItem.prototype.isRequired = function() {
        return this.required;
    };
    
    return FormItem;
});
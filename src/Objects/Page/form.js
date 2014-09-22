
define(['build/Objects/Abstract/item', 'build/Factories/form_item_factory'], function(Item, FormItemFactory) {

    var Form = function() {

        //Call the parent constructor
        Item.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'form';

        /**
         * Form items
         * @type {Array}
         */
        this.items = [];

        /**
         * Method
         * @type {string}
         */
        this.method = 'post';

        /**
         * Action
         * @type {string}
         */
        this.action = null;

    };

    // Inherit Panel
    Form.prototype = Item;

    // Fix constructor
    Form.prototype.constructor = Form;

    /**
     * Setter for Items
     * @param items
     */
    Form.prototype.setItems = function(items) {
        this.items = items.map(function(item) {
            return FormItemFactory.createItem(item); 
        });
    };

    /**
     * Getter for items
     * @returns {Array}
     */
    Form.prototype.getItems = function() {
        return this.items;
    };
    
    /**
     * Setter for method
     * @param method
     */
    Form.prototype.setMethod = function(method) {
        this.method = method;
    };

    /**
     * Getter for method
     * @returns {string}
     */
    Form.prototype.getMethod = function() {
        return this.method;
    };

    /**
     * Setter for action
     * @param action
     */
    Form.prototype.setAction = function(action) {
        this.action = action;
    };

    /**
     * Getter for action
     * @returns {string}
     */
    Form.prototype.getAction = function() {
        return action;
    };

    return Form;
});
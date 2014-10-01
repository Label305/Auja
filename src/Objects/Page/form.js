
define(['build/Objects/Abstract/page_item', 'build/Factories/form_item_factory'], function(PageItem, FormItemFactory) {

    var Form = function(data) {

        //Call the parent constructor
        PageItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'form';

        /**
         * Form items, is set during construct to make sure we use
         * the FormItemsFactory
         * @type {Array}
         */
        this.items = [];

        /**
         * Method
         * @type {string}
         */
        this.method = data.method || 'post';

        /**
         * Action
         * @type {string}
         */
        this.action = data.action || null;
        
        if(data.items) {
            this.setItems(data.items);
        }
        
    };

    // Inherit Panel
    Form.prototype = PageItem;

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
        return this.action;
    };

    return Form;
});
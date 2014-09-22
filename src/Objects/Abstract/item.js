/**
 * Menu item definition
 */
define([], function() {

    var Item = function(data) {

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

    };

    /**
     * Setter for the order
     * @param order
     */
    Item.prototype.setOrder = function(order) {
        this.order = order;
    };

    /**
     * Getter for the order
     * @returns integer
     */
    Item.prototype.getOrder = function() {
        return this.order;
    };

    /**
     * Setter for the type
     * @param type
     */
    Item.prototype.setType = function(type) {
        this.type = type;
    };

    /**
     * Getter for the type
     * @returns {type|*}
     */
    Item.prototype.getType = function() {
        return this.type;
    };
    
    return Item;

});
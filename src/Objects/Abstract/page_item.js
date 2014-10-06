/**
 * Menu item definition
 */
define([], function() {

    return function() {

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
    };

});
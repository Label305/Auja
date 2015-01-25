/**
 * Menu item definition
 */
define([], function () {

    return function () {

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
         * ID
         * @type {mixed}
         */
        this.id = 0;

        /**
         * Weither or not the item is active
         * @type {boolean}
         */
        this.active = false;

        /**
         * Setter for the id
         * @param id
         */
        this.setId = function (id) {
            this.id = id;
        };

        /**
         * Getter for the id
         * @returns {id|*}
         */
        this.getId = function () {
            return this.id;
        };

        /**
         * Setter for the order
         * @param order
         */
        this.setOrder = function (order) {
            this.order = order;
        };

        /**
         * Getter for the order
         * @returns integer
         */
        this.getOrder = function () {
            return this.order;
        };

        /**
         * Setter for the type
         * @param type
         */
        this.setType = function (type) {
            this.type = type;
        };

        /**
         * Getter for the type
         * @returns {type|*}
         */
        this.getType = function () {
            return this.type;
        };

        /**
         * Getter for active
         * @return {boolean}
         */
        this.isActive = function () {
            return this.active;
        };

        /**
         * Setter for active
         * @param active
         */
        this.setIsActive = function(active) {
            this.active = active;
        }
    };

});
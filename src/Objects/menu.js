/**
 * Scaffolding of a Auja menu panel
 */
define(['build/Objects/Menu/link', 'build/Objects/Menu/spacer'], function() {

    window.Menu = function() {

        /**
         * Items in this menu
         * @type {Array}
         */
        this.items = [];

        /**
         * Add an item
         * @param item
         */
        this.addItem = function(item) {
            this.items.push(item);
        };
        
        /**
         * Create the menu object
         * @returns {{type: string, menu: *}}
         */
        this.getObject = function() {
            return {
                type: 'menu',
                menu: this.items
            }
        }
        
    }
    
});
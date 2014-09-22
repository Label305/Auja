/**
 * Menu panel type
 */
var MenuItemObjects = {
    'unknown': 'build/Objects/Menu/item',
    'resource': 'build/Objects/Menu/resource'
};

define(['build/Objects/panel', 'build/Factories/menu_item_factory'], function(Panel, MenuItemFactory) {
    
    var Menu = function() {

        //Call the parent constructor
        Panel.call(this);

        /**
         * Menu items
         * @type {Array}
         */
        this.items = [];

        /**
         * Set panel type
         * @type {string}
         */
        this.type = 'menu';   
        
    };
    
    // Inherit Panel
    Menu.prototype = Panel;
    
    // Fix constructor
    Menu.prototype.constructor = Menu;

    /**
     * Setter for items
     * @param items
     */
    Menu.prototype.setItems = function(items) {
        this.items = items.map(function(item) {
            return MenuItemFactory.createItem(item);
        });
    };

    /**
     * Getter for items
     * @returns {Array}
     */
    Menu.prototype.getItems = function() {
        return this.items;
    };

    /**
     * Getter for active item
     * @todo implement active item
     * @returns {boolean}
     */
    Menu.prototype.getActiveItem = function() {
        return false;
    };
    
    return Menu;
});
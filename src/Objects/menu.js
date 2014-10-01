/**
 * Menu panel type
 */
define(['build/Objects/Abstract/panel', 'build/Factories/menu_item_factory'], function(Panel, MenuItemFactory) {
    
    var Menu = function() {

        //Call the parent constructor
        Panel.call(this);
        
        //Set the type
        this.setType('menu');
        
        //Show that we're updateable
        this.setIsUpdateable(true);

        /**
         * Menu items
         * @type {Array}
         */
        this.items = [];

        /**
         * 
         * @type {number}
         * @private
         */
        this._lastIndex = 0;
        
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
            var result = MenuItemFactory.createItem(item);
            
            //Arrange a panel id or transfer the passed id
            result.setId(item.id || '_' + String(++this._lastIndex));
            
            return result;
        }.bind(this));
    };

    /**
     * Getter for items
     * @returns {Array}
     */
    Menu.prototype.getItems = function() {
        return this.items;
    };

    /**
     * Update an item
     * @param item
     * @param data
     */
    Menu.prototype.updateItem = function(item, data) {
        for(var i in this.items) {
            if(this.items[i].getId() == item.getId()) {                
                if(this.items[i].update) {
                    this.items[i].update(data);
                } else {
                    console.error('Update requested on menu item without update method implemented');
                }
                break;
            }
        }
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
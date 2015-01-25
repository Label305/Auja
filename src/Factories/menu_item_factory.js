/**
 * Menu item factory will create menu item objects based on input
 */
var MenuItemObjects = {
    'link': 'build/Objects/Menu/link',
    'spacer': 'build/Objects/Menu/spacer',
    'resource': 'build/Objects/Menu/resource',
    'sortable_item': 'build/Objects/Menu/sortable_item'
};

define([
    'build/Objects/Menu/link',
    'build/Objects/Menu/spacer',
    'build/Objects/Menu/resource',
    'build/Objects/Menu/sortable_item'
], function() {

    return new function() {

        /**
         * Create the panel, will do this based on the type passed in the data
         */
        this.createItem = function(data) {
            if(MenuItemObjects[data.type]) {
                var Item = require(MenuItemObjects[data.type]);
                return new Item(data[data.type]);
            } else {
                console.error('Unknown menu item type requested: ' + data.type);
            }
            return false;
        }

    };

});
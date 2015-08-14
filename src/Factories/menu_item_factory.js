/**
 * Menu item factory will create menu item objects based on input
 */
var MenuItemObjects = {
    'link': '../Objects/Menu/link',
    'spacer': '../Objects/Menu/spacer',
    'resource': '../Objects/Menu/resource',
    'sortable_item': '../Objects/Menu/sortable_item'
};

module.exports = new function () {

    /**
     * Create the panel, will do this based on the type passed in the data
     */
    this.createItem = function (data) {
        if (MenuItemObjects[data.type]) {
            var Item = require(MenuItemObjects[data.type]);
            return new Item(data[data.type]);
        } else {
            console.error('Unknown menu item type requested: ' + data.type);
        }
        return false;
    }

};


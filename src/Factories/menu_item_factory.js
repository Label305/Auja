/**
 * Menu item factory will create menu item objects based on input
 */
import * as MenuItemObjects from '../Objects/Menu/index.js';
module.exports = new function () {

    /**
     * Create the panel, will do this based on the type passed in the data
     */
    this.createItem = function (data) {
        if (MenuItemObjects.hasOwnProperty(data.type)) {
            return new MenuItemObjects[data.type](data[data.type]);
        } else {
            console.error('Unknown menu item type requested: ' + data.type);
        }
        return false;
    }

};


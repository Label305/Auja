/**
 * Menu item factory will create menu item objects based on input
 */
import * as PageItemObjects from '../Objects/Page/index';

module.exports = new function () {

    /**
     * Create the panel, will do this based on the type passed in the data
     */
    this.createItem = function (data) {
        if (PageItemObjects.hasOwnProperty(data.type)) {
            return new PageItemObjects[data.type](data[data.type]);
        } else {
            console.error('Invalid page type requested: ' + data.type);
        }
        return false;
    }

};


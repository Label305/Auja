/**
 * Menu item factory will create menu item objects based on input
 */

import * as FormItemObjects from '../Objects/Page/Form/index.js';
module.exports = new function () {

    /**
     * Create the panel, will do this based on the type passed in the data
     */
    this.createItem = function (data) {
        if (FormItemObjects.hasOwnProperty(data.type)) {
            return new FormItemObjects[data.type](data[data.type]);
        }

        console.error('Unknown item type passed to factory: ' + data.type);

        return false;
    }

};


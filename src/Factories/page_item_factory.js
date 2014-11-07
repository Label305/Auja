/**
 * Menu item factory will create menu item objects based on input
 */
var PageItemObjects = {
    'header': 'build/Objects/Page/header',
    'form': 'build/Objects/Page/form'
};

define([
    'build/Objects/Page/header',
    'build/Objects/Page/form'
], function() {

    return new function() {

        /**
         * Create the panel, will do this based on the type passed in the data
         */
        this.createItem = function(data) {
            if(PageItemObjects[data.type]) {
                var Item = require(PageItemObjects[data.type]);
                return new Item(data[data.type]);
            } else {
                console.error('Invalid page type requested: ' + data.type);
            }
            return false;
        }

    };

});
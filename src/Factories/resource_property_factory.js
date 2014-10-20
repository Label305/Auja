/**
 * Resource property factory will create objects from resource item properties
 */
var ResourceItemProperties = {
    'searchable': 'build/Objects/Menu/Properties/searchable'
};
define([
    'build/Objects/Menu/Properties/searchable'
], function () {

    return new function () {

        /**
         * Create the resource item properties
         */
        this.createProperties = function (data) {
            var result = [];
            for(var name in data) {
                if(ResourceItemProperties[name]) {
                    var propertyObject = require(ResourceItemProperties[name]);
                    result.push(new propertyObject(data[name]));
                } else {
                    console.error('Unknown resource item property requested: ' + name);
                }
            }
            return result;
        };

    };

});
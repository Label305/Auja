/**
 * Resource property factory will create objects from resource item properties
 */
import * as ResourceItemProperties from '../Objects/Menu/Properties/index';

module.exports = new function () {

    /**
     * Create the resource item properties
     */
    this.createProperties = function (data) {
        var result = [];
        for (var name in data) {
            if (ResourceItemProperties.hasOwnProperty(name)) {
                result.push(new ResourceItemProperties[name](data[name]));
            } else {
                console.error('Unknown resource item property requested: ' + name);
            }
        }
        return result;
    };

};


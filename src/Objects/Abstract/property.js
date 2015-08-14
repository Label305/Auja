/**
 * Abstract representation of a property
 */

module.exports = function (data) {

    /**
     * Name of the property
     *
     * @type string
     * @private
     */
    this._name;

    /**
     * Getter for the name
     * @returns string
     */
    this.getName = function () {
        return this._name;
    };

    /**
     * Setter for the name
     * @param name
     */
    this.setName = function (name) {
        this._name = name;
    }

}


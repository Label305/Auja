/**
 * Currently a helper function to do nice ajax requests however
 * the goal is to add routing, options for factories to generate responses etc.etc.
 */

module.exports = function () {

    /**
     * All ongoing requests
     * @type {Array}
     * @private
     */
    this._ongoing = {};

    /**
     * Add url as
     * @param url       to where the request was
     * @param request   the request itself
     */
    this.add = function (url, request) {
        this._ongoing[url] = request;
        request.always(function () {
            delete this._ongoing[url];
        }.bind(this));
    };

    /**
     * Get ongoing request to an url
     * @param url
     * @return jQuery.Deferred|boolean
     */
    this.getOngoing = function (url) {
        return this._ongoing[url];
    }

};

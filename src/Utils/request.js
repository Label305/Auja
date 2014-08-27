/**
 * Currently a helper function to do nice ajax requests however
 * the goal is to add routing, options for factories to generate responses etc.etc.
 * @param string url
 */
window.Request = function () {

    /**
     * The url to do the request o
     * @type String
     */
    this.url = arguments[0] ? arguments[0] : window.location;

    /**
     * Default request
     * @type Object
     */
    this.settings = {
        'data': {},
        'dataType': 'json',
        'cache': false,
        'isFile': false
    };

    /**
     * Setter for data to requests
     * @param data
     */
    this.setData = function (data) {
        this.settings.data = data;
    };

    /**
     * Get request
     * @return Deferred
     * @param callback
     */
    this.get = function (callback) {
        this.settings.type = 'GET';
        return this._doAjax().done(function (response) {
            if (typeof callback == 'function') callback(response);
        });
    };

    /**
     * Post request
     * @return Deferred
     * @param callback
     */
    this.post = function (callback) {
        this.settings.type = 'POST';
        return this._doAjax().done(function (response) {
            if (typeof callback == 'function') callback(response);
        });
    };

    /**
     * Put request
     * @return Deferred
     * @param callback
     */
    this.put = function (callback) {
        this.settings.data._method = 'PUT';
        return this.post(callback);
    };

    /**
     * Actual executor
     * @return Deferred
     */
    this._doAjax = function () {
        if (!this.settings.isFile && this.url.substr(-5) != '.json') {
            this.url += '.json';
        }
        return $.ajax(this.url, this.settings);
    }
};
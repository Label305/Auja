/**
 * Helper to do Http requests
 * 
 * @param url
 */
define([], function() {
    window.HttpRequest = function (url, route) {

        /**
         * The url to do the request to
         * @type String
         */
        this.url = route.action ? route.action : url;

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
         */
        this.get = function () {
            this.settings.type = 'GET';
            return this._doAjax();
        };

        /**
         * Post request
         * @return Deferred
         */
        this.post = function () {
            this.settings.type = 'POST';
            return this._doAjax();
        };

        /**
         * Put request
         * @return Deferred
         */
        this.put = function () {
            this.settings.data._method = 'PUT';
            return this.post();
        };

        /**
         * Actual executor
         * @return Deferred
         */
        this._doAjax = function () {
            return $.ajax(this.url, this.settings);
        }
    };
})
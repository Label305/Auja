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
            if(arguments[0]) {
                this.setData(arguments[0]);
            }
            this.settings.type = 'GET';
            return this._doAjax();
        };

        /**
         * Post request
         * @param data
         * @return Deferred
         */
        this.post = function (data) {
            this.setData(data);
            this.settings.type = 'POST';
            return this._doAjax();
        };

        /**
         * Put request
         * @param data
         * @return Deferred
         */
        this.put = function (data) {
            this.setData(data);
            this.settings.type = 'PUT';
            return this._doAjax();
        };

        /**
         * Actual executor
         * @return Deferred
         */
        this._doAjax = function () {
            var dfd = $.Deferred();
            $.ajax(this.url, this.settings)
                .done(function(response) {
                    dfd.resolve(response);
                })
                .fail(function(jqXHR) {
                    dfd.reject(jqXHR.status);
                });            
            return dfd.promise();
        }
    };
});
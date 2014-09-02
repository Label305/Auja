/**
 * Currently a helper function to do nice ajax requests however
 * the goal is to add routing, options for factories to generate responses etc.etc.
 * @param string url
 */
define(['build/Requests/route_factory', 'build/Requests/Handlers/http'], function (RouteFactory) {


    /**
     * Register as a global initializer for a request
     * @constructor
     */
    window.Request = function(url) {
        
        /**
         * Do a GET request
         * @return jQuery.Deferred
         */
        this.get = function () {
            return RouteFactory.handler(url).get(arguments[0] ? arguments[0] : null);
        };

        /**
         * Do a POST request
         * @return jQuery.Deferred
         */
        this.post = function(data) {
            return RouteFactory.handler(url).post(data);
        };

        /**
         * Do a PUT request
         * @return jQuery.Deferred
         */
        this.put = function(data) {
            return RouteFactory.handler(url).put(data);
        }

    }
    
});
/**
 * Currently a helper function to do nice ajax requests however
 * the goal is to add routing, options for factories to generate responses etc.etc.
 * @param string url
 */

import RouteFactory from './route_factory.js';
import Cache from './cache.js';
/**
 * Register as a global initializer for a request
 * @constructor
 */
window.Request = function (url) {

    /**
     * Do a GET request
     * @return jQuery.Deferred
     */
    this.get = function () {
        var ongoing = RequestCache.getOngoing(url);
        if (ongoing) {
            return ongoing;
        }

        var request = RouteFactory.handler(url).get(arguments[0] ? arguments[0] : null);
        RequestCache.add(url, request);
        return request;
    };

    /**
     * Do a POST request
     * @return jQuery.Deferred
     */
    this.post = function (data) {
        return RouteFactory.handler(url).post(data);
    };

    /**
     * Do a PUT request
     * @return jQuery.Deferred
     */
    this.put = function (data) {
        return RouteFactory.handler(url).put(data);
    }

};

module.exports = window.Request;

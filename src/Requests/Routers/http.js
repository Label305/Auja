/**
 * REST router, will add rest routes to crossroads
 */
define(['build/Requests/Handlers/http'], function() {

    return {

        /**
         * Add a route
         * @param route
         */
        addRoute: function(route) {
            crossroads.addRoute(route.url).matched.add(function (url, setHandler) {
                setHandler(HttpRequest, route);
            });
        }
    };
});
import HttpHandler from '../../Requests/Handlers/http.js';

module.exports = {

    /**
     * Add a route
     * @param route
     */
    addRoute: function (route) {
        crossroads.addRoute(route.target).matched.add(function (url, setHandler) {
            setHandler(HttpHandler, route);
        });
    }
};

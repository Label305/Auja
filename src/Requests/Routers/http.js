module.exports = {

    /**
     * Add a route
     * @param route
     */
    addRoute: function (route) {
        crossroads.addRoute(route.target).matched.add(function (url, setHandler) {
            setHandler(HttpRequest, route);
        });
    }
};

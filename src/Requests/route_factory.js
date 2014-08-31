/**
 * Routing factory, will put all routes in place and ables request object
 * to pass request to correct handler
 */
var routers = {
    'http': 'build/Requests/Routers/http',
    'rest': 'build/Requests/Routers/rest'
};

var routerDependencies = $.map(routers, function (value) {
    return value;
});
define($.merge(['signals', 'crossroads'], routerDependencies), function (signals, crossroads) {

    //Register as a global
    window.crossroads = crossroads;

    /**
     * Setup listening to the AujaStore to update routes in crossroads
     */
    flux.store('AujaStore').on('change', function () {
        crossroads.removeAllRoutes();

        this.getState().routes.map(function (route) {
            require(routers[route.type]).addRoute(route);
        }.bind(this));

        //Add fallback route to http router 
        require(routers['http']).addRoute({
            url: /(.*)/
        });
    });

    //Add fallback route to http router 
    //TODO use bypassed for this
    require(routers['http']).addRoute({
        url: /(.*)/
    });

    return new function () {
        /**
         * Getter for the handler
         * @param url
         * @return handler
         */
        this.handler = function (url) {
            var handler = false;

            //Return same handler as last time when same url is requested
            //crossroads will not parse same route twice in a row
            if (this.lastUrl && this.lastUrl == url) {
                handler = this.lastHandler
            } else {
                //Parse the url to fetch the corresponding handler
                crossroads.parse(url, [url, function (h) {
                    handler = h;
                }.bind(this)]);

                if (handler) {
                    this.lastHandler = handler;
                    this.lastUrl = url;
                }
            }
            
            //Log an error
            if(!handler) {
                console.error('No corresponding handler found for: ' + url);
            }

            //Instantiate the collected handler otherwise return false
            return handler ? new handler(url) : false;
        }
    };
});
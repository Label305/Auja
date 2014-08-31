/**
 * Routing factory, will put all routes in place and ables request object
 * to pass request to correct handler
 */
var routers = {
    'rest': 'build/Requests/Routers/rest'
};

var routerDependencies = $.map(routers, function(value) { return value; });
define($.merge(['signals', 'crossroads'], routerDependencies), function (signals, crossroads) {

    //Register as a global
    window.crossroads = crossroads;

    /**
     * Setup listening to the AujaStore to update routes in crossroads
     */
    flux.store('AujaStore').on('change', function() {
        crossroads.removeAllRoutes();
        
        this.getState().routes.map(function(route) {
            require(routers[route.type]).addRoute(route);            
        }.bind(this));
    });  
    
    return {
        /**
         * Getter for the handler
         * @param url
         * @return handler
         */
        handler: function(url) {
            var handler = false;
            
            //Parse the url to fetch the corresponding handler
            crossroads.parse(url, [url, function(h) {
                handler = h;
            }.bind(this)]);
            
            //Fallback handler
            if(!handler) {
                handler = new HttpRequest(url);
            }
            
            return handler;
        }  
    };
});
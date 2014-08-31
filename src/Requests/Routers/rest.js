/**
 * REST router, will add rest routes to crossroads
 */
define(['build/Requests/Handlers/rest'], function() {
    
    return {
        /**
         * Add routes for a resource
         * @param route
         */
        addResource: function(route) {
            this.addRoute({
                endpoint: route.endpoint + '/menu' 
            });
            this.addRoute({
                endpoint: route.endpoint
            });         
            this.addRoute({
                endpoint: route.endpoint + '/{id}' 
            });      
        },
        
        /**
         * Add a route
         * @param route
         */
        addRoute: function(route) {
            if(route.resource) {
                this.addResource(route);
            } else {
                crossroads.addRoute(route.endpoint).matched.add(function (url, setHandler) {
                    setHandler(RestRequest);
                });
            }
        }  
    };
});
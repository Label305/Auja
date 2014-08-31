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

            var rest = {
                name: !route.resourceName ? route.resource : route.resourceName,
                resource: route.resource
            };
             
            this.addRoute({
                endpoint_type: 'index_menu',
                endpoint: route.endpoint + '/menu',
                rest: rest 
            });
            this.addRoute({
                endpoint_type: 'index',
                endpoint: route.endpoint,
                rest: rest
            });         
            this.addRoute({
                endpoint_type: 'edit',
                endpoint: route.endpoint + '/{id}',
                rest: rest
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
                    setHandler(RestRequest, route);
                });
            }
        }  
    };
});
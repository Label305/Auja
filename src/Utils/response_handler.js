define([], function() {

    /**
     * Handles responses and dispatches accordingly
     */
    window.ResponseHandler = new function() {
        
        /**
         * The main handle
         * @param response
         */
        this.handle = function(response) {
            flux.actions.handle(response.type, response);    
        }
        
    };
    
    return window.ResponseHandler;
});
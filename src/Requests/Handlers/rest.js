/**
 * Restful request
 */
define(['build/Objects/menu'], function() {

    window.RestRequest = function(url, route) {
        
        /**
         * Get a resource
         */
        this.get = function(url) {
            var dfd = $.Deferred();
            
            switch(route.endpoint_type) {
                case 'index_menu':
                                        
                    //TODO move this to seperate class
                    var menu = new Menu();
                                        
                    //Add button
                    var item = new MenuItemLink();
                    item.setName('Add ' + route.rest.name.toLowerCase().singularize());
                    item.setTarget(route.rest.resource + '/create');
                    item.setIcon('compose');
                    menu.addItem(item);
                    
                    //Spacer
                    var item = new MenuItemSpacer();
                    item.setName(route.rest.name.pluralize());
                    menu.addItem(item);
                    
                    dfd.resolve(menu.getObject());
                    break;
            }
            
            return dfd.promise();
        }
    }
});
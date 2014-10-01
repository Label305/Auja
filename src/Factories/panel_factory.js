/**
 * Panel factory will create panel objects based on input
 */
define(['build/Factories/menu_factory', 'build/Factories/page_factory'], function(MenuFactory, PageFactory) {
    
    return new function() {

        /**
         * Create the panel, will do this based on the type passed in the data
         */
        this.createPanel = function(data) {  
            var panel = null;
            switch(data.type) {
                case 'menu':
                    panel = MenuFactory.createMenu(data);
                    break;
                case 'page':
                    panel = PageFactory.createPage(data);
                    break;
            }
            
            //Pass the origin
            panel.setOrigin(data.origin);
            
            return panel;
        }
        
    };
    
});
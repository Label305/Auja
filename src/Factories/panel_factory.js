/**
 * Panel factory will create panel objects based on input
 */
define(['build/Factories/menu_factory', 'build/Factories/page_factory'], function (MenuFactory, PageFactory) {  
    
    return new function () {

        /**
         * Create the panel, will do this based on the type passed in the data
         * @param data
         */
        this.createPanel = function (data) {
            var panel = null;
            switch (data.type) {
                case 'menu':
                    panel = MenuFactory.createMenu(data);
                    break;
                case 'page':
                    panel = PageFactory.createPage(data);
                    break;
            }

            //Pass the origin
            panel.setOrigin(data.origin);
            panel.setUrl(data.url);

            return panel;
        };
        
        /**
         * Update contents of a panel
         * @param panel
         * @param data
         */
        this.updatePanel = function (panel, data) {
            if(panel.getType() != data.type) {
                console.err('Panel type does not correspond to data type during update');
                return;
            }
            
            switch (panel.getType()) {
                case 'menu':
                    panel = MenuFactory.updateMenu(panel, data);
                    break;
            }
            
            return panel;
        }

    };

});
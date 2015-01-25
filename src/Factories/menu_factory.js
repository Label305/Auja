/**
 * Menu factory will create menu objects based on input
 *
 * @todo implement sorting
 */
define(['build/Objects/menu'], function (Menu) {

    return new function () {

        /**
         * Create the menu
         */
        this.createMenu = function (data) {
            var menu = new Menu();
            menu.setItems(data.menu);
            return menu;
        };

        /**
         * Update contents of a menu
         * @param menu
         * @param data
         */
        this.updateMenu = function (menu, data) {
            //Use a mock menu to be able to match id's and see which have disappeared
            var oldItems = menu.getItems();
            var items = this.createMenu(data).getItems().map(function(item) {
                for(var i in oldItems) {
                    //If item implements update method call it otherwise create the newly created item
                    if(oldItems[i].getId() == item.getId()) {
                        if(!oldItems[i].update) {
                            console.error('Menu item does not implement update method');
                            return item;
                        } else {
                            oldItems[i].update(item);
                            return oldItems[i];
                        }
                    }
                }
                return item;
            });
            
            menu.setItems(items);
            return menu;
        }

    };

});
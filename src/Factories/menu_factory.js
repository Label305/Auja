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
            menu.setItems(data.menu);
            return menu;
        }

    };

});
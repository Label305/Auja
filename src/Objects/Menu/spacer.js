/**
 * Object definition of a link
 */
define([], function() {

    window.MenuItemSpacer = function() {
        
        this.type = 'spacer';

        /**
         * The actual link
         * @type {{name: string, href: string, icon: string}}
         */
        this.spacer = {
            name: 'undefined'
        };

        /**
         * Setter for name
         * @param name
         */
        this.setName = function(name) {
            this.spacer.name = name;
        };

    }

});
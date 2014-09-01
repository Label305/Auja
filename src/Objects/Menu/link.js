/**
 * Object definition of a link
 */
define([], function() {

    window.MenuItemLink = function() {
        
        this.type = 'link';

        /**
         * The actual link
         * @type {{name: string, target: string, icon: string}}
         */
        this.link = {
            name: 'undefined',
            target: '',
            icon: 'fallback'
        };

        /**
         * Setter for name
         * @param name
         */
        this.setName = function(name) {
            this.link.name = name;
        };

        /**
         * Setter for target
         * @param target
         */
        this.setTarget = function(target) {
            this.link.target = target;
        };

        /**
         * Setter for icon
         * @param icon
         */
        this.setIcon = function(icon) {
            this.link.icon = icon;
        }
    }

});
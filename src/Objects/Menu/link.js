/**
 * Object definition of a link
 */
define([], function() {

    window.MenuItemLink = function() {
        
        this.type = 'link';

        /**
         * The actual link
         * @type {{name: string, href: string, icon: string}}
         */
        this.link = {
            name: 'undefined',
            href: '',
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
         * Setter for href
         * @param href
         */
        this.setHref = function(href) {
            this.link.href = href;
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
/**
 * Abstract representation of a panel
 */
define([], function() {
    
    return function() {

        /**
         * The object that called this panel in existence
         */
        this.origin;

        /**
         * Type of panel we're looking at
         */
        this.type;

        /**
         * ID of the panel
         * @type string
         */
        this.id;

        /**
         * Setter for the ID
         * @param id
         */
        this.setId = function(id) {
            this.id = id;
        };

        /**
         * Getter for the ID
         * @returns {id|*}
         */
        this.getId = function() {
            return this.id;
        };

        /**
         * Set the origin of the request
         * @param origin
         */
        this.setOrigin = function(origin) {
            this.origin = origin;
        };

        /**
         * Getter for the origin
         * @returns {origin|*}
         */
        this.getOrigin = function() {
            return this.origin;  
        };

        /**
         * Set type of the panel
         * @param type
         */
        this.setType = function(type) {
            this.type = type;
        };
        
        /**
         * Type of panel we're looking at 
         */
        this.getType = function() {
            return this.type;
        };

        /**
         * Update the contents of a panel
         */
        this.update = function() {
            return true;
        }
        
    }
    
});
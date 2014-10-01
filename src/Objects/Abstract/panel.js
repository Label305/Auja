/**
 * Abstract representation of a panel
 */
define([], function() {
    
    return function() {

        /**
         * The object that called this panel in existence
         */
        this._origin;

        /**
         * Type of panel we're looking at
         */
        this._type;

        /**
         * ID of the panel
         * @type string
         */
        this._id;

        /**
         * Index of the panel
         * @type string
         */
        this._index;

        /**
         * Setter for the ID
         * @param id
         */
        this.setId = function(id) {
            this._id = id;
        };
        
        /**
         * Getter for the ID
         * @returns {string|*}
         */
        this.getId = function() {
            return this._id;
        };

        /**
         * Setter for the index
         * @param index
         */
        this.setIndex = function(index) {
            this._index = index;
        };

        /**
         * Getter for the index
         * @returns {integer|*}
         */
        this.getIndex = function() {
            return this._index;
        };

        /**
         * Set the origin of the request
         * @param origin
         */
        this.setOrigin = function(origin) {
            this._origin = origin;
        };

        /**
         * Getter for the origin
         * @returns {origin|*}
         */
        this.getOrigin = function() {
            return this._origin;  
        };

        /**
         * Set type of the panel
         * @param type
         */
        this.setType = function(type) {
            this._type = type;
        };
        
        /**
         * Type of panel we're looking at 
         */
        this.getType = function() {
            return this._type;
        };

        /**
         * Update the contents of a panel
         */
        this.update = function() {
            alert('Update');
            return true;
        }
        
    }
    
});
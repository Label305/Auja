/**
 * Abstract representation of a panel
 */
define([], function() {
    
    return function() {

        /**
         * The object that called this panel in existence
         * @private
         */
        this._origin;

        /**
         * Type of panel we're looking at
         * @private
         */
        this._type;

        /**
         * ID of the panel
         * @type string
         * @private
         */
        this._id;

        /**
         * Index of the panel
         * @type string
         * @private
         */
        this._index;

        /**
         * Is updateable
         * @type {boolean}
         * @private
         */
        this._isUpdateable = false;

        /**
         * Url which the panel represents
         * @typ string
         * @private
         */
        this._url;

        /**
         * Check if paginated
         * @type {boolean}
         * @private
         */
        this._isPaginaged = false;

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
         * Setter for the url
         * @param id
         */
        this.setUrl = function(url) {
            this._url = url;
        };

        /**
         * Getter for the url
         * @returns {string|*}
         */
        this.getUrl = function() {
            return this._url;
        };


        /**
         * Getter for is updateable
         * @returns {*}
         */
        this.isUpdateable = function() {
            return this._isUpdateable;
        };

        /**
         * Setter for is updateable
         * @param isUpdateable
         */
        this.setIsUpdateable = function(isUpdateable) {
            this._isUpdateable = isUpdateable;
        };

        /**
         * Check if the panel is paginated
         * @return boolean
         */
        this.isPaginated = function() {
            return this._isPaginated;
        };

        /**
         * Check if active
         * @return boolean
         */
        this.isActive = function() {
            return this._active;
        };

        /**
         * Set active state
         * @param active
         */
        this.setIsActive = function(active) {
            this._active = active;
        };
    }
    
});
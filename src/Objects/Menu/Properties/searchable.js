define(['build/Objects/Abstract/property'], function(Property) {
    
    var SearchableProperty = function(data) {
        
        //Call the parent constructor
        Property.call(this, arguments);

        /**
         * Target of the searchable, should contain a %s to replace with the search query
         * @type string
         */
        this.target = data.target;

        /**
         * Setter for the target
         * @param target
         */
        this.setTarget = function(target) {
            this.target = target;
        };

        /**
         * Getter for the target
         * @returns {target|*}
         */
        this.getTarget = function() {
            return this.target;
        }
        
    };
    
    // Inherit Property
    SearchableProperty.prototype = Property;

    // Fix constructor
    SearchableProperty.prototype.constructor = SearchableProperty;

    return SearchableProperty;
});
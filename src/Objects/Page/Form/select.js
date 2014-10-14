
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Select = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('select');

        /**
         * The Options of Select
         * @type {array|null}
         * @private
         */
        this._options = data.options || null;

        

        /**
         * Getter for Options
         * @returns {array|null}
         */
        this.getOptions = function() {
            return this._options;
        };

        

        /**
         * Setter for Options
         * @param Selected
         */
        this.setOptions = function(options) {
            this._options = options;
        };

        
        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName(),
                options: this.getOptions()
            }
        };
    };

    // Inherit FormItem
    Select.prototype = FormItem;

    // Fix constructor
    Select.prototype.constructor = Select;
    
    return Select;
});
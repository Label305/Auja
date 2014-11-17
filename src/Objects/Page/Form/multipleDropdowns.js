
define(['build/Objects/Abstract/form_item', 'build/Objects/Page/Form/select'], function(FormItem, Select) {

    var MultipleDropdowns = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('multipleDropdowns');

        /**
         * The Options of multipleDropdowns
         * @type {array|null}
         * @private
         */
        this._options = data.options || [];

        
        /**
         * Getter for Options
         * @returns {array|null}
         */
        this.getOptions = function() {
            return this._options;
        };

               
        /**
         * Setter for Options
         * @param MultipleDropdowns
         */
         this.setOptions = function(options) {
            if(options) {
                //Initialize the options as an array of dropdown options
                this._options = options.map(function(select) {
                    select.name = this.getName();
                    select.value = this.getValue();
                    return new Select(select);
                }.bind(this));                
            } 
            return this._options;         
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
                options: this.getOptions(),
                }
        };

        this.setOptions(data.options);

    };

    // Inherit FormItem
    MultipleDropdowns.prototype = FormItem;

    // Fix constructor
    MultipleDropdowns.prototype.constructor = SelectMultipleCheckbox;
    
    return MultipleDropdowns;
});
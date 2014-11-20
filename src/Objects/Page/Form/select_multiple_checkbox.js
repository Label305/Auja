
define(['build/Objects/Abstract/form_item', 'build/Objects/Page/Form/checkbox'], function(FormItem, Checkbox) {

    var SelectMultipleCheckbox = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('selectMultipleCheckbox');

        /**
         * The Options of SelectMultipleCheckbox
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
         * @param SelectMultipleCheckbox
         */
         this.setOptions = function(options) {
            if(options) {
                //Initialize the options as an array of Checkbox-es
                this._options = options.map(function(checkbox) {
                    checkbox.name = this.getName();
                    checkbox.value = this.getValue();
                    checkbox.fallback = false;
                    return new Checkbox(checkbox);
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
    SelectMultipleCheckbox.prototype = FormItem;

    // Fix constructor
    SelectMultipleCheckbox.prototype.constructor = SelectMultipleCheckbox;
    
    return SelectMultipleCheckbox;
});

define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Select = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('select');

        /**
         * The Options of Select
         * @type {boolean|null}
         * @private
         */
        this._options = data.options || null;

        /**
         * The Selected state of Select
         * @type {boolean|null}
         * @private
         */
        this._selected = data.selected || null;

        /**
         * Getter for Options
         * @returns {array|null}
         */
        this.getOptions = function() {
            return this._options;
        };

        /**
         * Getter for Selected
         * @returns {boolean|null}
         */
        this.getSelected = function() {
            return this._selected;
        };

        /**
         * Setter for Options
         * @param Selected
         */
        this.setOptions = function(options) {
            this._options = options;
        };

        /**
         * Setter for Selected
         * @param Selected
         */
        this.setSelected = function(selected) {
            this._selected = selected;
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
                selected: this.getSelected(),
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
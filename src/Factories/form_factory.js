/**
 * Form factory will create form objects based on input
 */
define(['build/Objects/Page/form'], function(Form) {

    return new function() {

        /**
         * Create the form
         */
        this.createForm = function(data) {
            var form = new Form();
            form.setItems(data.form.items);
            return form;
        }

    };

});
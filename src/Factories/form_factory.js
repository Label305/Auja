/**
 * Form factory will create form objects based on input
 */

import Form from '../Objects/Page/form.js';
module.exports = new function () {

    /**
     * Create the form
     */
    this.createForm = function (data) {
        return new Form(data);
    }

};


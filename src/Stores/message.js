import Fluxxor from 'fluxxor';

/**
 * The pages store
 */
module.exports = Fluxxor.createStore({

    /**
     * All pages currently in view
     */
    message: {},

    /**
     * On initialization and on system update we will update the state
     * @param url
     */
    initialize: function (url) {
        this.bindActions(
            'message', this.dispatch
        )
    },

    /**
     * Getter for the latest message
     * @returns {*}
     */
    getMessage: function () {
        return this.message;
    },

    /**
     * Reset
     */
    reset: function () {
        this.message = {
            message: null
        };
        this.emit('change');
    },

    /**
     * Dispatching of a message
     * @param message
     */
    dispatch: function (message) {
        this.message = message;
        this.emit('change');
    }

});


import Fluxxor from 'fluxxor';
import Request from '../Requests/request';
import FormFactory from '../Factories/form_factory';
/**
 * The main Auja store
 */
module.exports = Fluxxor.createStore({

    /**
     * State of the Auja scaffolding
     */
    state: {
        "title": "",
        "authenticated": false,
        "debug": true,
        "colors": {
            "main": "#1ebab8",
            "secondary": "#EDEDED",
            "alert": "#e85840"
        },
        "user": {
            "name": ""
        },
        "buttons": [],
        "menu": [],
        "routes": [],
        "authentication": false
    },

    /**
     * On initialization and on system update we will update the state
     * @param url
     */
    initialize: function (url) {
        this.bindActions(
            'initialize', this.update,
            'update', this.update,
            'message', this.message
        )
    },

    /**
     * Getter for the state
     * @returns {*}
     */
    getState: function () {
        return this.state;
    },

    /**
     * Update, will fetch the 'data-src' tag from the body
     * @todo add error handling
     */
    update: function () {
        var request = new Request(document.body.getAttribute('data-src'));
        request.get()
            .done(function (response) {

                //Pass through the factory
                if (response.main.authentication && response.main.authentication.form) {
                    response.main.authentication = FormFactory.createForm(response.main.authentication.form);
                }

                Object.merge(this.state, response.main, true, true);
                this.emit('change');
            }.bind(this))
            .fail(function (code) {
                flux.actions.processFail(code);
            }.bind(this));
    },

    /**
     * Messages can contain snippets that are relevant for auja
     * @param message
     */
    message: function (message) {
        var changed = false;

        if (message.authenticated && this.state.authenticated != message.authenticated) {
            this.state.authenticated = message.authenticated;
            changed = true;
        }

        if (changed) {
            this.emit('change');
        }
    }

});


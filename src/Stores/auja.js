define(['fluxxor'], function(Fluxxor) {

    /**
     * The main Auja store
     */
    return Fluxxor.createStore({

        /**
         * State of the Auja scaffolding
         */
        state: {
            "title": "",
            "authenticated": false,
            "debug": true,
            "colors": {
                "main": ""
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
        initialize: function(url) {
            this.bindActions(
                'initialize', this.update,
                'update', this.update
            )  
        },

        /**
         * Getter for the state
         * @returns {*}
         */
        getState: function() {
            return this.state;
        },

        /**
         * Update, will fetch the 'data-src' tag from the body
         * @todo add error handling
         */
        update: function() {
            var request = new Request(document.body.getAttribute('data-src'));
            request.get()
                .done(function (response) {
                    $.extend(this.state, response.main);
                    this.emit('change');
                }.bind(this))
                .fail(function () {
                    // TODO handle this
                }.bind(this));
        }
        
    })
    
});
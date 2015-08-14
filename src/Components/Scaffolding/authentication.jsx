/**
 * @jsx React.DOM
 */

import React from 'react';
import Form from '../Panels/Page/form.jsx';

module.exports = React.createClass({

    /**
     * Stores if the user was authenticated once
     */
    wasAuthenticated: false,

    /**
     * Definition of the authentication panel
     * @todo use an object definition for this
     */
    panel: {
        id: 'authentication'
    },

    render: function () {

        /**
         * Empty overlay when no authentication available
         */
        if (!this.props.auja.authentication) {
            return (
                <span className="authentication-missing"></span>
            );
        }

        var className = "authentication-overlay authentication-overlay-hugeinc";

        //Set weither or not the user has already been authenticated before
        if (this.wasAuthenticated) {
            className += " transparent";
        } else if (this.props.auja.authenticated) {
            this.wasAuthenticated = true;
        }

        //Set open/closed
        className += this.props.auja.authenticated ? " closed" : " open";

        //Get a message from this form
        var message = flux.store('MessageStore').getMessage();

        return (
            <div className={className}>
                <Form message={message} panel={this.panel} item={this.props.auja.authentication}/>
            </div>
        );
    }
});


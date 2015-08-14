/**
 * A button
 *
 * - text
 * - target
 * - confirm
 *
 * @jsx React.DOM
 */

import React from 'react';
module.exports = React.createClass({
    getInitialState: function () {
        return {
            confirming: false
        };
    },
    handleClick: function () {
        if (this.props.button.confirm && !this.state.confirming) {
            this.state.confirming = true;
            this.setState(this.state);
            setTimeout(function () {
                this.state.confirming = false;
                this.setState(this.state);
            }.bind(this), 1000);
        } else {
            flux.actions.click(this.props.button.target, this.props.panel);
        }
    },
    render: function () {
        var className = "button ";
        className += this.props.button.confirm ? "auja-bg-alert" : "auja-bg-main";

        if (this.state.confirming) {
            return (
                <a className={className} onClick={this.handleClick}>{this.props.button.confirm}</a>
            );
        }

        return (
            <a className={className} onClick={this.handleClick}>{this.props.button.text}</a>
        );
    }
});


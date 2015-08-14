/**
 * A link menu item, properties:
 *
 * - name
 * - href
 * - icon
 *
 * @jsx React.DOM
 */

import React from 'react';
module.exports = React.createClass({
    handleClick: function () {
        if (!this.props.item.isExternal()) {
            flux.actions.click(this.props.item.getTarget(), this.props.panel, this.props.item);
        }
    },
    render: function () {

        var className = 'menu-item-link auja-border-secondary ';

        //Create the icon class
        var icon = "fallback";
        if (this.props.item.getIcon()) {
            icon = this.props.item.getIcon();
        }
        className += "icon " + icon;

        //Check if we match the active item
        if (this.props.item.isActive()) {
            className += " auja-color-main active auja-active-border-main";
        }

        var link = <span>{this.props.item.getText()}</span>;
        if (this.props.item.isExternal()) {
            link = <a target="_blank" href={this.props.item.getTarget()}>{this.props.item.getText()}</a>;
            className += " external";
        }

        if (this.props.item.getTarget() == false) {
            className += " no-target";
            return (
                <li className={className}>
                    {link}
                </li>
            );
        } else {
            return (
                <li className={className} onClick={this.handleClick}>
                    {link}
                </li>
            );
        }
    }
});


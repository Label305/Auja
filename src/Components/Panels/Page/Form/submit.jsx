/**
 * A submit button, properties:
 *
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */

import React from 'react';

module.exports = React.createClass({
    render: function () {
        var attributes = this.props.item.getAttributes();
        attributes.className = 'button auja-bg-main';

        return (
            <div>
                {React.DOM.input(attributes)}
            </div>
        );
    }
});

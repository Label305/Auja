/**
 * A page panel
 *
 * @jsx React.DOM
 */
import React from 'react';
import PageItems from './Page/index.js';

module.exports = React.createClass({
    render: function () {

        //Combine page items together to form a single list
        var page = this.props.panel.getContent().map(function (item) {
            if (!item) {
                console.error('Undefined item passed, did you create an object for it?');
                return;
            } else if (!PageItems.hasOwnProperty(item.getType())) {
                console.error("Unsupported page item type requested: " + item.getType());
                return;
            }

            var Item = PageItems[item.getType()];

            return <div className="row">
                <Item message={this.props.message} panel={this.props.panel} item={item}/>
            </div>;
        }.bind(this));

        return (
            <div>
                {page}
            </div>
        );
    }
});


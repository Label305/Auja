/**
 * @jsx React.DOM
 */
import React from 'react';
import Menu from './menu.jsx';
import Panels from './panels.jsx';

module.exports = React.createClass({
    render: function () {
        return (
            <section id="content">
                <Menu auja={this.props.auja}/>
                <Panels flux={this.props.flux}/>
            </section>
        );
    }
});


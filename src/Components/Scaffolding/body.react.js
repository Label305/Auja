/**
 * @jsx React.DOM
 */
define([
    'build/Components/Scaffolding/menu.react',
    'build/Components/Scaffolding/panels.react'
], function(Menu, Panels) {

    return React.createClass({
        render: function() {
            return (
                <section id="content">
                    <Menu auja={this.props.auja} />
                    <Panels flux={this.props.flux} />
                </section>
                );
        }
    });

});
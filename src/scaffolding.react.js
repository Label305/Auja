/**
 * @jsx React.DOM
 */
define([
    'build/Stores/auja',
    'build/Components/Scaffolding/header.react',
    'build/Components/Scaffolding/body.react'
], function(Store, Header, Body) {
    
    return React.createClass({
        mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('AujaStore')],
        getStateFromFlux: function() {
            return this.getFlux().store('AujaStore').getState();                
        },
        componentWillMount: function() {
            this.getFlux().actions.initialize();
        },
        render: function() {
            document.title = this.state.title;    
            
            return (
                <div id="auja">
                    <Header auja={this.state} />
                    <Body auja={this.state} />
                </div>
                );
        }
    });
    
});
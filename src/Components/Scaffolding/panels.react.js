/**
 * Panels
 *
 * @jsx React.DOM
 */
    
//Listing of all supported panels
var PanelTypes = {
    'menu': 'build/Components/Panels/menu.react',
    'page': 'build/Components/Panels/page.react'
};

//Map as an array to load panel dependencies
define($.map(PanelTypes, function(value) { return value; }), function() {
    
    var PanelSection = React.createClass({
        handleScroll: function() {
            flux.actions.onPanelScroll(this.props.panel);
        },
        render: function () {
            var Panel = require(PanelTypes[this.props.panel.type]);
            
            return (
                <section id={this.props.panel.id} ref="panel" className={"panel panel-" + this.props.panel.type}>
                    <div onScroll={this.handleScroll} style={this.props.style}>
                        <Panel flux={this.props.flux} message={this.props.message} panel={this.props.panel} />
                    </div>
                </section>
                );
        }
    });

    /**
     * Main content with all panels
     */
    return React.createClass({
        mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('PanelStore', 'MessageStore')],
        getStateFromFlux: function() {
            return flux.store('PanelStore').getState();
        },

        /**
         * Render the div with all panels
         * @returns {XML}
         */
        render: function() {
            
            var message = flux.store('MessageStore').getMessage();
                        
            //Fetch and wrap all panels in a section having the class "panel panel-{type}"
            var panels = this.state.panels.map(function(panel) {
                var style = {
                    height: this.state.height  
                };
                
                //When the current message is destined for this panel pass it, otherwise just an empty panel
                var m = {};
                if(message.origin && message.origin.id == panel.id) {
                    m = message.message;
                }
                
                return (<PanelSection flux={this.props.flux} panel={panel} message={m} style={style} />);  
            }.bind(this));

            return (
                <div id="panels">
                    <div>
                    {panels}
                    </div>
                </div>
                );
        }
    });

});
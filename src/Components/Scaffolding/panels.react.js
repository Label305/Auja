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
                var Panel = require(PanelTypes[panel.type]);
                var style = {
                    height: this.state.height  
                };
                
                //When the current message is destined for this panel pass it, otherwise just an empty panel
                var m = {};
                if(message.origin && message.origin._index == panel._index) {
                    m = message.message;
                }
                
                return (
                    <section style={style} className={"panel panel-" + panel.type}>
                        <Panel message={m} panel={panel} />
                    </section>
                    );  
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
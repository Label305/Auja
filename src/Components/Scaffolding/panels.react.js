/**
 * Panels
 *
 * @jsx React.DOM
 */
    
//Listing of all supported panels
var PanelTypes = {
    'menu': 'build/Components/Panels/menu.react'
};

//Map as an array to load panel dependencies
define($.map(PanelTypes, function(value) { return value; }), function() {

    /**
     * Main content with all panels
     */
    return React.createClass({
        mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('PanelStore')],
        getStateFromFlux: function() {
            return flux.store('PanelStore').getState();
        },

        /**
         * Render the div with all panels
         * @returns {XML}
         */
        render: function() {
            
            //Fetch and wrap all panels in a section having the class "panel panel-{type}"
            var panels = this.state.panels.map(function(panel) {
                var Panel = require(PanelTypes[panel.type]);
                return (
                    <section className={"panel panel-" + panel.type}>
                        <Panel panel={panel} />
                    </section>
                    );  
            }.bind(this));

            return (
                <div id="panels">
                    {panels}
                </div>
                );
        }
    });

});
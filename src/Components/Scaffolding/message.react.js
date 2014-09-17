/**
 * Message
 *
 * @jsx React.DOM
 */
define([], function() {
    
    var Info = React.createClass({
        render: function() {
            return (
                <div className="message message-info auja-bg-main" onClick={this.props.handleOnClick}>
                    {this.props.message.contents}
                </div>
                );
        }
    });

    /**
     * Main content with all panels
     */
    return React.createClass({
        mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('MessageStore')],
        getStateFromFlux: function() {
            return { 
                message: flux.store('MessageStore').getMessage()
            };
        },

        /**
         * Handle click on message
         */
        handleOnClick: function() {
            flux.store('MessageStore').reset();  
        },

        /**
         * Render the div with all panels
         * @returns {XML}
         */
        render: function() {            
            //No state nothing to show
            if(this.state.message.message && this.state.message.message.state) {
                switch(this.state.message.message.state) {
                    case 'info':
                        return (<Info handleOnClick={this.handleOnClick} message={this.state.message.message} />);
                        break;
                    default:
                        console.error(this.state.message.message.state.upperCaseChars + ' message not implemented');
                }
            }
            return (<span></span>);
        }
    });

});
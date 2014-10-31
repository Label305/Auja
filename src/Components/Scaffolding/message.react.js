/**
 * Message
 *
 * @jsx React.DOM
 */
define([], function() {
    
    var Info = React.createClass({
        render: function() {
            return (
                <div className="animated zoomIn message message-info auja-bg-main" onClick={this.props.handleOnClick}>
                    {this.props.message.contents}
                </div>
                );
        }
    });

    var Success = React.createClass({
        componentDidMount: function() {
            
            //Wait for a little bit to hide the message
            setTimeout(function() {
                var n = this.refs.message.getDOMNode();
                n.className = n.className + " fadeOut";
                
                //Force reset after automatic 
                setTimeout(function() {
                    this.props.handleOnClick();
                }.bind(this), 50);
            }.bind(this), 500);  
        },
        render: function() {
            return (
                <div ref="message" className="animated fadeIn message message-success" onClick={this.props.handleOnClick}>
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
         * Bind click on escape to reset the message
         */
        componentDidMount: function() {
            $(document).bind('keyup', function(e) {
                if(e.keyCode == 27) {
                    flux.store('MessageStore').reset();
                }  
            });
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
                    case 'success':
                        return (<Success handleOnClick={this.handleOnClick} message={this.state.message.message} />);
                        break;
                    default:
                        console.error(this.state.message.message.state.upperCaseChars + ' message not implemented');
                }
            }
            return (<span></span>);
        }
    });

});
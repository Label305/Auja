/**
 * @jsx React.DOM
 */
/**
 * @jsx React.DOM
 */
define([
    'build/Components/Scaffolding/header.react',
    'build/Components/Scaffolding/body.react'
], function(Header, Body) {
        
    return React.createClass({		
        getInitialState: function() {
            return {
                
                //Main title of Auja
                "title": "",
                
                //Weither or not the current user is authenticated
                "authenticated": false,
                
                //Colors used in the interface, can be changed on demand
                "colors": {
                    "main": ""
                },
                
                //Name/information about the current user
                "user": {
                    "name": ""
                },
                
                //Buttons shown right of the user information
                "buttons": [],
                
                //Main menu from which is navigated
                "menu": [],
                
                //No authentication details
                "authentication": false
            };
        },
        triggerFail: function(message) {
              alert('Fail: ' + message);
        },
        componentWillMount: function() {
            var request = new Request(document.body.getAttribute('data-src'));
           request.get()
                .done(function (response) {
                    if(response.type != 'auja') {
                        this.triggerFail('Response type of scaffolding is no Auja');
                        return;
                    }
                    $.extend(this.state, response.auja);
                                        
                    this.setState(this.state);
                }.bind(this))
                .fail(function () {
                    this.triggerFail('Request for scaffolding failed');
                }.bind(this));
        },
        render: function() {
            return (
                <div id="auja">
                    <Header auja={this.state} />
                    <Body auja={this.state} />
                </div>
                );
        }
    });
    
});
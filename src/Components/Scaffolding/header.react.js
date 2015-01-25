/**
 * @jsx React.DOM
 */
define(['react', 'fluxxor','build/Components/Scaffolding/hamburger.react'], function (React, Fluxxor, Hamburger) {
    return React.createClass({
        mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('PanelStore')],
        getStateFromFlux: function () {
            return flux.store('PanelStore').getState();
        },
        handleNavigatePanelLeft: function() {
            flux.actions.navigateToPanelLeft();  
        },
        render: function () {
            //Name of the user
            var user = '';
            if (this.props.auja.user) {
                user = (
                    <div className="auja-color-main"  id="user">{this.props.auja.user.name}</div>
                );
            }

            //TODO: map the auja main config to an object so we get just use a getter
            if(!this.props.auja.buttons) {
                this.props.auja.buttons = []
            }

            var usesHamburger = this.props.auja.buttons.length > 1;
            
            //Buttons, e.g. logout
            var buttons = '';
            if (!usesHamburger && this.props.auja.buttons) {
                buttons = this.props.auja.buttons.map(function (button) {
                    var buttonClasses = button.icon + " button auja-color-main";
                    return (
                        <a className={buttonClasses} key={button.target} href={button.target}>{button.text}</a>
                    );
                });
                buttons = <div id="buttons">{buttons}</div>;
            }
            
            //Make a burger
            var burger = '';
            if (usesHamburger) {
                burger = <Hamburger auja={this.props.auja}/>;
            } 
            
            //Fill backbutton
            var backButton = '';
            if(flux.store('PanelStore').hasActivePanels()) {
                backButton = <div className="menu-back ion-chevron-left" onClick={this.handleNavigatePanelLeft}></div>;
            }
            
            return (
                <header>
                    {backButton}
                    <h1>{this.props.auja.title}</h1>
                    {buttons}
                    {user}
                    {burger}
                </header>
            );

        }
    });

});
                        
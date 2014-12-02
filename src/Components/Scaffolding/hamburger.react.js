/**
 * @jsx React.DOM
 */
 define(['react', 'jquery'], function (React) {
    return React.createClass({
        getInitialState: function () {
        return {containerClass: 'menu-container', overlayClass: 'menu-overlay'};
        },        
        
        handleClick: function(event) {
            this.state.containerClass == 'menu-container' ? this.setState({containerClass: 'menu-container menu-open'}) : this.setState({containerClass: 'menu-container'});
            this.state.overlayClass == 'menu-overlay' ? this.setState({overlayClass: 'menu-overlay menu-visible'}) : this.setState({overlayClass: 'menu-overlay'});
        },
        
        render: function () {
        
        var user = '';
            if (this.props.auja.user) {
                user = (
                    <div className="username">{this.props.auja.user.name}</div>
                    );
            }

            //Buttons, e.g. logout
            var buttons = '';
            if (this.props.auja.buttons) {
                buttons = this.props.auja.buttons.map(function (button) {
                    return (
                        <li><a key={button.target} href={button.target}>{button.text}</a></li>
                        );
                });
            }
            var containerClass= this.state.containerClass;
            var overlayClass= this.state.overlayClass;
            return (
                <div className={containerClass}>
                    <div className="menu-trigger" onClick={this.handleClick}>
                        <span></span>
                    </div>

                    <div className={overlayClass}>
                        {user}
                        <ul>
                        {buttons}
                        </ul>
                    </div>
                </div>
            );

        }
    });

});

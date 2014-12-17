/**
 * @jsx React.DOM
 */
define(['react', 'jquery'], function (React) {
    return React.createClass({
        getInitialState: function () {
            return {
                open: false
            };
        },

        handleClick: function (event) {
            this.setState({open: !this.state.open});
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
                        <li key={button.target} className="auja-border-secondary">
                            <a href={button.target}>{button.text}</a>
                        </li>
                    )
                });
            }

            //Classes for opening/closing
            var containerClass = 'menu-container';
            var overlayClass = 'menu-overlay';
            if (this.state.open) {
                containerClass += ' menu-open';
                overlayClass += ' menu-visible';
            }

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

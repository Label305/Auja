/**
 * @jsx React.DOM
 */
define(['react', 'build/Components/Scaffolding/hamburger.react'], function (React, Hamburger) {
    return React.createClass({
        render: function () {
            //Name of the user
            var user = '';
            if (this.props.auja.user) {
                user = (
                    <div className="auja-color-main"  id="user">{this.props.auja.user.name}</div>
                    );
            }

            //Buttons, e.g. logout
            var buttons = '';
            if (this.props.auja.buttons) {
                buttons = this.props.auja.buttons.map(function (button) {
                    return (
                        <a className="auja-bg-main button" key={button.target} href={button.target}>{button.text}</a>
                        );
                });
            }
            return (
                <header>
                <div className="menu-back ion-chevron-left"></div>
                <h1>{this.props.auja.title}</h1>
                    <div id="buttons">{buttons}</div>
                    {user}

                <Hamburger />
                </header>
            );

        }
    });

});
                        
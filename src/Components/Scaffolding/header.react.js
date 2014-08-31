/**
 * @jsx React.DOM
 */
define([], function () {

    return React.createClass({
        render: function () {
            var headerStyle = {
                color: this.props.auja.colors.main
            };

            //Name of the user
            var user = '';
            if (this.props.auja.user) {
                var userStyle = {
                    color: this.props.auja.colors.main
                };
                user = (
                    <div style={userStyle} id="user">{this.props.auja.user.name}</div>
                    );
            }

            //Buttons, e.g. logout
            var buttons = '';
            if (this.props.auja.buttons) {
                var buttonStyle = {
                    backgroundColor: this.props.auja.colors.main
                };

                buttons = this.props.auja.buttons.map(function (button) {
                    return (
                        <a style={buttonStyle} href={button.url}>{button.title}</a>
                        );
                });
            }
            return (
                <header>
                    <h1 style={headerStyle}>{this.props.auja.title}</h1>
                    <div id="buttons">{buttons}</div>
                    {user}
                </header>
                );

        }
    });

});
                        
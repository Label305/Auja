/**
 * @jsx React.DOM
 */
define([], function () {

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
                        <a className="auja-bg-main" href={button.url}>{button.title}</a>
                        );
                });
            }
            return (
                <header>
                    <h1 className="auja-color-main">{this.props.auja.title}</h1>
                    <div id="buttons">{buttons}</div>
                    {user}
                </header>
                );

        }
    });

});
                        
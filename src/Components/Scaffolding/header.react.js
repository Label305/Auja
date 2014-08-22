/**
 * @jsx React.DOM
 */
define([], function() {

    return React.createClass({
        render: function() {
            return (
                <header>
                    <h1>{this.props.auja.title}</h1>
                </header>
                );
        }
    });

});
/**
 * @jsx React.DOM
 */
define([], function() {

    return React.createClass({
        render: function() {
            var headerStyle = {
                color: this.props.auja.colors.main
            };
            
            return (
                <header>
                    <h1 style={headerStyle}>{this.props.auja.title}</h1>
                </header>
                );
        }
    });

});
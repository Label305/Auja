/**
 * The main menu on the left
 * 
 * @jsx React.DOM
 */
define([], function() {
    
    var Item = React.createClass({
        handleClick: function() {
            flux.actions.click(this.props.item.url);
        },
        render: function() {
            return (
                <li title={this.props.item.title} onClick={this.handleClick}>{this.props.item.title}</li>
                );
        }
    });

    return React.createClass({
        render: function() {
            var menu = this.props.auja.menu.map(function(item) {
                return (
                    <Item item={item} />
                    );
            }.bind(this));
            
            return (
                <ul id="main-menu">
                    {menu}
                </ul>
                );
        }
    });

});
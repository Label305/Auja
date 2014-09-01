/**
 * The main menu on the left
 * 
 * @jsx React.DOM
 */
define([], function() {
    
    var Item = React.createClass({
        handleClick: function() {
            flux.actions.click(this.props.item.target);
        },
        render: function() {            
            return (
                <li className="auja-bg-main" title={this.props.item.title} onClick={this.handleClick}>
                    <p>{this.props.item.title}</p>
                </li>
                );
        }
    });

    return React.createClass({
        render: function() {
            var menu = this.props.auja.menu.map(function(item) {
                return (
                    <Item auja={this.props.auja} item={item} />
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
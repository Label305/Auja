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
            var className = "auja-bg-main";
            
            if(this.props.item.icon) {
                className += " icon ion-" + this.props.item.icon;
            }
            
            return (
                <li className={className} title={this.props.item.title} onClick={this.handleClick}>
                    <span>{this.props.item.title}</span>
                </li>
                );
        }
    });

    return React.createClass({
        render: function() {
            var menu = this.props.auja.menu.map(function(item) {
                return (
                    <Item key={item.target} auja={this.props.auja} item={item} />
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
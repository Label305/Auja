/**
 * A page header
 *
 * - contents
 * 
 * @jsx React.DOM
 */

define(['build/Components/Panels/Page/button.react'], function(Button) {
    return React.createClass({
        render: function() {
            var buttons = '';
            if(this.props.item.header.buttons) {
                buttons = this.props.item.header.buttons.map(function(button) {
                    return (
                        <Button panel={this.props.panel} button={button} />
                        );
                }.bind(this));
            }
            
            return (
                <h2>{this.props.item.header.text}{buttons}</h2>
                );
        }
    });

});
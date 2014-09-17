/**
 * A submit button, properties:
 *
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */

define([], function() {
    return React.createClass({
        render: function() {
            var attributes = Object.clone(this.props.item.submit);
                        
            Object.merge(attributes, {
                id: this.props.itemId,
                type: 'submit',
                className: 'button auja-bg-main'
            });
            
            return (
                <div>
                    {React.DOM.input(attributes)}
                </div>
                );
        }
    });

});
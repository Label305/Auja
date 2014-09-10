/**
 * A text field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define([
    'build/Components/Panels/Page/Form/label.react',
    'jquery.fileupload'
], function(Label) {
    return React.createClass({
        componentDidMount: function() {
            //Dynamically add the element since we don't want to have React to bind its events to it
            var node = $(this.refs.file.getDOMNode()).append(
                $('<input type="file" />')
            );
                
            node.fileupload({
                url: 'upload'
            });
        },
        render: function() {
            return (
                <div ref="file">
                    <Label item={this.props.item} name={this.props.item.file.label} />
                </div>
                );
        }
    });

});
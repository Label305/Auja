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
    'react',
    'build/Components/Panels/Page/Form/label.react',
    'jquery.fileupload'
], function (React, Label) {
    return React.createClass({
        componentDidMount: function () {
            //Dynamically add the element since we don't want to have React to bind its events to it
            var node = $(this.refs.file.getDOMNode()).append(
                $('<input type="file" name="file" data-name="file" />')
            );

            node.fileupload({
                url: this.props.item.getTarget(),

                //Transfer the reference we got from the upload response
                done: function (e, data) {
                    var ref = '';
                    for (var i in data.result.files) {
                        ref = data.result.files[0].ref;
                    }
                    $(this.refs.hidden.getDOMNode()).val(ref);
                }.bind(this)
            });
        },
        render: function () {
            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                    <span ref="file"></span>
                    <input type="text" name={this.props.item.getName()} ref="hidden" />
                </div>
            );
        }
    });

});
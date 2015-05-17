/**
 * A Wysihtml RTE, properties:
 *
 * - label
 * - name
 * - value will be entered as value
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define(['react', 'build/Components/Panels/Page/Form/label.react', 'tinymcejq'], function(React, Label) {
    return React.createClass({
        componentDidMount: function() {
            tinymce.init({
                selector: ".tinymce-editor",
                theme: "modern",
                height: 300,
                plugins: [
                    "advlist autolink link image lists charmap preview",
                    "searchreplace visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                    "save table contextmenu directionality textcolor"
                ],
                toolbar: "styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview"
            });

        },
        render: function() {

            var attributes = this.props.item.getAttributes();

            Object.merge(attributes, {
                id: this.props.itemId,
                type: 'textarea',
                ref: 'textarea',
                className: 'tinymce-editor'
            });

            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                    {React.DOM.textarea(attributes, this.props.item.getValue())}
                </div>
            );
        }
    });

});
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
define(['react', 'build/Components/Panels/Page/Form/label.react', 'build/Components/Panels/Page/Form/file_select.react', 'tinymcejq'], function (React, Label, FileSelect) {
    return React.createClass({
        getInstanceId: function () {
            if (!this.instanceId) {
                this.instanceId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
            return this.instanceId;
        },
        getIdentifier: function () {
            return 'tinymce-editor-' + this.getInstanceId();
        },
        handleUploaderChange: function(files) {
            //files array.
            if(files[0] != undefined) {
                $('.mce-floatpanel input:first').val(files[0].name);
            }
        },
        componentDidMount: function () {

            // Tell tinyMCE that the dom has already loaded since it wasn't there when
            // the event triggered
            tinymce.dom.Event.domLoaded = true;

            // Tell tinyMCE it has an uploader
            var uploadCallback = null;

            if(this.props.item.getHasUploader()) {

                uploadCallback = function (field_name, url, type, win) {
                    var uploaderClass = '.tinymce-uploader-' + this.getInstanceId() + ' input[type="file"]';
                    if(type=='image') $(uploaderClass).click();
                }.bind(this);
            }



            //Actually initialize the editor
            tinymce.init({
                selector: '#' + this.getIdentifier(),
                theme: "modern",
                schema: "html5",
                height: 300,
                content_style: "img{max-width: 100%; display: block;}",
                plugins: [
                    "advlist autolink link image lists charmap preview",
                    "code fullscreen insertdatetime media",
                    "save table contextmenu directionality textcolor"
                ],
                cleanup : true,
                convert_fonts_to_spans: false,
                entity_encoding : "raw",
                toolbar: "styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview",
                extended_valid_elements : "div[class], img",
                file_browser_callback: uploadCallback

            });

            //Bind beforeSubmit event to do stuff with tinymce
            $(this.refs.textarea).closest('form').bind('beforeSubmit', function () {
                for (var i in tinymce.editors) {
                    try {
                        tinymce.editors[i].save();
                    } catch (e) {
                    }
                }
            });

        },
        componentWillUnmount: function () {
            tinymce.remove('#' + this.getIdentifier());
        },
        render: function () {
            var attributes = this.props.item.getAttributes();

            var uploader = "";
            if(this.props.item.getHasUploader()) {
                uploader = (
                    <span className={"tinymce-uploader-" + this.getInstanceId()} style={{display: 'none'}}>
                        {FileSelect({
                            item: this.props.item,
                            name: "tinymce-uploader",
                            target: this.props.item.getUploadTarget(),
                            handleUploaderChange: this.handleUploaderChange.bind(this)
                        })}
                    </span>
                );
            }

            Object.merge(attributes, {
                id: this.getIdentifier(),
                type: 'textarea',
                ref: 'textarea',
                className: 'tinymce-editor'
            });

            return (
                <div>
                    {Label({item: this.props.item, name: this.props.item.getLabel()})}
                    {React.DOM.textarea(attributes, this.props.item.getValue())}
                    {uploader}
                </div>
            );
        }
    });

});
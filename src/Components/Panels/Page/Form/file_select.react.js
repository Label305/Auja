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

    var File = React.createClass({
        handleDeleteFile: function () {
            this.props.deleteFileWithRef(this.props.file.ref);
        },
        render: function () {
            var failed = '';
            if (this.props.file != null && this.props.file.failed) {
                failed = <span className="auja-color-alert">failed </span>;
            }
            return <li>
                {this.props.file.name + " "}
                {failed}
                <a onClick={this.handleDeleteFile}>delete</a>
            </li>;
        }
    });

    return React.createClass({
        failedRefId: 0,
        getInitialState: function () {
            return {
                files: this.props.item.getFiles()
            }
        },
        addFailedFile: function (data) {
            this.state.files.push({
                "ref": "failed_" + ++this.failedRefId,
                "failed": true,
                "name": data.files[0].name
            });
            this.setState(this.state);
        }, componentDidMount: function () {
            //Dynamically add the element since we don't want to have React to bind its events to it
            var uploadElem = $('<input type="file" name="file" data-name="file" />');
            
            if (this.props.item.isMultiple()) {
                uploadElem = $('<input multiple="multiple" type="file" name="file" data-name="file" />');
            }
            var node = $(this.refs.file.getDOMNode()).append(uploadElem);

            node.fileupload({
                url: this.props.item.getTarget(),

                /**
                 * Starting an upload
                 * @param e
                 * @param data
                 */
                send: function (e, data) {
                    if (!this.props.item.isMultiple()) {
                        this.state.files = [];
                        this.setState(this.state);
                    }
                }.bind(this),

                /**
                 * Success
                 * @param e
                 * @param data
                 */
                done: function (e, data) {
                    if (data.result.type == 'file') {
                        this.state.files.push(data.result.file);
                        this.setState(this.state);
                    } else if (data.files[0].name) {
                        this.addFailedFile(data);
                    }
                }.bind(this),

                /**
                 * Failed
                 * @param e
                 * @param data
                 */
                fail: function (e, data) {
                    if (data.files[0].name) {
                        this.addFailedFile(data);
                    }
                }.bind(this)
            });
        },
        /**
         * Hidden input that is submitted
         * @returns {Array}
         */
        getHiddenInput: function () {
            var hidden = [];
            for (var i in this.state.files) {
                if (this.state.files[i] != null && !this.state.files[i].failed) {
                    if (this.props.item.isMultiple) {
                        hidden.push(<input key={this.state.files[i].ref} type="hidden" name={this.props.item.getName()} value={this.state.files[i].ref} />);
                    } else {
                        hidden = [
                            <input key={this.state.files[i].ref} type="hidden" name={this.props.item.getName()} value={this.state.files[i].ref} />
                        ];
                    }
                }
            }
            return hidden;
        },
        deleteFileWithRef: function (ref) {
            this.state.files = this.state.files.remove(function (file) {
                return file.ref == ref;
            });
            this.setState(this.state);
        },
        getFiles: function () {
            return this.state.files.map(function (file) {
                return <File deleteFileWithRef={this.deleteFileWithRef} file={file} />;
            }.bind(this));
        }, render: function () {
            var hidden = this.getHiddenInput();
            var files = this.getFiles();

            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                    <span ref="file"></span>
                    <ul>{files}</ul>
                    {hidden}
                </div>
            );
        }
    });

});
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

import React from 'react';
import Label from './label.jsx';
import tinymce from '../../../../../bower_components/tinymce/tinymce.jquery.js';

module.exports = React.createClass({

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
    componentDidMount: function () {

        // Tell tinyMCE that the dom has already loaded since it wasn't there when
        // the event triggered
        tinymce.dom.Event.domLoaded = true;

        //Actually initialize the editor
        tinymce.init({
            selector: '#' + this.getIdentifier(),
            theme: "modern",
            schema: "html5",
            height: 300,
            content_style: "img{max-width: 100%; display: block;}",
            plugins: [
                "advlist autolink link image lists charmap preview",
                "searchreplace visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                "save table contextmenu directionality textcolor"
            ],
            toolbar: "styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview"
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

        Object.merge(attributes, {
            id: this.getIdentifier(),
            type: 'textarea',
            ref: 'textarea',
            className: 'tinymce-editor'
        });

        return (
            React.DOM.div(null,
                Label({item: this.props.item, name: this.props.item.getLabel()}),
                React.DOM.textarea(attributes, this.props.item.getValue())
            )
        );
    }
});


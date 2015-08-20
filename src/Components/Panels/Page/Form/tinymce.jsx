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
import uuid from 'uuid';

module.exports = React.createClass({
    componentWillMount: function () {
        if (!this.tinyMCEAvailable()) {
            console.error('Include TinyMCE manually before using it in Auja');
        }
    },
    componentDidMount: function () {
        if (!this.tinyMCEAvailable()) {
            return;
        }
        // Tell tinyMCE that the dom has already loaded since it wasn't there when
        // the event triggered
        tinymce.dom.Event.domLoaded = true;

        //Actually initialize the editor
        tinymce.init(this.config());

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
        if (!this.tinyMCEAvailable()) {
            return;
        }
        tinymce.remove('#' + this.getIdentifier());
    },
    tinyMCEAvailable() {
        return typeof tinymce != 'undefined';
    },
    getInstanceId: function () {
        if (!this.instanceId) {
            this.instanceId = uuid.v4();
        }
        return this.instanceId;
    },
    getIdentifier: function () {
        return 'tinymce-editor-' + this.getInstanceId();
    },
    config() {
        return {
            selector: '#' + this.getIdentifier(),
            theme: "modern",
            schema: "html5",
            height: 300,
            content_style: "img{max-width: 100%; display: block;}",
            plugins: [
                "advlist autolink link image lists charmap preview",
                "searchreplace visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                "contextmenu directionality textcolor"
            ],
            toolbar: "styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview"
        };
    },
    render: function () {

        var attributes = this.props.item.getAttributes();

        Object.merge(attributes, {
            id: this.getIdentifier(),
            type: 'textarea',
            ref: 'textarea',
            className: 'tinymce-editor'
        });

        return React.DOM.div(null,
            Label({item: this.props.item, name: this.props.item.getLabel()}),
            React.DOM.textarea(attributes, this.props.item.getValue())
        );
    }
});


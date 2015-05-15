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
define(['react', 'build/Components/Panels/Page/Form/label.react', 'wysihtml', 'wysihtml5ParserRules'], function(React, Label, wysihtml, wysihtml5ParserRules) {
    return React.createClass({
        componentDidMount: function() {

            $(this.refs.wysihtmlEditor.getDOMNode()).wysihtml.Editor(this.props.itemId, {
                toolbar: 'wysihtml-toolbar',
                parserRules:  wysihtml5ParserRules
            });
        },
        render: function() {
            var attributes = this.props.item.getAttributes();

            Object.merge(attributes, {
                id: this.props.itemId,
                type: 'textarea',
                ref: 'wysihtmlEditor',
                className: 'wysihtml-editor'
            });

            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                    <div className="wysihtml-toolbar"></div>
                    {React.DOM.textarea(attributes, this.props.item.getValue())}
                </div>
            );
        }
    });

});
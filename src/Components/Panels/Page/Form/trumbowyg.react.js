/**
 * A trumbowyg RTE, properties:
 *
 * - label
 * - name
 * - value will be entered as value
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define(['react', 'build/Components/Panels/Page/Form/label.react', 'trumbowyg'], function(React, Label) {
    return React.createClass({
        componentDidMount: function() {
            var btnsGrps = {
                design: this.props.item.getButtons()
            };            
            
            $(this.refs.textareaTrumbo.getDOMNode()).trumbowyg({
                btns: this.props.item.getButtons(),
                btnsGrps: btnsGrps
            });
        },
        render: function() {
            var attributes = this.props.item.getAttributes();
            
            Object.merge(attributes, {
                id: this.props.itemId,
                type: 'textarea',
                ref: 'textareaTrumbo'
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
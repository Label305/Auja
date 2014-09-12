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
define(['build/Components/Panels/Page/Form/label.react', 'trumbowyg'], function(Label) {
    return React.createClass({
        componentDidMount: function() {
            //Set default buttons
            var btns = ['header', 'bold', 'italic', '|', 'unorderedList', 'orderedList', '|', 'insertImage', 'link', '|', 'viewHTML', 'fullscreen'];
            if(this.props.item.trumbowyg.btns) {
                btns = this.props.item.trumbowyg.btns;
            }
            var btnsGrps = {design:btns};            
            
            $(this.refs.textarea.getDOMNode()).trumbowyg({
                btns: btns,
                btnsGrps: btnsGrps
            });
        },
        render: function() {
            var attributes = Object.clone(this.props.item.trumbowyg);
            
            //Remove otherwise engaged attributes
            delete attributes.label;
            delete attributes.value;
            
            Object.merge(attributes, {
                id: this.props.itemId,
                type: 'text',
                ref: 'textarea'
            });
            
            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.trumbowyg.label} />
                    {React.DOM.textarea(attributes, this.props.item.value ? this.props.item.value : '')}
                </div>
                );
        }
    });

});
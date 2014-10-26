/**
 * A mixin that enables the resource to paginate, expects:
 * 
 * - Property item, with method `getPaging`
 * - Property panel
 *
 * @jsx React.DOM
 */
define([], function () {

    return {
        pagingThreshHold: 300,
        componentDidMount: function() {
            flux.actions.extendResource(this.props.panel, this.props.item);
        },
        componentDidUpdate: function () {
            if (this.props.item.getPaging() && this.props.item.getPaging().next && this.needsExtending()) {
                flux.actions.extendResource(this.props.panel, this.props.item);
            }
        },
        needsExtending: function () {
            var node = $('#' + this.props.panel.getId()).find('div:first');
            var ch = node.height(),
                st = node.scrollTop(),
                sh = node[0].scrollHeight;

            return sh - st - ch < this.pagingThreshHold;
        }
    }

});
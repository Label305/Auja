/**
 * A mixin that enables the resource to paginate
 *
 * @jsx React.DOM
 */
define([], function() {
   
    return {
        pagingThreshHold: 300,
        componentDidUpdate: function() {
            if(this.state.paging.next && this.needsExtending()) {     
               flux.actions.extendResource(this.state.item);
            }         
        },
        needsExtending: function() {
            var node = $('#' + this.props.panel.id).find('div:first');
            var ch = node.height(),
                st = node.scrollTop(),
                sh = node[0].scrollHeight;
                       
            return sh-st-ch < this.pagingThreshHold;
        }
    }
    
});
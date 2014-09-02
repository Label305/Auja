/**
 * A page panel
 *
 * @jsx React.DOM
 */

//Listing of all supported page items
var PageItems = {
    'header': 'build/Components/Panels/Page/header.react.js',
    'form': 'build/Components/Panels/Page/form.react.js'
};

//Map as an array to load panel dependencies
define($.map(PageItems, function(value) { return value; }), function() {
    return React.createClass({
        render: function() {

            //Order the items in the page as they are defined
            this.props.panel.page = this.props.panel.page.sort(function(a, b) {
                if(a.order && b.order) {
                    return a.order > b.order ? 1 : -1;
                }
                return 0;
            });

            //Combine page items together to form a single list
            var page = this.props.panel.page.map(function(item) {
                if(!PageItems[item.type]) {
                    console.error("Unsupported page item type requested: " + item.type);
                    return;
                }
                var Item = require(PageItems[item.type]);
                return ( 
                    <div class="row">
                        <Item panel={this.props.panel} item={item} />
                    </div>
                    );
            }.bind(this));

            return (
                <div>
                    {page}
                </div>
                );
        }
    });

});
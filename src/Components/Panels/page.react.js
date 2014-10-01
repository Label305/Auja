/**
 * A page panel
 *
 * @jsx React.DOM
 */

//Listing of all supported page items
var PageItems = {
    'header': 'build/Components/Panels/Page/header.react',
    'form': 'build/Components/Panels/Page/form.react'
};

//Map as an array to load panel dependencies
define([
    'build/Components/Panels/Page/header.react',
    'build/Components/Panels/Page/form.react'
], function () {

    return React.createClass({
        render: function () {

            //Combine page items together to form a single list
            var page = this.props.panel.getContent().map(function (item) {
                if (!item) {
                    console.error('Undefined item passed, did you create an object for it?');
                    return;
                } else if (!PageItems[item.getType()]) {
                    console.error("Unsupported page item type requested: " + item.getType());
                    return;
                }
                var Item = require(PageItems[item.getType()]);
                return (
                    <div class="row">
                        <Item message={this.props.message} panel={this.props.panel} item={item} />
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
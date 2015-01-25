/**
 * A resource menu item, properties:
 *
 * - target
 *
 * @jsx React.DOM
 */

define([
    'react', 
    'build/Components/Panels/Menu/Mixins/paging.mixin', 
    'build/Components/Panels/Menu/Mixins/searchable.mixin', 
    'build/Objects/menu', 
    'build/Components/Panels/Menu/sortable.react'], function (React, Paging, Searchable, Menu, SortableMenu) {

    return React.createClass({
        mixins: [Paging, Searchable],
        render: function () {
            if (this.props.item.hasProperty('sortable')) {
                //"Sortable" menu
                return (
                    <li className="menu-item-resource">
                        <SortableMenu item={this.props.item} originPanel={this.props.panel} />
                    </li>
                );
            } else {
                //"Normal" item
                var MenuPanel = require('build/Components/Panels/menu.react');

                //Transfer different props to mock Menu
                var panel = new Menu();
                panel.setOrigin(this.props.panel.getOrigin());
                panel.setItems(this.props.item.getItems());

                return (
                    <li className="menu-item-resource">
                        {this.getSearchableForm()}
                        <MenuPanel panel={panel} originPanel={this.props.panel} />
                    </li>
                );
            }
        }
    });

});
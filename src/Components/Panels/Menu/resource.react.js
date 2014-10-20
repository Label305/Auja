/**
 * A resource menu item, properties:
 *
 * - target
 *
 * @jsx React.DOM
 */

define(['build/Components/Panels/Menu/Mixins/paging.mixin', 'build/Components/Panels/Menu/Mixins/searchable.mixin', 'build/Objects/menu'], function (Paging, Searchable, Menu) {

    return React.createClass({
        mixins: [Paging, Searchable],
        render: function () {
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
    });

});
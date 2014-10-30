/**
 * @jsx React.DOM
 */
 
define(['jstree'], function() {
    
    return React.createClass({
        /**
         * Check if a is a parent of b
         * @param a
         * @param b
         * @return boolean
         */
        isParentOf: function(a, b) {
            return a.getLeft() < b.getLeft() && a.getRight() > b.getRight();
        },

        /**
         * Check if child of parent
         * @param child
         * @param parent
         * @return boolean
         */
        isChildOf: function(child, parent) {
            return child.getLeft() > parent.getLeft() && child.getRight() < parent.getRight();
        },

        /**
         * Get all parents of an item
         * @param item
         */
        getParents: function(item) {
            return this.props.item.getItems().filter(function(parent) {
                return this.isParentOf(parent, item);
            }.bind(this));
        },

        /**
         * Check if the parent is a direct parent of the child
         * @param parent
         * @param child
         * @return boolean
         */
        isDirectParentOf: function(parent, child) {
            var allParentsOfChild = this.getParents(child);
                        
            //Check if one of the parents is a child of the to be checked parent
            for(var i in allParentsOfChild) {
                if(this.isChildOf(allParentsOfChild[i], parent)) {
                    return false;
                }
            }
            return true;
        },
        
        /**
         * Check if the item has a parent
         * @param check
         */
        hasParent: function(check) {
            return 0 != this.props.item.getItems().count(function(item) {
                    return this.isParentOf(item, check);
                }.bind(this));
        },

        /**
         * Get all children of a parent
         * @return Array
         */
        getChildren: function(parent) {
            return this.props.item.getItems().filter(function(child) {
                return this.isChildOf(child, parent);
            }.bind(this));
        },

        /**
         * Get direct children of an item
         * @param parent
         * @return Array
         */
        getDirectChildren: function(parent) {
            return this.props.item.getItems().filter(function(child) {
                return this.isChildOf(child, parent) && this.isDirectParentOf(parent, child);
            }.bind(this));
        },

        /**
         * Add children recursively
         * @param items
         * @return Array
         */
        addChildren: function(items) {
            return items.map(function(item) {
                item.children = this.getDirectChildren(item);
                item.children = this.addChildren(item.children);
                return item;
            }.bind(this));
        },

        /**
         * Simplifies nested SortableItem objecrt to something much flatter
         * @param tree
         */
        simplifyForJsTree: function(tree) {
            var result = [];
            
            for(var i in tree) {
                result.push({
                    text: tree[i].getText(),
                    state: {
                        opened: true
                    },
                    children: this.simplifyForJsTree(tree[i].children)
                });
            }
            
            return result;
        },
        
        /**
         * Transform to the way JsTree want the tree
         */
        getJsTree: function() {
            //Fetch all items without any parent
            var items = this.props.item.getItems();
            var tree = items.filter(function(item) {
                return !this.hasParent(item);
            }.bind(this));
            
            //Add children
            tree = this.addChildren(tree);
            
            //Simplify so that jsTree will like it
            tree = this.simplifyForJsTree(tree);
            
            return tree;
        },
        componentDidUpdate: function() {
            //Draw the tree if we're not initialized and we have received our items 
            if(!this.initialized && this.props.item.getItems().length > 0) {
                this.initialized = true;
                
                $(this.refs.tree.getDOMNode()).jstree({
                    core: {
                        data: this.getJsTree()
                    } 
                });                
            }  
        },
        render: function() {
            return (
                <div ref="tree"></div>  
            );
        } 
    });
    
});

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
         * @param root
         */
        simplifyForJsTree: function(tree, root) {
            var result = [];
            
            for(var i in tree) {
                result.push({
                    type: root ? 'root' : 'child',
                    text: tree[i].getText(),
                    data: {
                        id: tree[i].getId()
                    },
                    state: {
                        opened: true
                    },
                    children: this.simplifyForJsTree(tree[i].children, false)
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
            tree = this.simplifyForJsTree(tree, true);
            
            return tree;
        },

        /**
         * Will parse the actual tree
         * @param tree
         * @param nextLeft
         */
        parseTree: function(tree, nextLeft) {
            var result = [];
            
            for(var i in tree) {
                //Get children
                var children = this.parseTree(tree[i].children, nextLeft+1);
                
                //Next right is current left +1 or the topmost child +1
                var nextRight = nextLeft+1;
                if(children.length > 0) {
                    nextRight = children.max(function(child) {
                        return child.right;
                    }).right+1;
                }
                
                //Add current item to the result
                result.push({
                    id: tree[i].data.id,
                    left: nextLeft,
                    right: nextRight                    
                });
                
                result = result.union(children);
                
                nextLeft = nextRight+1;
            }
            
            return result;            
        },
        
        /**
         * Will normalize the tree from jsTree and dispatch the change
         * @param tree
         */
        treeChanged: function(tree) {
            var parse = this.parseTree(tree, 1);
            
            //TODO: dispatch to flux
            console.log(tree);
            console.log(parse);
        },
        
        componentDidUpdate: function() {
            //Draw the tree if we're not initialized and we have received our items 
            if(!this.initialized && this.props.item.getItems().length > 0) {
                this.initialized = true;

                //Listen for some event
                $(document).on('dnd_stop.vakata', function (e, data) {
                    var tree = $(this.refs.tree.getDOMNode()).jstree(true).get_json('#', {});
                    this.treeChanged(tree);
                }.bind(this));
                
                $(this.refs.tree.getDOMNode())
                    
                    //Initialize the tree
                    .jstree({
                        core: {
                            //Parse and set data
                            data: this.getJsTree(),
                            
                            //Make sure something updates when we drag
                            check_callback : true,
                            
                            //More fancy more better
                            animation : 1,
                            
                            //No selection
                            multiple: false
                        },
                        plugins: [
                            //That is, drag 'n drop
                            "dnd"
                        ],
                        types: {
                            root: {
                                max_depth: 4
                            }
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

/**
 * @jsx React.DOM
 */

define(['react', 'jstree'], function (React) {

    return React.createClass({
        /**
         * Check if a is a parent of b
         * @param a
         * @param b
         * @return boolean
         */
        isParentOf: function (a, b) {
            return a.getLeft() < b.getLeft() && a.getRight() > b.getRight();
        },

        /**
         * Check if child of parent
         * @param child
         * @param parent
         * @return boolean
         */
        isChildOf: function (child, parent) {
            return child.getLeft() > parent.getLeft() && child.getRight() < parent.getRight();
        },

        /**
         * Get all parents of an item
         * @param items
         * @param item
         */
        getParents: function (items, item) {
            return items.filter(function (parent) {
                return this.isParentOf(parent, item);
            }.bind(this));
        },

        /**
         * Check if the parent is a direct parent of the child
         * @param items
         * @param parent
         * @param child
         * @return boolean
         */
        isDirectParentOf: function (items, parent, child) {
            var allParentsOfChild = this.getParents(items, child);

            //Check if one of the parents is a child of the to be checked parent
            for (var i in allParentsOfChild) {
                if (this.isChildOf(allParentsOfChild[i], parent)) {
                    return false;
                }
            }
            return true;
        },

        /**
         * Check if the item has a parent
         * @param items
         * @param check
         */
        hasParent: function (items, check) {
            return 0 != items.count(function (item) {
                    return this.isParentOf(item, check);
                }.bind(this));
        },

        /**
         * Get direct children of an item
         * @param items
         * @param parent
         * @return Array
         */
        getDirectChildren: function (items, parent) {
            return items.filter(function (child) {
                return this.isChildOf(child, parent) && this.isDirectParentOf(items, parent, child);
            }.bind(this)).sortBy(function (n) {
                return n.left;
            });
        },

        /**
         * Add children recursively
         * @param all
         * @param items
         * @return Array
         */
        addChildren: function (all, items) {
            return items.map(function (item) {
                item.children = this.getDirectChildren(all, item);
                item.children = this.addChildren(all, item.children);
                return item;
            }.bind(this));
        },

        /**
         * Simplifies nested SortableItem object to something much flatter
         * @param tree
         * @param root
         */
        simplifyForJsTree: function (tree, root) {
            var result = [];

            for (var i in tree) {
                result.push({
                    type: root ? 'root' : 'child',
                    text: tree[i].getText(),
                    data: {
                        id: tree[i].getId(),
                        left: tree[i].getLeft(),
                        right: tree[i].getRight(),
                        text: tree[i].getText(),
                        target: tree[i].getTarget()
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
         * Get the simplified tree
         */
        simplifiedTree: function (items) {
            //Fetch all items without any parent
            var tree = items.filter(function (item) {
                return !this.hasParent(items, item);
            }.bind(this)).sortBy(function (n) {
                return n.left;
            });

            //Add children
            tree = this.addChildren(items, tree);

            //Simplify so that jsTree will like it
            return this.simplifyForJsTree(tree, true);
        },

        /**
         * Transform to the way JsTree want the tree
         */
        getJsTree: function (obj, cb) {
            var tree = this.simplifiedTree(this.props.item.getItems());

            cb.call(this, tree);
        },

        /**
         * Will parse the actual tree
         * @param tree
         * @param nextLeft
         */
        parseTree: function (tree, nextLeft) {
            var result = [];

            for (var i in tree) {
                //Get children
                var children = this.parseTree(tree[i].children, nextLeft + 1);

                //Next right is current left +1 or the topmost child +1
                var nextRight = nextLeft + 1;
                if (children.length > 0) {
                    nextRight = children.max(function (child) {
                        return child.right;
                    }).right + 1;
                }

                //Add current item to the result
                result.push({
                    id: tree[i].data.id,
                    text: tree[i].data.text,
                    left: nextLeft,
                    right: nextRight
                });

                result = result.union(children);

                nextLeft = nextRight + 1;
            }

            return result;
        },

        /**
         * Will normalize the tree from jsTree and dispatch the change
         * @param tree
         */
        treeChanged: function (tree) {
            var parsed = this.parseTree(tree, 1);
            flux.actions.submit(this.props.item.getProperty('sortable').getTarget(), 'post', {tree: parsed});
        },

        /**
         * Triggered when a node if focused
         * @param id
         */
        onNodeFocus: function (id) {
            var item = this.props.item.getItems().find(function (item) {
                return item.getId() == id;
            });

            flux.actions.click(item.getTarget(), this.props.originPanel);
        },

        /**
         * Listen for the tree to change
         */
        componentDidMount: function () {
            $(document).on('dnd_stop.vakata', function (e, data) {
                if (this.refs.tree) {
                    var tree = $(this.refs.tree.getDOMNode()).jstree(true).get_json('#', {});
                    this.treeChanged(tree);
                }
            }.bind(this));

            //Check if focused, if so dispatch click and try to unfocus
            $(this.refs.tree.getDOMNode())
                .on('select_node.jstree', function (e, data) {
                    this.onNodeFocus(data.node.data.id);
                    $(this.refs.tree.getDOMNode()).jstree('deselect_node', data.node);
                }.bind(this))
        },

        /**
         * Check if the component should update
         * nextProps.item will always equal this.props.item since it is a pointer
         * to an object, so we cannot compare the two
         */
        shouldComponentUpdate: function (nextProps, nextState) {
            if (!this.initialized) {
                return true;
            }

            //Get what the tree looks like in the dom
            var domTree = $(this.refs.tree.getDOMNode()).jstree(true).get_json('#', {});
            domTree = this.parseTree(domTree, 1);

            //Check if the items in the next version correspond to items in the dom
            var count = nextProps.item.getItems().count(function (item) {
                return !domTree.none(function (domItem) {
                    return item.getId() == domItem.id
                        && item.getLeft() == domItem.left
                        && item.getRight() == domItem.right
                        && item.getText() == domItem.text
                });
            });

            return count != nextProps.item.getItems().length;
        },

        componentDidUpdate: function () {
            if (!this.initialized) {
                this.initialized = true;

                $(this.refs.tree.getDOMNode())

                    //Initialize the tree
                    .jstree({
                        core: {
                            //Parse and set data
                            data: this.getJsTree,

                            //Make sure something updates when we drag
                            check_callback: true,

                            //More fancy more better
                            animation: 1,

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
            } else {
                $(this.refs.tree.getDOMNode()).jstree('refresh');
            }
        },
        render: function () {
            return (
                <div ref="tree"></div>
            );
        }
    });

});

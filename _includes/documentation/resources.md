<h3 id="resources">Resources</h3>

The more advanced menu item, the whole idea behind Auja is that your users can quickly navigate through the admin interface.
So requests that serve a database response should be done after the initial menu is loaded. This is where the resource menu item comes into play.

In the `paging` mixin you'll find that after the `resource` menu item was mounted inside the dom a request will be triggered to fetch the first
page of `items`. This means that you'll see, for example, an add button before we've finished loading all kinds of data from the server.

	{
        "type": "resource",
        "order": 4,
        "resource": {
            "target": "example/clubs_index.json",
            "properties": {
                "searchable": {
                    "target": "example/club_index.json?q=%s"
                }
            }
        }
    }

target | `string` | Endpoint where the items can be fetched
properties | `Object` | Different properties active on this object, more about those after the break

####Resource - items

When a resource is mounted we can render all of the menu items inside the resource item. A request to the target should return the items as shown below.

Together with an, optional, `paging` object, that will point towards the next resource to make infinite scroll possible, as well as the total amount of items
up to that request. The `total` key will be used when updating the entire view. For example, when you edit an entry inside a form, you want to update it elsewhere in a
menu on the left.

	{
	    "type": "items",
	    "items": [
			/* The menu items */
	    ],
	    "paging": {
	        "next": "example/clubs_index.json?page=2",
	        "total": "example/clubs_index.json?from=0&till=1000"
	    }
	}

####Resource - properties

To be able to add special functionalities to a resource we can add properties. These include `searchable` and `sortable`.
<h3 id="sortable" class="anchor">Sortable</h3>
A resource can be sortable. Sortable will create a tree from the resource, note that you cannot paginate a sortable resource. Also, when items are loaded from
the server these should all be `sortable_item` objects.

	"properties": {
	    "sortable": {
			"target": "somewhere/to/save/the/order"
	    }
	}

target | `string` | url where the new ordering is posted to

####Sortable - sortable_item

When the tree changes the new tree will be submitted to the server, all entries will have, at least, three keys `id`, `left` and `right`.
Which are represented as a nested set. An item within a sortable resource looks like this.

	{
	    "type": "sortable_item",
	    "sortable_item": {
	        "id": 4,
	        "text": "Contact",
	        "target": "example/pages/4/edit",
	        "left": 7,
	        "right": 12
	    }
	}

id | `string` |
text | `string` | Inside the element
target | `string` | To do a GET request to (similiar to `Link`)
left | `integer` | Left value of nested set
right | `integer` | Right value of nested set
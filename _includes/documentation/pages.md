<h3 id="pages" class="anchor">Pages</h3>
These are the wider panes where the content is presented and can be edited.

A page is a panel which can contain page items.

	{
	    "type": "page",
	    "page": [
			/* The page items */
	    ]
	}


####Page item

Every type of page item should implement this `Abstract`

order | `integer` | Where in the page should this item show up
type | `string` | Which type of page item should be rendered

####Header

A header is commonly used page item at the top of a page

	{
	    "type": "header",
	    "header": {
	        "text": "Edit club"
	    }
	}

text | `string` | Text it can contain

####Form

The place with which your user interacts. It even has its own chapter, called `Forms`. As usual it again is wrapped in its own namespace

	{
	    "type": "form",
	    "form": [
			/* The form items */
	    ]
	}
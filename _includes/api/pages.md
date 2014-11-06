These are the wider panes where the content is presented and can be edited.

**Page**

A page is a panel which can contain page items.

	{
	    "type": "page",
	    "page": [
			/* The page items */
	    ]
	}


**`Abstract` Page item**

Every type of page item should implement this abstract

order | `integer` | Where in the page should this item show up
type | `string` | Which type of page item should be rendered

**Header**

Header commonly used at the top of a page

text | `string` | Text it can contain

	{
	    "type": "header",
	    "header": {
	        "text": "Edit club"
	    }
	}

**Form**

The place with which your user interacts. It even has its own chapter, called `Forms`. As usual it again is wrapped in its own namespace

	{
	    "type": "form",
	    "form": [
			/* The form items */
	    ]
	}
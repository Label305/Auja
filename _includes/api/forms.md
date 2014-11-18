There are all kinds of form items, you can find them all below.

Some have no specification, that implies that they only implement the abstract form item.

**`Abstract` Form item**

Every form item should implement this abstract

order | `integer` | Where in the form should this item show up
type | `string` | The item type
name | `string` | Name attribute of an input
label | `string` | Label to show with the input
value | `string` | Current value
required | `boolean` | If it is required to fill in (not always actually, e.g. a checkbox is an exception)

**Checkbox**

Checkbox will be rendered as a combination of a `hidden` input with value `0` and a checkbox with value `1` both 
having the same name. Meaning you'll always get your data.

checked | `boolean`

**Date**

Date input

	{
	    "type": "date",
	    "date": {
	    	"name": "date",
	        "value": "2014-11-06"
	    }
	}

**E-mail**

Email input

	{
	    "type": "email",
	    "email": {
	    	"name": "email",
	        "value": "joris@label305.com"
	    }
	}

**Header**

Header

text | `string` | Text it can contain

	{
	    "type": "header",
	    "header": {
	        "text": "Edit club"
	    }
	}

**Integer**

Integer input

	{
	    "type": "integer",
	    "integer": {
	    	"name": "integer",
	        "value": 12
	    }
	}

**Number**

Number input, with decimals

	{
	    "type": "number",
	    "number": {
	    	"name": "number",
	        "value": 0.2
	    }
	}

**Password**

Password input

	{
	    "type": "password",
	    "password": {
	    	"name": "password",
	        "value": "Super secret"
	    }
	}

**Range**

Range input

min | `integer` | Minimal value
max | `integer | Maximum value

	{
	    "type": "range",
	    "range": {
	    	"name": "range",
	        "value": 15,
	        "min": 10,
	        "max": 15
	    }
	}

**Select**

Dropdown input

options | `integer 

	{
	    "type": "options",
	    "options": {
	    	"name": "options",
	        "value": "b",
	        "options": {
	        	{
	        		"label": "Answer A",
	        		"value": "a"
	        	},
	        	{
	        		"label": "Answer B",
	        		"value": "b"
	        	}
	        }
	    }
	}

**Submit**

Submit button

	{
		"type": "submit",
		"submit": {
			"name": "Update"
		}
	}

**Tel**

Telephone number

	{
	    "type": "tel",
	    "tel": {
	    	"name": "telephone",
	        "value": "+31537113499"
	    }
	}

**Text**

Text input

	{
	    "type": "text",
	    "text": {
	    	"name": "text",
	        "value": "Your short story"
	    }
	}

**Textarea**

Textarea number

	{
	    "type": "textarea",
	    "textarea": {
	    	"name": "text",
	        "value": "Your long story"
	    }
	}

**Trumbowyg**

Rich text editor [Trubmowyg](http://alex-d.github.io/Trumbowyg/)

buttons | `array` | Otional, head over to their ["Button pane" doc](http://alex-d.github.io/Trumbowyg/documentation.html)

	{
	    "type": "trumbowyg",
	    "trumbowyg": {
	    	"name": "textarea",
	        "value": "Your long story",
	        "buttons": ["header", "bold", "italic"]
	    }
	}

**Url**

Url input

	{
	    "type": "url",
	    "url": {
	    	"name": "website",
	        "value": "http://label305.github.io/Auja/"
	    }
	}


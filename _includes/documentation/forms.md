<h3 id="forms" class="anchor">Forms</h3>
There are all kinds of form items, you can find them all below. Some have no specification, that implies that they only implement the abstract form item.

####Form item

Every form item should implement this `Abstract`

order | `integer` | Where in the form should this item show up
type | `string` | The item type
name | `string` | Name attribute of an input
label | `string` | Label to show with the input
value | `string` | Current value
required | `boolean` | If it is required to fill in (not always actually, e.g. a checkbox is an exception)

####Checkbox

A checkbox will be rendered as a combination of a `hidden` input with value `0` and a checkbox with value `1` both
having the same name. Meaning you'll always get your data.

checked | `boolean`

####Date

A Date input looks like this.

	{
	    "type": "date",
	    "date": {
	    	"name": "date",
	        "value": "2014-11-06"
	    }
	}

####E-mail

An email input looks like this.

	{
	    "type": "email",
	    "email": {
	    	"name": "email",
	        "value": "joris@label305.com"
	    }
	}

####Integer

an integer input looks like this.

	{
	    "type": "integer",
	    "integer": {
	    	"name": "integer",
	        "value": 12
	    }
	}

####Number

A number input, with decimals looks like this.

	{
	    "type": "number",
	    "number": {
	    	"name": "number",
	        "value": 0.2
	    }
	}

####Password

A password input looks like this.

	{
	    "type": "password",
	    "password": {
	    	"name": "password",
	        "value": "Super secret"
	    }
	}

####Range

A range input looks like this.

	{
	    "type": "range",
	    "range": {
	    	"name": "range",
	        "value": 15,
	        "min": 10,
	        "max": 15
	    }
	}
With the addition of minimal and maximum values.

min | `integer` | Minimal value
max | `integer` | Maximum value

####Select

A select dropdown input looks like this.

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

####Submit

A submit button looks like this.

	{
		"type": "submit",
		"submit": {
			"name": "Update"
		}
	}

####Tel

A telephone number input looks like this.

	{
	    "type": "tel",
	    "tel": {
	    	"name": "telephone",
	        "value": "+31537113499"
	    }
	}

####Text

A plain text input looks like this.

	{
	    "type": "text",
	    "text": {
	    	"name": "text",
	        "value": "Your short story"
	    }
	}

####Textarea

A textarea input looks like this.

	{
	    "type": "textarea",
	    "textarea": {
	    	"name": "text",
	        "value": "Your long story"
	    }
	}

####Trumbowyg

The available rich text editor [Trubowyg](http://alex-d.github.io/Trumbowyg/) looks like this.

	{
	    "type": "trumbowyg",
	    "trumbowyg": {
	    	"name": "textarea",
	        "value": "Your long story",
	        "buttons": ["header", "bold", "italic"]
	    }
	}

Buttons are optional using this `Abstract`.

buttons | `array` | Optional, head over to their ["Button pane" doc](http://alex-d.github.io/Trumbowyg/documentation.html)

####Url

An url input looks like this.

	{
	    "type": "url",
	    "url": {
	    	"name": "website",
	        "value": "http://label305.github.io/Auja/"
	    }
	}



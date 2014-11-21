<h3 id="searchable" class="anchor">Searchable</h3>
A resource can be searchable. Searchable adds a searchbox to the top of the resource.

	"properties": {
	    "searchable": {
	        "target": "example/club_index.json?q=%s"
	    }
	}

target | `string` | url where the entered search term is merged with
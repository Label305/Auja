<h3 id="menus_links" class="anchor">Menus, links and spacers</h3>
The structure of Auja consists of panes, which are the small elements that provide an overview of different items present in your database.

####Menu

A menu object is nothing more than a panel containing all kinds of menu items

	{
	    "type": "menu",
	    "menu": [
			/* The menu items */
	    ]
	}

####Menu item with a link
A menu object contains all kinds of menu items, menu items are containing links which looks like this:

    {
        "type": "link",
        "order": 2,
        "link": {
            "text": "FC Twente (recursive)",
            "target": "example/clubs/menu",
            "icon": "ion-beer"
        }
    }

Every type of menu item should implement this `Abstract`

order | `integer` | Where in the menu should this item show up
type | `string` | Which type of menu item should be rendered

Every type of link should implement this `Abstract`

text | `string` | Text inside the link
target | `string` | Actual url of name of route to do `GET` request to
icon | `string` | Icon to show in front of the link

####Spacer

A spacer can added between lists and will show up colored so you can make clear that something else will follow

	{
        "type": "spacer",
        "order": 3,
        "spacer": {
            "text": "Clubs"
        }
    }

Every type of spacer should implement this `Abstract`

text | `string` | Text inside of the spacer
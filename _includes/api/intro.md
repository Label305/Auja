<p class="leading">
The entire interface is made up of a whole lot of different elements, of which menus and pages are the most obvious. However, every little thing inside has its own special object definition even the colors, start menu buttons and user name.
</p>

On this page you can find how to have these elements rendered inside the view. There are a few main parts which make up the interface, those are:

* Main config
* Menus and menu items
* Pages and page items (among which the form)
* Form items

### JSON representation

Since we support routing, which ables us to hook up to different api types, we can represent our object in all kinds of ways. But the most simplest, and currently only implemented way, of getting things up and running is by doing AJAX calls to endpoints that return JSON.

All JSON objects in our api's are wrapped in their own namespace with a `type` key that announces that presence of the namespace. For example:

```json
{
	"type": "form",
	"form": {
		/* A Form object */
	}
}
```

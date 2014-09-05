###Architecture
---

Auja is based on [React](http://facebook.github.io/react/index.html) using the [Flux architecture](http://facebook.github.io/react/docs/flux-overview.html) to manage
 dataflow and dispatching within the application. To ease implementation of this architecture we use [Fluxxor](http://fluxxor.com/).
 
In short, Flux constists of four main parts:

- (React) Views
- Action creators
- Dispatcher
- Stores
 
In that order the dataflow will commence, the user does something in the view. Triggers an action, which is dispatched to
certain stores. The stores will do process/store the newly received data and, if applicable, emit that they have changed. Now 
the React views, using Fluxxor, will be notified that the state has changed after which the view will re-render with all
React goodness.

###Requests and Routing
---

Executing a basic AJAX request can be done using the `Request` object, e.g.:

```javascript
var request = new Request(url);
request.get().done(function(response) {
    flux.actions.handle(response.type, response); 
});
```

The response will be handled by the aforementioned dispatcher which expects a valid panel or other kind of view-compatible response.
However, we want to be able to, for example, use a restful api as a datasource in combination with custom menu's. For this
the `RouteFactory` is used. The `RouteFactory` will find the corresponding request handler from the `Requests/Handlers` directory.

From the main Auja config an array of routes is parsed, and based on provided type the corresponding handler is returned, for example:

```json
{
	"routes": [
	    {
	        "type": "rest",
	        "resource": "clubs",
	        "endpoint": "clubs"
	    }
	]
}
```

Now, when a request is initialized with the url `/clubs/menu` this will be handled using the rest handler object. 
In other words, `new Request(url).get()` will return whatever the `get` method in `Requests/Handlers/rest.js` will return.

The ables us to combine a menu containing a listing of clubs accompanied by an add button and other elements. While these
were never explicitly defined, only "guessed" based on basic restful api rules. 

###React component structure
---

```
Scaffolding, listening to AujaStore (scaffolding.react.js)
├── Header (Components/Scaffolding/header.react.js)
└── Body (Components/Scaffolding/body.react.js)
	└── Menu  (Components/Scaffolding/menu.react.js)
    └── Panels, listening to PanelStore (Components/Scaffolding/panels.react.js)
        └── Menu (Components/Panels/menu.react.js)
```
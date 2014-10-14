Auja [![Build Status](https://travis-ci.org/Label305/Auja.svg?branch=dev)](https://travis-ci.org/Label305/Auja)
===

Auja is a back-end interface designed to be friendly on both sides, for the end-user as well as the developer.

In this repo you'll find the JavaScript source meant to be used together with a back-end implementation for your 
   preferred framework, whatever server side language you use. Current back-end implementations:
   
   - [Laravel](https://github.com/Label305/Auja-Laravel) ... coming soon
   - Your implementation here..!?
   
To ease up implementation of the communication protocol we provide a [toolkit](https://github.com/Label305/Auja-PHP) for PHP providing interfaces and
scaffolding

Installation
---

*Stand alone*

After cloning you will first have to install Auja's dependencies using [Bower](http://bower.io/) by running:

`bower install`

Now RequireJS, Fluxxor, React and other dependencies should have been downloaded to the `bower_components` directory and we can
continue to compile the JS using jsx. If you don't have jsx installed yet run: 

`npm install -g react-tools` 

After this you have to compile the jsx code into browser-readable JavaScript using jsx as follows:

`jsx src/ build/`

Now the `build` directory should have been filled and you can serve the `example/index.html` in the example directory with 
any web-server you want. For example, run `npm install -g http-server` and then run `http-server` from the repository root.
Now you can visit `http://localhost:8080/example` to view the Auja implementation

Architecture
---

Auja is based on [React](http://facebook.github.io/react/index.html) using the [Flux architecture](http://facebook.github.io/react/docs/flux-overview.html) to manage
 dataflow and dispatching within the application. To ease implementation of this architecture we use [Fluxxor](http://fluxxor.com/).
 
In short, Flux constists of four main parts:

- (React) Views
- Action creators
- Dispatcher
- Stores
 
This is also the order of the dataflow, starting with the user doing something in the view. This triggers an action, which is dispatched to certain stores. The stores will process/store the newly received data and, if applicable, emit that they have changed. Now the React views will be notified, through Fluxxor, that the state has changed after which the view will re-render with all React goodness.

Requests and Routing
---

Executing a basic AJAX request can be done using the `Request` object, e.g.:

```javascript
var request = new Request(url);
request.get().done(function(response) {
    flux.actions.handle(response.type, response); 
});
```

The response will be handled by the aforementioned dispatcher which expects a valid panel or other kind of view-compatible response.
However, we want to be able to, for example, use a RESTful API as a datasource in combination with custom menu's. For this
the `RouteFactory` is used. The `RouteFactory` will find the corresponding request handler from the `Requests/Handlers` directory.

The `dist` dir
---

To fill the `dist` directory manually install [r.js](https://github.com/jrburke/r.js/). After which you can create the
`auja.js` and `auja.min.js` files by running:

```
r.js -o build.js out=dist/auja.min.js
```

and

```
r.js -o build.js out=dist/auja.js optimize=none
```

React component structure
---

```
Scaffolding, listening to AujaStore (scaffolding.react.js)
├── Header (Components/Scaffolding/header.react.js)
└── Body (Components/Scaffolding/body.react.js)
	└── Menu  (Components/Scaffolding/menu.react.js)
    └── Panels, listening to PanelStore (Components/Scaffolding/panels.react.js)
        └── Menu (Components/Panels/menu.react.js)
```

License
---------
Copyright 2014 Label305 B.V.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Auja [![Build Status](https://magnum.travis-ci.com/Label305/Auja.svg?token=9SWtTh915DNJxYshmaTN&branch=dev)](https://magnum.travis-ci.com/Label305/Auja)
===

Auja is a back-end interface designed designed to be friendly on both sides, for the end-user as well as the programmer.

In this repo you'll find the JavaScript source meant to be used together with a back-end implementation for your 
   preferred framework, whatever server side language you use. Current back-end implementations:
   
   - [Laravel](https://github.com/Label305/Auja-Laravel) ... coming soon
   - Your implementation here..!?
   
To ease up implementation of the communication protocol we provide a [toolkit](https://github.com/Label305/Auja-Laravel) for PHP providing interfaces and
scaffolding

Installation
---

*Stand alone*

Load dependencies using [Bower](http://bower.io/) by running:

`bower install`

Now RequieJS, Fluxxor, React and other should have been downloaded to the `bower_components` directory and we can
continue to compile the JS. If you don't have jsx installed yet run: 

`npm install -g react-tools` 

After this you should compile the jsx code into browser readable JavaScript like:

`jsx src/ build/`

Now the `build` directory should have been filled and you can serve the `exmaple/index.html` in the example directory with 
any web-server you want. For example, run `npm install -g http-server` and then from the repository root run `http-server`
after which you can visit `http://localhost:8080/example` to view the Auja implementation

Architecture
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
-----

	Copyright 2014 Label305

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

Auja
=== 

[![Build Status](https://travis-ci.org/Label305/Auja.svg?branch=master)](https://travis-ci.org/Label305/Auja) [![Dependency Status](https://www.versioneye.com/user/projects/546de812810106aec70004b0/badge.svg?style=flat)](https://www.versioneye.com/user/projects/546de812810106aec70004b0) [![Dependency Status](https://www.versioneye.com/user/projects/546de81281010651060004bc/badge.svg?style=flat)](https://www.versioneye.com/user/projects/546de81281010651060004bc)

Auja is a generic admin interface, you can put atop any web application easily. It is designed to be friendly for both the end-user and the developer. It is designed to be framework and server-side-language independent so you can use it with your language and framework of choice.

![Auja basic image](https://label305.github.io/Auja/images/auja-animated.gif)

In this repo you'll find the JavaScript source meant to be used together with a back-end implementation for your 
   preferred framework, whatever server side language you use. Current back-end implementations:
   
   - [Laravel](https://github.com/Label305/Auja-Laravel)
   - [PHP](https://github.com/Label305/Auja-PHP)
   
To ease up implementation of the communication protocol we provide a [toolkit](https://github.com/Label305/Auja-PHP) for PHP providing interfaces and scaffolding.

Installation
---

### Bower (prefered)

You can use [Bower](http://bower.io/) to load Auja into your own project. Check [our special bower distribution repository](https://github.com/Label305/Auja-bower) for more on installing Auja through bower.

### Stand alone

After cloning you will first have to install Auja's dependencies using [Bower](http://bower.io/) by running:

`bower install`

For testing and maintenance we'll be using [npm](https://www.npmjs.org/) you can install those dependencies using:

`npm install`

Now RequireJS, Fluxxor, React and other dependencies should have been downloaded to the `bower_components` and `node_modules` directories and we can
continue to compile the JSX and SASS files. You can do this using [Grunt](http://gruntjs.com/). If you don't have Grunt
installed you can get your hands on the CLI with

`npm install -g grunt-cli`

To compile the files simply run `grunt` from the repository root.

Now the `build` directory should have been filled and you can serve the `example/index.html` in the example directory with 
any web-server you want. For example, run `npm install -g http-server` and then run `http-server` from the repository root.
Now you can visit `http://localhost:8080/example` to view the Auja implementation

*Running tests*

We're using [Karma](http://karma-runner.github.io/0.12/index.html) for spec testing our objects. For installation
and running refer to their [installation docs](http://karma-runner.github.io/0.12/intro/installation.html)

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

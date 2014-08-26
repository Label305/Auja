Auja
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

Now the `build` directory should have been filled and you can serve the `index.html` in the example directory with 
any web-server you want. For example, run `npm install -g http-server` and then from the example directory `http-server`
after which you can visit `http://localhost:8080` to view the Auja implementation

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
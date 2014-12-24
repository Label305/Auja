---
layout: getting_started
title: "Auja Docs"
---

Getting started
=====

- [Introduction](#introduction)
- [installation (stand alone)](#installation-stand-alone)
- [Develop](#develop)
- [Spec-testing](#spec-testing)

Introduction
-----
Within the [Auja Github repository](https://github.com/Label305/Auja), you will find the JavaScript source meant to be used together with a back-end implementation for your preferred framework.
To use Auja, a complete package is needed. For example, if you want to use Auja for a Laravel implementation, you will need a chain like this:

`Auja + Auja-Laravel + Laravel application`

So, Auja can be used with different back-end implementations as long as the implementation between Auja and the preferred framework exists.
At this moment, there is an implementation for [Laravel PHP](https://github.com/Label305/Auja-Laravel) in progress, but you can contribute and build your own implementation.

To ease up implementation of the communication protocol we provide a [toolkit](https://github.com/Label305/Auja-PHP) for PHP providing interfaces and
scaffolding.

Installation (stand alone)
-----

After cloning the [Auja repository](https://github.com/Label305/Auja) you will first have to install Auja's dependencies.

Start using [Bower](http://bower.io/) by running:

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

Develop
-----

You can simply get up and running by installing dependencies using `npm` and `bower` however, during development
this might not be the most convenient way.

### JavaScript

First of all, run `npm install` and `bower install` to get the dependencies. For development we also want `react-tools`

`npm install -g react-tools`

Now, from the root directory, you can watch changes in de `src` directory and build them automatically to the `build` dir.

`jsx --watch src/ build/`


### CSS/SASS

For development using sass you'll need to get your hands on the `sass` gem

`gem install sass`

After which you can watch the sass directory and compile into the css dir

`sass --watch assets/sass/:assets/css/`

Spec testing
-----

Spec testing in Auja is not that intensive, mainly a tool to check if we have put together the objects in the right way.

While submitting a pull request containing a new object in the `objects` directory we require a spec test. So for example
if you add a form item, you'll at least have to show that it implements the methods defined in `Abstract/form_item.js`. 
As well, of course, your added functionality.

### Setup Karma

[Karma](http://karma-runner.github.io/0.12/index.html) is added as an npm dependency for spec testing and installed by running:

    npm install

To get the server up and running, watch your changes and run tests automatically, you will have to start the service which controls your code in FireFox (default). Start Karma by typing:

    ./node_modules/karma/bin/karma start

Which of course can be run a single time if you don't want to have FireFox running in the background

    ./node_modules/karma/bin/karma start --single-run

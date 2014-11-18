---
layout: docs
title: "Getting started with Auja"
---
####Great frameworks are not built by a single person, they are built together! To get up and running with developing for Auja you'll need to understand how things are laced together.

First thing: React! Auja uses the [React](http://facebook.github.io/react/) framework to render while implementing the [Flux](http://facebook.github.io/react/docs/flux-overview.html) architecture to manage dataflow and dispatching within the application. To ease implementation of this architecture we use [Fluxxor](http://fluxxor.com/).

##Setup

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

##Spec testing

Spec testing in Auja is not that intensive, mainly a tool to check if we have put together the objects in the right way.

While submitting a pull request containing a new object in the `objects` directory we require a spec test. So for example
if you add a form item, you'll at least have to show that it implements the methods defined in `Abstract/form_item.js`.
As well, of course, your added functionality.

### Setup Karma

[Karma](http://karma-runner.github.io/0.12/index.html) is added as an npm dependency so running

`npm install`

will do just fine. To get the server up and running and watch your changes and run test automatically again is by running
the service that controls your code in FireFox (default)

`./node_modules/karma/bin/karma start`

Which of course can be run a single time if you don't want to have FireFox running in the background

`./node_modules/karma/bin/karma start --single-run`
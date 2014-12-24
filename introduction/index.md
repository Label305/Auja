---
layout: introduction
title: "Auja Docs"
---

Introduction
=====

- [Introduction](#introduction)
- [Phylosophy](#phylosophy)
- [Contribute](#contribute)

Introduction
-----

The entire interface is made up of a whole lot of different elements, of which menus and pages are the most obvious. However, every little thing inside has its own special object definition even the colors, start menu buttons and user name.

Phylosophy
-----

The idea of Auja is to create a flexible interface which is able to communicate with different application's frameworks. Auja started as a generic interface for CakePHP projects within Label305, enabling us to implement one interface for different custom applications of clients.
While switching from CakePHP to the Laravel framework at Label305, Auja was rebuild from scratch to a generic interface for different platforms.

Contribute
-----

At the moment, an implementation for Laravel is being developed but feel free to build your own implementation. To get up and running with developing for Auja you'll need to understand how things are laced together.

###Javascript core
First thing: React! Auja uses the [React](http://facebook.github.io/react/) framework to render while implementing the [Flux](http://facebook.github.io/react/docs/flux-overview.html) architecture to manage dataflow and dispatching within the application. To ease implementation of this architecture we use [Fluxxor](http://fluxxor.com/).

###Sass and Grunt
Besides using React for the Javascript implementation, Sass used for the styling. Both JSX and SASS files are compiled using Grunt, taking care of creating all files and getting all files into the right directories.

###Bower
All dependencies Auja used are installed using Bower. The following dependencies are used:

- React
- Requirejs
- Jquery
- Fluxxor
- Crossroads.js
- Js-signals
- Sugar
- Ionicons
- Trumbowyg
- Animate.css
- Jstree
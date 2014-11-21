<h3 id="contribute">Contribute to Auja</h3>
At the moment, an implementation for Laravel is being developed but feel free to build your own implementation. To get up and running with developing for Auja you'll need to understand how things are laced together.

####Javascript core
First thing: React! Auja uses the [React](http://facebook.github.io/react/) framework to render while implementing the [Flux](http://facebook.github.io/react/docs/flux-overview.html) architecture to manage dataflow and dispatching within the application. To ease implementation of this architecture we use [Fluxxor](http://fluxxor.com/).

####Sass and Grunt
Besides using React for the Javascript implementation, Sass used for the styling. Both JSX and SASS files are compiled using Grunt, taking care of creating all files and getting all files into the right directories.

####Bower
All dependencies Auja used are installed using Bower.
<h3 id="installation">Stand alone installation</h3>
<p class="leading">After cloning the [Auja repository](https://github.com/Label305/Auja) you will first have to install Auja's dependencies.</p>

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
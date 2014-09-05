###Stand alone

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
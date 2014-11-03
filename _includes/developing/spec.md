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
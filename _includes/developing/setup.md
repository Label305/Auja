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
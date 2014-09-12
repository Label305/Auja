({
    //Base from which the project is looked at
    baseUrl: '.',

    //Config file also used by production
    mainConfigFile: 'build/auja.react.js',

    //Licence references can be found in READMEs
    preserveLicenseComments: false,

    //Let r.js search through all files
    findNestedDependencies: true,

    //Include
    include: [
        'bower_components/requirejs/require.js',
        'build/auja.react.js'
    ]
    
})
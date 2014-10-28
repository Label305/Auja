module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'assets/css/auja.css': 'assets/sass/auja.sass'
                }
            }  
        },
        react: {
            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        cwd: './src',
                        src: ['**/*.js'],
                        dest: './build'
                    }
                ]
            }
        },
        requirejs: {
            compileclosure: {
                options: {    //Base from which the project is looked at
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
                    ],
                    
                    //Output file
                    out: "dist/auja.min.js"
                }
            },
            compile: {
                options: {    //Base from which the project is looked at
                    baseUrl: '.',
                    
                    optimize: 'none',
                    
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
                    ],

                    "paths": {
                        "react": "empty:",
                        "jquery": "empty:",
                        "fluxxor": "empty:",
                        "crossroads.js": "empty:",
                        "js-signals": "empty:",
                        "sugar": "empty:",
                        "Ionicons": "empty:",
                        "trumbowyg": "empty:",
                        "animate.css": "empty:"
                    },

                    //Output file
                    out: "dist/auja.js"
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    grunt.registerTask('test', ['react', 'sass']);
    grunt.registerTask('release', ['react', 'requirejs', 'sass']);
};
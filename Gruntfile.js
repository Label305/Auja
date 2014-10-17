module.exports = function(grunt) {
    grunt.initConfig({
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
            compile: {
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
            }
        }
    });
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    
    grunt.registerTask('test', ['react']);
    grunt.registerTask('release', ['react', 'requirejs']);
};
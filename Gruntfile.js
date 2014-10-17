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
        }
    });
    grunt.loadNpmTasks('grunt-react');
    
    grunt.registerTask('test', ['react']);
};
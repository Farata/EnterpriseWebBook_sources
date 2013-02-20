module.exports = function (grunt) {
    'use strict';
    //
    // Grunt configuration:
    //
    // http://gruntjs.com/getting-started
    //
    grunt.initConfig({

        // Project configuration
        // ---------------------

        // default watch configuration
        // TODO: add watch configuration

        // specifying JSHint options and globals
        // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },

            test: {
                options: {
                    jshintrc: 'test/test/.jshintrc'
                },
                src: ['test/test/*.js']
            },
            app: {
                options: {
                    jshintrc: 'app/js/.jshintrc'
                },
                src: ['app/js/main.js']
            }
        },

        // Build configuration
        // -------------------

        // the staging directory used during the process
        staging: 'temp',
        // final build output
        output: 'dist',

        qunit: {
            all: ['test/qunit-runner.html']
        }
    });

    // Alias the `test` task
    grunt.registerTask('test', 'qunit');
    grunt.registerTask('all', ['jshint', 'test']);
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
};

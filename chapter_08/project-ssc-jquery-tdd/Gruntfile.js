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
        watch: {
            reload: {
                files: [
                    'app/*.html',
                    'app/data/**/*.json',
                    'app/assets/css/*.css',
                    'app/js/**/*.js',
                    'test/test/tests.js',
                    'test/spec/*.js'
                ],
                tasks: ['test']
            }
        },

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
        },

        // headless testing through PhantomJS
        jasmine: {
            src: ['app/js/Player.js', 'app/js/Song.js'],
            options: {
                specs: 'test/spec/PlayerSpec.js',
                helpers: 'test/spec/SpecHelper.js'
            }
        }
    });

    // Alias the `test` task
    grunt.registerTask('test', ['qunit', 'jasmine']);
    //grunt.registerTask('test','server:phantom jasmine');
    grunt.registerTask('all', ['jshint', 'test']);
    // loading jasmine grunt module
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    // loading qunit grunt module
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
};

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        clean: {
            files: ['dist']
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['components/requirejs/require.js', '<%= concat.dist.dest %>'],
                dest: 'dist/require.js'
            },
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/require.min.js'
            },
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            app: {
                options: {
                    jshintrc: 'app/.jshintrc'
                },
                src: ['app/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/**/*.js']
            },
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            },
        },
        requirejs: {
            compile: {
                options: {
                    name: 'config',
                    mainConfigFile: 'app/config.js',
                    out: '<%= concat.dist.dest %>',
                    optimize: 'none'
                }
            }
        },
        connect: {
            development: {
                options: {
                    keepalive: true,
                }
            },
            production: {
                options: {
                    keepalive: true,
                    port: 8000,
                    middleware: function (connect, options) {
                        return [
                            // rewrite requirejs to the compiled version
                            function (req, res, next) {
                                if (req.url === '/components/requirejs/require.js') {
                                    req.url = '/dist/require.min.js';
                                }
                                next();
                            },
                            connect.static(options.base),

                        ];
                    }
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task.
    grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'requirejs', 'concat', 'uglify']);
    grunt.registerTask('preview', ['connect:development']);
    grunt.registerTask('preview-live', ['default', 'connect:production']);

};

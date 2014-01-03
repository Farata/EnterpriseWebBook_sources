module.exports = (grunt) =>
  'use strict'
  grunt.initConfig
    watch:
      reload:
        files: ["app/**/*.js", "test/spec/**/*.js"]
        tasks: ["test"]
    sencha_jasmine:
      keepRunner: false,
      options:
        specs: 'test/spec/**/*.js',
        extControllers: ['Donate'],
        extFramework: 'ext',
        extLoaderPaths:
          'SSC': 'app',
          'Test': 'test',
        template: 'SpecRunner.template'

  grunt.loadNpmTasks 'grunt-sencha-jasmine'
  grunt.loadNpmTasks 'grunt-contrib-watch';
  grunt.registerTask 'test', 'sencha_jasmine'
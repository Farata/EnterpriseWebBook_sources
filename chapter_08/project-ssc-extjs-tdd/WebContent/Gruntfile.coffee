module.exports = (grunt) =>
  'use strict'
  grunt.initConfig
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
  grunt.registerTask 'test', 'sencha_jasmine'
module.exports = (grunt) ->
  "use strict"
  grunt.initConfig
    watch:
      reload:
        files: ["app/*.html", "app/data/**/*.json", "app/assets/css/*.css", "app/js/**/*.js", "test/spec/*.js"]
        tasks: ["test"]

    jasmine:
      src: ["app/js/Player.js", "app/js/Song.js"]
      options:
        specs: ["test/spec/PlayerSpec.js", "test/spec/ExampleSpec.js"]
        helpers: ["test/spec/SpecHelper.js", "test/spec/ExampleHelper.js"]

    karma:
      unit:
        configFile: 'test/runner/karma_min.conf.js',
        autoWatch: true

  # Alias the `test` task
  grunt.registerTask "test", "jasmine"

  # loading jasmine grunt module
  grunt.loadNpmTasks "grunt-contrib-jasmine"
  grunt.loadNpmTasks "grunt-karma"

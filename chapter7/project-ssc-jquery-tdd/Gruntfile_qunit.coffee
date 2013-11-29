module.exports = (grunt)->
  "use strict"
  grunt.initConfig
    qunit:
      all: ["test/qunit-runner.html"]

  grunt.registerTask "test", "qunit"

  grunt.loadNpmTasks "grunt-contrib-qunit"
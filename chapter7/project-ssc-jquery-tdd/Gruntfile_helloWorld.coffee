module.exports = (grunt) ->
  "use strict"
  grunt.registerTask "hello", "say hello", ->
    grunt.log.writeln "Hello from grunt"

  grunt.registerTask 'default', 'hello'
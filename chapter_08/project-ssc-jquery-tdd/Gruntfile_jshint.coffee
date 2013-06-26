module.exports = (grunt)->
  grunt.initConfig
    jshint:
      gruntfile:
        src: ['Gruntfile_jshint.js']
      app:
        src: ['app/js/Player.js']

    watch:
      reload:
        files: [
          'app/*.html',
          'app/data/**/*.json',
          'app/assets/css/*.css',
          'app/js/**/*.js',
          'test/test/tests.js',
          'test/spec/*.js'
        ],
        tasks: ['jshint']

  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.registerTask 'default', ['jshint']
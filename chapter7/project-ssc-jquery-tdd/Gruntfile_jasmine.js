module.exports = function(grunt) {
  "use strict";  grunt.initConfig({
    watch: {
      reload: {
        files: ["app/*.html", "app/data/**/*.json", "app/assets/css/*.css", "app/js/**/*.js", "test/spec/*.js"],
        tasks: ["test"]
      }
    },
    jasmine: {
      src: ["app/js/libs/jquery-1.9.0.min.js", "test/lib/jasmine-1.3.1/jasmine-fixture.js", "app/js/Player.js", "app/js/Song.js", "app/js/main_r.js"],
      options: {
        specs: ["test/spec/PlayerSpec.js", "test/spec/ExampleSpec.js", "test/spec/DomSpec.js"],
        helpers: ["test/spec/SpecHelper.js", "test/spec/ExampleHelper.js"]
      }
    }
  });
  grunt.registerTask("test", "jasmine");
  grunt.loadNpmTasks('grunt-contrib-watch');
  return grunt.loadNpmTasks("grunt-contrib-jasmine");
};

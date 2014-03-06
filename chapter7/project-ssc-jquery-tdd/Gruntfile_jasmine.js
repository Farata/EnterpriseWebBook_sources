module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        watch: {
            reload: {
                files: ["app/*.html", "app/data/**/*.json", "app/assets/css/*.css", "app/**/*.js", "test/spec/*.js"],
                tasks: ["test"]
            }
        },
        jasmine: {
            src: [
                "bower_components/jquery/dist/jquery.min.js",
                "bower_components/jasmine-fixture/dist/jasmine-fixture.min.js",
                "app/Player.js",
                "app/Song.js", "app/main_r.js"],
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

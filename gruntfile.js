module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      test: ['test/*_test.js']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['Gruntfile.js', 'cli.js', 'lib/**/*.js']
    },
    jscs: {
      options: {
        config: '.jscsrc',
        esnext: true
      },
      files: ['<%= jshint.files %>']
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'jscs']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'jscs', 'watch']);
  grunt.registerTask('test', ['nodeunit']);
};

module.exports = function(grunt) {
  var es2015 = require('babel-preset-es2015')
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
        options: {
            sourceMap: false,
            presets: ["es3932"]
        },
        dist: {
            files: {
                'build/*.js': 'assets/js/*.min.js'
            }
        }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/*.js',
        dest: 'build/*.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['babel', 'uglify']);
};




























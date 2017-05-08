module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      main: {
        files: {
          'build/js/main.min.js': 'assets/js/*.js'
        }
      }
    },
    babel: {
        options: {
            sourceMap: false,
            presets: ["es2015"]
        },
        dist: {
            files: [{
                expand: true,
                cwd: 'build/js/',
                src: 'main.min.js',
                dest: 'build/js/',
                ext: '.min.js'
            }]
        }
    },

    uglify: {
      files: {
        src: 'build/js/main.min.js',
        dest: 'build/js/',
        expand: true,
        flatten: true,
        ext: '.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('local', ['concat', 'babel', 'uglify']);
};
















































































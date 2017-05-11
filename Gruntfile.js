/* eslint-env node */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      options: {
        config: '<%= pkg.eslintConfig %>',
        format: 'codeframe'
      },
      all: {
        src: ['Gruntfile.js', 'index.js', 'assets/js/*.js', '!assets/js/*.min.js']
      }
    },

    // Concatenate JS files.
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['assets/js/*.js', '!assets/js/*.min.js'],
        // the location of the resulting JS file
        dest: 'assets/js/<%= pkg.name %>.min.js'
      }
    },

    // Transpile JS files for minification.
    babel: {
        options: {
            sourceMap: false,
            presets: ["es2015"]
        },
        dist: {
            files: {
                '<%= concat.dist.dest %>': ['<%= concat.dist.dest %>']
            }
        }
    },

    // Minify JS files.
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("mm-dd-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= concat.dist.dest %>': ['<%= concat.dist.dest %>']
        }
      }
    },

    // Compile and compress Sass files.
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files : {
          'assets/css/main.min.css': 'assets/sass/main.scss'
        }
      }
    },

    // Run the appropriate process whenever a file changes.
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['Gruntfile.js', 'index.js'],
        tasks: ['newer:eslint:all'],
        options: { spawn: false }
      },
      minify: {
        files: ['assets/js/*.js', '!assets/js/*.min.js'],
        tasks: ['minify'],
        options: { spawn: false }
      },
      sass: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['sass'],
        options: { spawn: false }
      }
    }
  });

  // Load the plugins.
  require('load-grunt-tasks')(grunt);

  // Default task(s). Check syntax when running locally.
  grunt.registerTask('server', ['connect'], ['watch']);
  grunt.registerTask('minify', ['eslint', 'concat', 'babel', 'uglify']);
  grunt.registerTask('local', ['eslint', 'concat', 'babel', 'uglify', 'sass']);
  grunt.registerTask('heroku', ['concat', 'babel', 'uglify', 'sass']);
};

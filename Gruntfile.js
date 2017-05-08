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
        src: ['Gruntfile.js', 'assets/js/*.js', '!assets/js/*.min.js']
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
        dest: 'build/assets/js/<%= pkg.name %>.min.js'
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
          '<%= concat.dist.dest %>': ['<%= concat.dist.dest %>'],
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
          'build/assets/css/main.min.css': 'assets/sass/main.scss'
        }
      }
    },

    // Copy files over to build folder.
    copy: {
      dist: {
        files: [
          // copy minified JS files
          { expand: true, src: 'assets/js/*.min.js', dest: 'build/' },
          // copy minified CSS files
          { expand: true, src: 'assets/css/*.min.css', dest: 'build/' },
          // copy font files
          { expand: true, src: 'assets/fonts/*', dest: 'build/' },
          // copy images
          { expand: true, src: 'images/**/*', dest: 'build/' },
          // copy php
          { expand: true, src: 'php/**/*', dest: 'build/' },
          // copy files
          { expand: true, src: ['*'], dest: 'build/', filter: 'isFile'}

        ]
      }
    },

    // Check syntax when file changes.
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'assets/js/*.js', '!assets/js/*.min.js'],
        tasks: ['newer:eslint:all'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    }

  });

  // Load the plugins.
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('local', ['eslint', 'concat', 'babel', 'uglify', 'sass', 'copy']);
  grunt.registerTask('heroku', ['concat', 'babel', 'uglify', 'sass', 'copy']);
};

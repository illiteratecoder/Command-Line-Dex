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
      // copy minified JS files
      js: { src: 'assets/js/*.min.js', dest: 'build/' },
      // copy minified CSS files
      css: { src: 'assets/css/*.min.css', dest: 'build/' },
      // copy font files
      fonts: { src: 'assets/fonts/*', dest: 'build/' },
      // copy images
      images: { src: 'images/**/*', dest: 'build/' },
      // copy php
      php: { src: 'php/**/*', dest: 'build/' },
      // copy everything else in root directory
      all: { src: ['*'], dest: 'build/', filter: 'isFile' }
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
      },
      js: {
        files: ['assets/js/*.min.js'],
        tasks: ['newer:copy:js'],
        options: { spawn: false }
      },
      css: {
        files: ['assets/css/*.min.css'],
        tasks: ['newer:copy:css'],
        options: { spawn: false }
      },
      fonts: {
        files: ['assets/fonts/*'],
        tasks: ['newer:copy:fonts'],
        options: { spawn: false }
      },
      images: {
        files: ['images/**/*'],
        tasks: ['newer:copy:images'],
        options: { spawn: false }
      },
      php: {
        files: ['php/**/*'],
        tasks: ['newer:copy:php'],
        options: { spawn: false }
      },
      all: {
        files: ['*'],
        tasks: ['newer:copy:all'],
        options: { spawn: false }
      },
    }
  });

  // Load the plugins.
  require('load-grunt-tasks')(grunt);

  // Default task(s). Check syntax when running locally.
  grunt.registerTask('server', ['connect'], ['watch']);
  grunt.registerTask('minify', ['eslint', 'concat', 'babel', 'uglify']);
  grunt.registerTask('local', ['eslint', 'concat', 'babel', 'uglify', 'sass', 'copy']);
  grunt.registerTask('heroku', ['concat', 'babel', 'uglify', 'sass', 'copy']);
};

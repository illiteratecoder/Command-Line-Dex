module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['assets/js/*.js', '!assets/js/skel.min.js'],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
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
                src: 'dist/<%= pkg.name %>.js'
            }]
        }
    },

    uglify: {
      options: {
        banner: '/*! <% pkg.name %> <%= grunt.template.today("dd-mm-yyy") %> */\n'
      },
      dist: {
        expand: true,
        flatten: true,
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
        }
      }
    },

    eslint: {
      options: {
        config: '<%= pkg.eslintConfig %>'
      },
      target: ['assets/js/*.js', '!assets/js/*.min.js']
    },
    watch: {
      scripts: {
        files: ['<%= eslint.target %>'],
        tasks: ['eslint']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-eslint");

  // Default task(s).
  grunt.registerTask('local', ['eslint', 'concat', 'babel', 'uglify']);
  grunt.registerTask('heroku', ['concat', 'babel', 'uglify']);
};

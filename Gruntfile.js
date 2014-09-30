module.exports = function(grunt) {

  /**
   * Load external tasks
   */
  grunt.loadTasks('tasks');

  /**
   * Load grunt plugins
   */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  /**
   * Configuration
   */
  grunt.initConfig({
    jshint: {
      all: [
        'index.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
      }
    },

    // clean dirs
    clean: {
      tests: 'tmp',
    },

    // copy file to temp before run coffee_strip_code
    copy: {
      tests: {
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/',
            src: '*',
            dest: 'tmp/',
          }
        ],
      },
    },

    // Configuration to be run (and then tested).
    coffee_strip_code: {
      default_options: {
        src: 'tmp/default_options.js',
      },
      start_end_options: {
        options: {
          start_comment_tag: '{test}',
          end_comment_tag: '{/test}',
        },
        src: 'tmp/start_end_options.js',
      },
      pattern_options: {
        options: {
          pattern: / *console\.log\(['"a-z]+\)\n?/g
        },
        src: 'tmp/pattern_options.js',
      },
      dest_specified: {
        files: [
          {src: 'tmp/dest_specified.js', dest: 'tmp/dest_specified2.js'},
        ]
      },
      multiple_files: {
        src: ['tmp/multiple_files*.js', 'tmp/another_multiple_file.js']
      },
    },

    // make unit tests
    nodeunit: {
      tests: ['tests/*_test.js']
    },

  })


  /**
   * Register some taks
   */
  // Whenever the 'test' task is run, first clean "tmp" directory,
  // then run this plugin tasks then test the result
  grunt.registerTask('test', ['clean', 'copy', 'coffee_strip_code', 'nodeunit'])

  grunt.registerTask('default', ['jshint', 'test'])
}

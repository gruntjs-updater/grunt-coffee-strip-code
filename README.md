# grunt-coffee-strip-code

A Grunt task to remove develop and test only code blocks from production builds from CoffeeScript files.

## Getting started

> Requirements: Grunt `~0.4.1` or above

Install in your workspace project

    $ cd ~/your/workspace/project
    $ npm install grunt-coffee-strip-code --save-dev

then add line to `Gruntfile.js`:

    grunt.loadNpmTasks('grunt-coffee-strip-code');


## The "coffee_strip_code" task

### Overview

In `Gruntfile.js` add section named `coffee_strip_code` to the data object passed into `grunt.initConfig()`.


    grunt.initConfig({
      coffee_strip_code: {
        options: {
          // Task-specific options go here.
        },
        your_target: {
          // Task-specific file lists and/or options go here.
        },
      },
    })

### Options

##### options.start_comment_tag
Type: `String`
Default value: `test-block-start`

The text inside the opening comment used to identify code to strip.

##### options.end_comment_tag
Type: `String`
Default value: `test-block-end`

The text inside the closing comment used to identify code to strip.

##### options.pattern
Type: `RegExp`
Default value: (a generated RegExp matching the start and end comments)

If the default start and end comment matching doesn't work for your needs, you can supply your own RegExp to match against. If the pattern option is specified, the start_comment and end_comment options are ignored.

## Example Usage
The following source code exposes the bar function to the public API for testing, but the bar function should not be accessible in the released library. `grunt-coffee-strip-code` (with the default options) will remove the comment blocks from the example below keeping the bar function private in production:

    ( () ->

      bar = () ->
        doSomething()

      api = {
        foo: () ->
          bar()
        }
      }

      ## test-block-start ##
      api._bar = bar;
      ## test-block-end ##

      return api;
    )()

### Setting custom start/end comment tag
The following configuration will strip out code that begins with the /* start-test-block */ comment and ends with the /* end-test-block */ comment from all .js files in the dist/ folder.

    grunt.initConfig({
      coffee_strip_code: {
        options: {
          start_comment_tag: 'test-block-start',
          end_comment_tag: 'test-block-end',
        },
        src: 'dist/*.coffee'
      },
    })

### Customize own pattern
The following configuration will remove log() statements from all .js files in the dist/ folder

    grunt.initConfig({
      coffee_strip_code: {
        options: {
          pattern: /log\(\)/g
        },
        src: 'dist/*.coffee'
      },
    })

### Specifying source and destination.
The normal behavior is to strip out code in the source files and then save those files with the same name. If you need to save them to a different name, you can specify a `dest` option as well.

    grunt.initConfig({
      coffee_strip_code: {
        options: { },
        files: [
          {src: 'tmp/my-app.coffee', dest: 'dist/my-app.coffee'},
          {src: 'tmp/my-lib.coffee', dest: 'dist/my-lib.coffee'},
        ],
      },
    })

## Contribute
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## License
The MIT License (MIT)

Copyright (c) 2014 Maciej Sypień

This Project was inspired by Philip Walton and his [grunt-strip-code](https://github.com/nuzzio/grunt-strip-code) package.

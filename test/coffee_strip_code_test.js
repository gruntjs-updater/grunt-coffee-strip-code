
var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()

  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.coffee_strip_code = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options.coffee');
    var expected = grunt.file.read('test/expected/default_options.coffee');
    test.equal(actual, expected, 'should default to using "test-code" and "end-test-code" as the identifiers.');

    test.done();
  },
  start_end_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/start_end_options.coffee');
    var expected = grunt.file.read('test/expected/start_end_options.coffee');
    test.equal(actual, expected, 'should use the specified start and end comment identifiers.');

    test.done();
  },
  pattern_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/pattern_options.coffee');
    var expected = grunt.file.read('test/expected/pattern_options.coffee');
    test.equal(actual, expected, 'should ignore start and end identifiers and use the pattern option if present.');

    test.done();
  },
  dest_specified: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/dest_specified2.coffee');
    var expected = grunt.file.read('test/expected/dest_specified.coffee');
    test.equal(actual, expected, 'should save to the dest option if specified.');

    test.done();
  },
  multiple_files: function(test) {
    test.expect(3);

    var actual1 = grunt.file.read('tmp/multiple_files1.coffee');
    var expected1 = grunt.file.read('test/expected/multiple_files1.coffee');
    var actual2 = grunt.file.read('tmp/multiple_files2.coffee');
    var expected2 = grunt.file.read('test/expected/multiple_files2.coffee');
    var actual3 = grunt.file.read('tmp/multiple_files3.coffee');
    var expected3 = grunt.file.read('test/expected/multiple_files3.coffee');
    test.equal(actual1, expected1, 'should handle multiple files 1.');
    test.equal(actual2, expected2, 'should handle multiple files 2.');
    test.equal(actual3, expected3, 'should handle multiple files 3.');

    test.done();
  },
};

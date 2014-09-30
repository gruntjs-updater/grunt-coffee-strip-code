module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask("coffee_strip_code", "Strip code matching a specified pattern.", function(target) {

    var options = this.options({
          start_comment_tag: "test-block-start",
          end_comment_tag: "test-block-end"
        })
      , pattern = options.pattern || new RegExp(
          "([\\t ]*\\#\\# ?" + options.start_comment_tag + " ?\\#\\#.*\n)" +
          "[\\s\\S]*?" +
          "(\\#\\# ?" + options.end_comment_tag + " ?\\#\\#.*\n)"
          , "g"
        );

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      f.src.forEach(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return;
        }
        var contents = grunt.file.read(filepath)
          , replacement = contents.replace(pattern, "");
        // if replacement is different than contents, save file and print a success message.
        if (contents != replacement) {
          if (f.dest) {
            grunt.file.write(f.dest, replacement);
            grunt.log.writeln("Stripped code from " + filepath + " and saved to " + f.dest);
          } else {
            grunt.file.write(filepath, replacement);
            grunt.log.writeln("Stripped code from " + filepath);
          }
        }
      });
    });
  });
};

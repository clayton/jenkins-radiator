var path = require('path'),
    through = require('through2'),
    gutil = require('gulp-util'),
    eco = require('eco');

module.exports = function (opt) {

  opt = opt || {};
  if (!opt.basePath) opt.basePath = '';
  if (!opt.namespace) opt.namespace = 'JST';

  return through.obj(function (file, encoding, callback) {
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    JSTpath = path.dirname(file.path) + '/' + path.basename(file.path, '.eco');
    var re = new RegExp('.*\/' + opt.basePath + '\/?');  // match basePath + optional path separator
    JSTpath = JSTpath.replace(re, '');

    var str = file.contents.toString();
    var output = "(function() {\n  this." + opt.namespace + " || (this." + opt.namespace + " = {});\n  this." + opt.namespace + "[" + JSON.stringify(JSTpath) + "] = " + eco.compile(str) + ";\n}).call(global || this);"

    try {
      file.contents = new Buffer(output);
      file.path = gutil.replaceExtension(file.path, '.js');
    } catch (err) {
      err.fileName = file.path;
      this.emit('error', new gutil.PluginError('gulp-eco', err));
    }

    this.push(file);
    callback();
  });
};

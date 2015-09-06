var path = require('path');
var chalk = require('chalk');
var glob = require('glob');
var Utils = require('./utils');
var OutputFormat = require('./output');

var utils = {};
var outputFormat = {};

/**
 * Initialization()
 *
 * @param {Object} options
 * @constructor
 */
function Fsys(options) {
  utils = new Utils(options);
  outputFormat = new OutputFormat(options);
  this.options = options;
}

Fsys.prototype = {
  /**
   * Output files and directories in the current directory in the console
   *
   * @param {Array} files
   */

  currentDir: function(files) {
    var _op = this.options;
    var output = outputFormat.line(files);

    // If don't use -l
    if (output && !_op.fullMode) {
      console.log(output);
    } else {
      // If use -l
      outputFormat.block(files, _op.fullMode);
    }
  },

  /**
   * Recurse directories with the output files in the current directory
   *
   * @param {Array} files
   */

  recursiveDir: function(files) {
    var _self = this;
    var _op = this.options;
    console.log('');

    files.forEach(function(filename) {
      var stat = utils.getFileStatus(filename);

      // If current filename is directory
      if (stat.isDirectory) {
        var name = path.relative(process.cwd(), filename).replace(/\\/g, '/');
        console.log(chalk.green('>> ') + chalk.blue(`./${name}:`));

        // Recursive reading
        var dirFiles = glob.sync(path.join(filename, '*'), _op);
        _self.currentDir(dirFiles);
        _self.recursiveDir(dirFiles);
      }
    });
  }
};

module.exports = Fsys;

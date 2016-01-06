var path = require('path');
var chalk = require('chalk');
var glob = require('glob');
var Utils = require('./utils');
var OutputFormat = require('./output');

var utils = {};
var outputFormat = {};

// Initialization()
function Fsys(options) {
  utils = new Utils(options);
  outputFormat = new OutputFormat(options);
  this.options = options;
}

Fsys.prototype = {
  // Output files and directories in the current directory in the console
  currentDir: function(files) {
    var options = this.options;
    var output = outputFormat.line(files);

    // If don't use -l
    if (output && !options.fullMode) {
      console.log(output);
    } else {
      // If use -l
      outputFormat.block(files, options.fullMode);
    }
  },

  // Recurse directories with the output files in the current directory
  recursiveDir: function(files) {
    var that = this;
    var options = this.options;
    console.log('');

    files.forEach(function(filepath) {
      var stat = utils.getFileStatus(filepath);

      // If current filepath is directory
      if (stat.isDirectory) {
        var name = path.relative(process.cwd(), filepath).replace(/\\/g, '/');
        console.log(chalk.green('>> ') + chalk.blue('./' + name + ':'));

        // Recursive reading
        var dirFiles = glob.sync(path.join(filepath, '*'), options);
        that.currentDir(dirFiles);
        that.recursiveDir(dirFiles);
      }
    });
  }
};

module.exports = Fsys;

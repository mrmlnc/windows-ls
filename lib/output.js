var path = require('path');
var chalk = require('chalk');
var Utils = require('./utils');

var utils = {};
var consoleWide = process.stdout.columns;

/**
 * Initialization()
 *
 * @param options
 * @constructor
 */

function Output(options) {
  utils = new Utils(options);
  this.options = options;
}

Output.prototype = {
  /**
   * Output files and directories into a string
   *
   * @param {Array} files
   * @returns {String}
   */

  line: function(files) {
    var sum = '';
    for (var index = 0; index < files.length; index++) {
      // If the width of the text more of a console window, stop the summation
      if (sum.length > consoleWide) {
        sum = false;
        break;
      }

      var file = files[index];
      var stat = utils.getFileStatus(file);
      var name = utils.dirSuffix(path.basename(file), stat);

      sum += (stat.isDirectory) ? `${chalk.blue(name)}    ` : `${name}    `;
    }

    return sum;
  },

  /**
   * Blocky output files and directories in the console
   *
   * @param {Array} files
   */

  block: function(files) {
    var _op = this.options;
    var filesArr = [];

    files.forEach(function(filename) {
      var stat = utils.getFileStatus(filename);
      var name = utils.dirSuffix(path.basename(filename), stat);

      // Colorize directory
      if (stat.isDirectory) {
        name = chalk.blue(name);
      }

      // If need full listing with description
      if (_op.fullMode) {
        var date = utils.formatDate(stat.birthtime);
        filesArr.push([
          chalk.green('>> '),
          stat.size,
          date.monthAndDay,
          date.time,
          name
        ]);
      }

      // Output without more information
      if (!_op.fullMode) {
        console.log(chalk.green('>> ') + name);
      }
    });

    // Output with more information
    if (_op.fullMode) {
      console.log(utils.formatTable(filesArr));
    }
  }

};

module.exports = Output;

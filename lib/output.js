'use strict';

var path = require('path');
var chalk = require('chalk');

var Utils = require('./utils');
var utils = {};
var consoleWide = process.stdout.columns;

// Initialization()
function Output(options) {
  utils = new Utils(options);
  this.options = options;
}

Output.prototype = {
  // Output files and directories into a string
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

      sum += (stat.isDirectory) ? chalk.blue(name) + '    ' : name + '    ';
    }

    return sum;
  },

  // Blocky output files and directories in the console
  block: function(files) {
    var options = this.options;
    var filesArr = [];

    files.forEach(function(filename) {
      var stat = utils.getFileStatus(filename);
      var name = utils.dirSuffix(path.basename(filename), stat);

      // Colorize directory
      if (stat.isDirectory) {
        name = chalk.blue(name);
      }

      // If need full listing with description
      if (options.fullMode) {
        var date = utils.formatDate(stat.birthtime);
        if (!stat) {
          name += ' (operation not permitted)';
          filesArr.push([chalk.red('>> '), '', '', '', name]);
          return;
        }

        filesArr.push([
          chalk.green('>> '),
          stat.size,
          date.monthAndDay,
          date.time,
          name
        ]);
      }

      // Output without more information
      if (!options.fullMode) {
        console.log(chalk.green('>> ') + name);
      }
    });

    // Output with more information
    if (options.fullMode) {
      console.log(utils.formatTable(filesArr));
    }
  }

};

module.exports = Output;

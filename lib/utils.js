var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var dateFormat = require('dateformat');
var prettyBytes = require('pretty-bytes');
var table = require('text-table');

// Initialization()
function Utils(options) {
  this.options = options;
}

Utils.prototype = {
  formatDate: function(datetime) {
    return {
      monthAndDay: dateFormat(datetime, 'mmm d'),
      time: dateFormat(datetime, 'h:MM')
    };
  },

  formatTable: function(arr) {
    return table(arr, {
      align: ['l', 'r', 'r', 'r']
    });
  },

  getFileStatus: function(filename) {
    var options = this.options;
    var stats = fs.lstatSync(filename);
    stats.isDirectory = !!stats.isDirectory();

    // If use -l && -h
    if (options.fullMode && options.humanSize) {
      stats.size = prettyBytes(stats.size);
    }

    return stats;
  },

  // Adding a suffix to the directories
  dirSuffix: function(dirname, stat) {
    var options = this.options;

    // If use -p
    if (options.suffix === true && stat.isDirectory) {
      dirname += '/';

      // Or -F
    } else if (options.suffix === 'full') {
      var ext = path.extname(dirname);
      if (stat.isDirectory) {
        dirname += '/';

        // If current filename is executable file
      } else if (['.exe', '.msi', '.bat'].indexOf(ext) + 1) {
        dirname = chalk.yellow(dirname + '*');
      }
    }

    return dirname;
  }
};

module.exports = Utils;

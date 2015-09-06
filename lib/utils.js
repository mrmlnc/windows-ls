var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var dateFormat = require('dateformat');
var prettyBytes = require('pretty-bytes');
var table = require('text-table');

/**
 * Initialization()
 *
 * @param {Object} options
 * @constructor
 */
function Utils(options) {
  this.options = options;
}

Utils.prototype = {
  /**
   * Format date
   *
   * @param {String} datetime
   * @returns {*}
   */
  formatDate: function(datetime) {
    return {
      monthAndDay: dateFormat(datetime, 'mmm d'),
      time: dateFormat(datetime, 'h:MM')
    };
  },

  /**
   * Formating array to
   *
   * @param {Array} arr
   * @returns {*}
   */
  formatTable: function(arr) {
    return table(arr, {
      align: ['l', 'r', 'r', 'r']
    });
  },

  /**
   * Get information about file ot directory
   *
   * @param {String} filename
   * @returns {*}
   */

  getFileStatus: function(filename) {
    var _op = this.options;
    var stats = fs.lstatSync(filename);
    stats.isDirectory = !!stats.isDirectory();

    // If use -l && -h
    if (_op.fullMode && _op.humanSize) {
      stats.size = prettyBytes(stats.size);
    }

    return stats;
  },

  /**
   * Adding a suffix to the directories
   *
   * @param {String} name
   * @param {Object} stat
   * @returns {*}
   */

  dirSuffix: function(name, stat) {
    var _op = this.options;

    // If use -p
    if (_op.suffix === true && stat.isDirectory) {
      name = `${name}/`;

      // Or -F
    } else if (_op.suffix === 'full') {
      var ext = path.extname(name);
      if (stat.isDirectory) {
        name = `${name}/`;

        // If current filename is executable file
      } else if (['.exe', '.msi', '.bat'].indexOf(ext) + 1) {
        name = chalk.yellow(name + '*');
      }
    }

    return name;
  }
};

module.exports = Utils;

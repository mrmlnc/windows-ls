#!/usr/bin/env node
var path = require('path');
var glob = require('glob');
var hasGlob = require('has-glob');
var Fsys = require('./lib/fsys');
var argv = require('minimist')(process.argv.slice(2));
var dir = process.cwd();

/**
 * Defining options from the console
 *
 * @param {Object} argv
 * @returns {Object}
 */
function setOptions(argv) {
  var op = {
    dot: false,
    recursive: false,
    fullMode: false,
    suffix: false,
    humanSize: false
  };

  // If there are arguments and the first argument with star
  if (argv._[0] && argv._[0].indexOf('-')) {
    op.dir = path.join(dir, argv._[0]);
    // If the argument contains the glob-pattern
    op.dir = (hasGlob(argv._[0])) ? op.dir : path.join(op.dir, '*');
  } else {
    // Default glob-pattern
    op.dir = path.join(dir, '*');
  }

  // Checking arguments
  if (argv.a) {
    op.dot = true;
  }
  if (argv.R) {
    op.recursive = true;
  }
  if (argv.l) {
    op.fullMode = true;
  }
  if (argv.F) {
    op.suffix = 'full';
  }
  if (argv.p) {
    op.suffix = true;
  }
  if (argv.h) {
    op.humanSize = true;
  }

  return op;
}

var options = setOptions(argv);
var fsys = new Fsys(options);

glob(options.dir, options, function(err, files) {
  if (err) {
    console.error(err);
  }
  fsys.currentDir(files);

  // If -R
  if (options.recursive) {
    fsys.recursiveDir(files);
  }
});

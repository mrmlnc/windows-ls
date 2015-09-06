var exec = require('child_process').exec;
var fs = require('fs');
var exJson = JSON.parse(fs.readFileSync('./test/expected/answers.json'));

var cli = require('../cli');

'use strict';

exports.assetser = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  ls: function(test) {
    test.expect(1);

    exec('ls', { cwd: 'test/fixtures' }, function (err, stdout) {
      var actual = stdout;
      var expected = exJson.ls;
      test.equal(actual, expected, 'ls');

      test.done();
    });
  },
  lsa: function(test) {
    test.expect(1);

    exec('ls -a', { cwd: 'test/fixtures' }, function (err, stdout) {
      var actual = stdout;
      var expected = exJson.lsa;
      test.equal(actual, expected, 'ls -a');

      test.done();
    });
  },
  lsr: function(test) {
    test.expect(1);

    exec('ls -R', { cwd: 'test/fixtures' }, function (err, stdout) {
      var actual = stdout;
      var expected = exJson.lsr;
      test.equal(actual, expected, 'ls -R');

      test.done();
    });
  },
  lsl: function(test) {
    test.expect(1);

    exec('ls -l', { cwd: 'test/fixtures' }, function (err, stdout) {
      var actual = stdout;
      var expected = exJson.lsl;
      test.equal(actual, expected, 'ls -l');

      test.done();
    });
  },
  lsf: function(test) {
    test.expect(1);

    exec('ls -F', { cwd: 'test/fixtures' }, function (err, stdout) {
      var actual = stdout;
      var expected = exJson.lsf;
      test.equal(actual, expected, 'ls -F');

      test.done();
    });
  },
  lsp: function(test) {
    test.expect(1);

    exec('ls -p', { cwd: 'test/fixtures' }, function (err, stdout) {
      var actual = stdout;
      var expected = exJson.lsp;
      test.equal(actual, expected, 'ls -p');

      test.done();
    });
  },
  lsalf: function(test) {
    test.expect(1);

    exec('ls -a -l -F', { cwd: 'test/fixtures' }, function (err, stdout) {
      var actual = stdout;
      var expected = exJson.lsalf;
      test.equal(actual, expected, 'ls -a -l -F');

      test.done();
    });
  },
  lslh: function(test) {
    test.expect(1);

    exec('ls -l -h', { cwd: 'test/fixtures' }, function (err, stdout) {
      var actual = stdout;
      var expected = exJson.lslh;
      test.equal(actual, expected, 'ls -l -h');

      test.done();
    });
  },
  lsglob: function(test) {
    test.expect(1);

    exec('ls **/*.txt', { cwd: 'test/fixtures' }, function (err, stdout) {
      var actual = stdout;
      var expected = exJson.lsglob;
      test.equal(actual, expected, 'ls **/*.txt');

      test.done();
    });
  }
};

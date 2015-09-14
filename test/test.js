var test = require('ava');

var exec = require('child_process').exec;
var fs = require('fs');
var exJson = JSON.parse(fs.readFileSync('./test/expected/answers.json'));

test('ls', function(t) {
  exec('node ../../cli.js', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(stdout, exJson.ls);
    t.end();
  });
});

test('ls -a', function(t) {
  exec('node ../../cli.js -a', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(stdout, exJson.lsa);
    t.end();
  });
});

test('ls -R', function(t) {
  exec('node ../../cli.js -R', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(stdout, exJson.lsr);
    t.end();
  });
});

test('ls -l', function(t) {
  exec('node ../../cli.js -l', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(stdout.indexOf('32') >= 0, true);
    t.end();
  });
});

test('ls -F', function(t) {
  exec('node ../../cli.js -F', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(stdout, exJson.lsf);
    t.end();
  });
});

test('ls -p', function(t) {
  exec('node ../../cli.js -p', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(stdout, exJson.lsp);
    t.end();
  });
});

test('ls -laF', function(t) {
  exec('node ../../cli.js -laF', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(stdout.indexOf('dir/') >= 0, true);
    t.end();
  });
});

test('ls -lh', function(t) {
  exec('node ../../cli.js -lh', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(stdout.indexOf('32 B') >= 0, true);
    t.end();
  });
});

test('ls glob', function(t) {
  exec('node ../../cli.js **/*.txt', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(stdout, exJson.lsglob);
    t.end();
  });
});

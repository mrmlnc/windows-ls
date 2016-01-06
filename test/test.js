var os = require('os');
var assert = require('assert');
var exec = require('child_process').exec;

function checkOut(output, checkVals) {
  return checkVals.some(function(value) {
    return output.indexOf(value) >= 0;
  });
}

it('ls', function() {
  exec('node ../../cli.js', { cwd: 'test/fixtures' }, function(err, stdout) {
    assert.equal(checkOut(stdout, ['dir', 'Gruntfile.js', 'package.json', 'test.exe']), true);
  });
});

it('ls -a', function() {
  exec('node ../../cli.js -a', { cwd: 'test/fixtures' }, function(err, stdout) {
    assert.equal(checkOut(stdout, ['.editorconfig', '.gitignore', 'dir']), true);
  });
});

it('ls -R', function() {
  exec('node ../../cli.js -R', { cwd: 'test/fixtures' }, function(err, stdout) {
    assert.equal(checkOut(stdout, ['./dir:', 'cat.json', './dir/styles:', 'vendor']), true);
  });
});

it('ls -l', function() {
  exec('node ../../cli.js -l', { cwd: 'test/fixtures' }, function(err, stdout) {
    assert.equal(checkOut(stdout, ['dir', '32']), true);
  });
});

it('ls -F', function() {
  exec('node ../../cli.js -F', { cwd: 'test/fixtures' }, function(err, stdout) {
    assert.equal(checkOut(stdout, ['dir/', 'test.exe*']), true);
  });
});

it('ls -p', function() {
  exec('node ../../cli.js -p', { cwd: 'test/fixtures' }, function(err, stdout) {
    assert.equal(checkOut(stdout, ['dir/']), true);
  });
});

it('ls -laF', function() {
  exec('node ../../cli.js -laF', { cwd: 'test/fixtures' }, function(err, stdout) {
    assert.equal(checkOut(stdout, ['.editorconfig', 'dir/', 'test.exe*', '32']), true);
  });
});

it('ls -lh', function() {
  exec('node ../../cli.js -lh', { cwd: 'test/fixtures' }, function(err, stdout) {
    assert.equal(checkOut(stdout, ['32 B']), true);
  });
});

it('ls glob', function(done) {
  if (os.type() === 'Windows_NT') {
    exec('node ../../cli.js **/*.txt', { cwd: 'test/fixtures' }, function(err, stdout) {
      assert.equal(checkOut(stdout, ['key.txt']), true);
      done();
    });
  } else {
    done();
  }
});

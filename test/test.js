var test = require('ava');
var exec = require('child_process').exec;

function checkOut(output, checkVals) {
  var finale = false;
  for (var i = 0; i < checkVals.length; i++) {
    if (output.indexOf(checkVals[i]) >= 0) {
      finale = true;
    } else {
      return false;
    }
  }

  return finale;
}

test('ls', function(t) {
  exec('node ../../cli.js', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(checkOut(stdout, ['dir', 'Gruntfile.js', 'package.json', 'test.exe']), true);
    t.end();
  });
});

test('ls -a', function(t) {
  exec('node ../../cli.js -a', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(checkOut(stdout, ['.editorconfig', '.gitignore', 'dir']), true);
    t.end();
  });
});

test('ls -R', function(t) {
  exec('node ../../cli.js -R', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(checkOut(stdout, ['./dir:', 'cat.json', './dir/styles:', 'vendor']), true);
    t.end();
  });
});

test('ls -l', function(t) {
  exec('node ../../cli.js -l', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(checkOut(stdout, ['dir', '32']), true);
    t.end();
  });
});

test('ls -F', function(t) {
  exec('node ../../cli.js -F', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(checkOut(stdout, ['dir/', 'test.exe*']), true);
    t.end();
  });
});

test('ls -p', function(t) {
  exec('node ../../cli.js -p', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(checkOut(stdout, ['dir/']), true);
    t.end();
  });
});

test('ls -laF', function(t) {
  exec('node ../../cli.js -laF', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(checkOut(stdout, ['.editorconfig', 'dir/', 'test.exe*', '32']), true);
    t.end();
  });
});

test('ls -lh', function(t) {
  exec('node ../../cli.js -lh', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(checkOut(stdout, ['32 B']), true);
    t.end();
  });
});

test('ls glob', function(t) {
  exec('node ../../cli.js **/*.txt', { cwd: 'test/fixtures' }, function (err, stdout) {
    t.is(checkOut(stdout, ['key.txt']), true);
    t.end();
  });
});

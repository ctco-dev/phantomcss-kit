var phantomcss = require('phantomcss');

var server = require('webserver').create();
var serveDir = casper.cli.get('serveDir');
var pageUrl = casper.cli.get('url');
var rebase = casper.cli.get('rebase');
var tolerance = casper.cli.get('tolerance');
var wait = casper.cli.get('wait') || 0;
var port = casper.cli.get('port') || 3010;

function parseUrl(href) {
  var l = document.createElement('a');
  l.href = href;
  return l;
}

if (serveDir) {
  server.listen(port, function(req, res) {
    var url = parseUrl(req.url).pathname;
    var content = fs.read( fs.absolute( serveDir + url ));

    res.statusCode = 200;
    res.write(content);
    res.close();
  });
}

casper.test.begin( 'Visual tests', function (test) {
  phantomcss.init({
    screenshotRoot: 'phantomcss/screenshots',
    failedComparisonsRoot: 'phantomcss/failures',
    comparisonResultRoot: 'phantomcss/results',
    rebase: rebase,
    mismatchTolerance: tolerance,
    addIteratorToImage: false,
  });

  casper.start('http://localhost:' + port + '/' + pageUrl);

  casper.viewport( 1280, 1024 );

  if (wait > 0) {
    casper.wait(wait, takeScreenshots);
  }
  else {
    casper.then(takeScreenshots);
  }

  casper.then( function now_check_the_screenshots() {
    // compare screenshots
    phantomcss.compareAll();
  });

  /*
   Casper runs tests
   */
  casper.run( function () {
    // phantomcss.getExitStatus() // pass or fail?
    casper.test.done();
  });
});

function takeScreenshots() {
  this.getElementsInfo('.test').forEach(function(elemInfo) {
    phantomcss.screenshot('#' + elemInfo.attributes.id, elemInfo.attributes.id);
  });
}
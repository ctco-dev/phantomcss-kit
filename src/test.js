/**
 * NB: this script is run in a CasperJS environment, not Node.
 *
 * For more information, see http://docs.casperjs.org/en/latest/quickstart.html
 */

var phantomcss = require('phantomcss');

var pageUrl = casper.cli.get('url');
var rebase = casper.cli.get('rebase');
var tolerance = casper.cli.get('tolerance');
var wait = casper.cli.get('wait') || 0;


casper.test.begin('Visual tests', function () {
  phantomcss.init({
    screenshotRoot: 'phantomcss/screenshots',
    failedComparisonsRoot: 'phantomcss/failures',
    comparisonResultRoot: 'phantomcss/results',
    rebase: rebase,
    mismatchTolerance: tolerance,
    addIteratorToImage: false,
  });

  casper.start(pageUrl);

  casper.viewport(1280, 1024);

  if (wait > 0) {
    casper.wait(wait, takeScreenshots);
  }
  else {
    casper.then(takeScreenshots);
  }

  casper.then(function compareScreenshots() {
    // compare screenshots
    phantomcss.compareAll();
  });

  /*
   Casper runs tests
   */
  casper.run(function() {
    casper.test.done();
  });
});

function takeScreenshots() {
  this.getElementsInfo('[pk-test]').forEach(function(elemInfo) {
    phantomcss.screenshot('[pk-test="' + elemInfo.attributes['pk-test'] + '"]', elemInfo.attributes['pk-test']);
  });
}

var executionInProgress = false;
var rowArray = null;
// var urlArray = null;
// var renderMethod = null;

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function(msg) {
    if (msg.type === 'init') {
      executionInProgress = true;

      rowArray = msg.rawTxt.replace(/^\s+|\s+$/g, '').split("\n");
      var rowTxt = rowArray.shift();
      port.postMessage({
        'type' : 'fetch',
        'rowTxt' : rowTxt
      });

    } else if (msg.type === 'next') {
      // next row
      if (executionInProgress) {
        var rowTxt = rowArray.shift();
        if (rowTxt !== undefined) {
          port.postMessage({
            'type' : 'fetch',
            'rowTxt' : rowTxt
          });
        } else {
          executionInProgress = false; //done
          rowArray = null;
        }

      } else {
        console.log("no more rows to be processed."); //xxx
      }
    }
  });
});

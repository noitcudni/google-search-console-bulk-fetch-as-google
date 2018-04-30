$(document).ready(function(){
  // url : device type (DESKTOP vs SMARTPHONE_NEW) | render? (true or false)
  var $fileInput = $("<input id='fileInput' type='file' />");
  var $container = $("<div id='lih-container'></div>");

  $("#wmxbot-action-section").append($container);
  $container.append($fileInput);

  var port = chrome.runtime.connect({name: "port"});

  port.onMessage.addListener(function(msg) {
    if (msg.type === 'fetch') {
      var cols = msg.rowTxt.split(",");

      console.log("about to fetch"); //xxx
      console.log(cols); //xxx

      for (var i = 0 ; i < cols.length; i++) {
        cols[i] = cols[i].replace(/^\s+|\s+$/g, ''); // get rid of extra white spaces
      }

      // type
      $("input[name='path']").attr("value", cols[0]);
      if (cols[1] === "desktop") {
        $("input[name='type']").attr("value", "DESKTOP");
      } else if (cols[1] === "mobile") {
        $("input[name='type']").attr("value", "SMARTPHONE_NEW");
      }

      // render
      if (cols[2] != undefined) {
        $("input[name='render']").attr("value", cols[2]); // fetch? or render?
      } else {
        $("input[name='render']").attr("value", false); // fetch? or render?
      }

      $("#wmxbot-fetch-form").submit();
    }
  });

  $fileInput.change(function(){
    $.each(this.files, function(i, f) {
      var reader = new FileReader();
      reader.onload = (function(e) {
        var rawTxt = e.target.result;
        console.log("rawTxt: " + rawTxt); //xxx
        port.postMessage({
          'type': 'init',
          'rawTxt': rawTxt
        });

      });
      reader.readAsText(f);
    });
  });


  setTimeout(function() {
    var $captcha = $(".jfk-button-disabled:contains(Fetch)");
    if ($captcha.length == 0) {
      port.postMessage({
        'type' : 'next'
      });
    } else {
      // pause. captcha shows up
      var $continueButton = $("<input type='button' value='Continue' />");
      $continueButton.click(function() {
        console.log("Deal with capture and then continue"); //xxx
        port.postMessage({
          'type' : 'next'
        });

      });

      $container.append($continueButton);
    }
  }, 4000);

});

// <form action="/webmasters/tools/wmxbot-fetch-ac?authuser=3" method="POST" name="wmxbot-fetch-form" id="wmxbot-fetch-form"><input type="hidden" name="security_token" value="CUlJLTx2C_Xw2_BHMp5CyUTCvDI:1524989982186"><input type="hidden" name="redirectTarget" value="">
// <input type="hidden" name="hl" value="en">
// <input type="hidden" name="siteUrl" value="http://packershack.com/">

// <div class="errorbox-good"></div>
// <input type="hidden" name="redirectParams" value="">
// <div id="wmxbot-action-section">
// <div id="url-container"><div id="url-label">http://packershack.com/</div>
// <div id="path-input-container"><input type="text" id="path-input" name="path" maxlength="2048" value="" class="urlfield jfk-textinput ">
// <div id="path-messages" class="subduedtext"><div>Leave URL blank to fetch the homepage.
// Requests may take a few minutes to process.</div>
// </div></div></div>
// <div id="wmxbot-buttons-container"><div id="wmxbot-strategy-dropdown-container" title=""><div id="wmxbot-strategy-dropdown-menu" class="goog-menu goog-menu-noicon hidden"><div class="goog-menuitem" title="DESKTOP">Desktop</div> <div class="goog-menuitem" title="SMARTPHONE_NEW">Mobile: Smartphone</div></div></div>
// <input type="hidden" id="wmxbot-strategy-hidden-input" name="type">
// <div id="wmxbot-submit-crawl-button" class="goog-inline-block"></div>
// <div id="wmxbot-submit-render-button" class="goog-inline-block"></div>
// <input type="hidden" id="wmxbot-render-enabled-hidden-input" name="render"></div></div></form>
// security_token=CUlJLTx2C_Xw2_BHMp5CyUTCvDI%3A1524989982186&redirectTarget=&hl=en&siteUrl=http%3A%2F%2Fpackershack.com%2F&redirectParams=&path=results%2Fagra%2Findia&type=DESKTOP&render=false

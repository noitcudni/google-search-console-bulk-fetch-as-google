$(document).ready(function(){
  // url : device type (DESKTOP vs SMARTPHONE_NEW) | render? (true or false)
  var buttonCss = {
    "background-color": "#d14836",
    "color": "#fff",
    "padding": "8px",
    "line-height": "27px",
  };
  // var $fileInput = $("<input id='fileInput' type='file' />");
  var $labelFileInput = $("<label for='fileInput'>Upload Your File</label>");
  var $fileInput = $("<input style='display:none' id='fileInput' type='file' />");
  $labelFileInput.css(buttonCss);
  var $container = $("<div id='lih-container'></div>");

  $("#wmxbot-action-section").append($container);
  $container.append($labelFileInput);
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
    console.log("onchange fileinput!: ", this.values);
    $.each(this.files, function(i, f) {
      var reader = new FileReader();
      reader.onload = (function(e) {
        var rawTxt = e.target.result.replace(/\r/g, "\n");
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
      var $labelContinueButton = $("<label for='continueButton' style='margin-left:10px'>Continue</label>")
      var $continueButton = $("<input style='display:none' id='continueButton' type='button' value='Continue' />");
      $labelContinueButton.css(buttonCss);
      $continueButton.click(function() {
        console.log("Deal with capture and then continue"); //xxx
        port.postMessage({
          'type' : 'next'
        });

      });

      $container.append($labelContinueButton);
      $container.append($continueButton);
    }
  }, 4000);

});

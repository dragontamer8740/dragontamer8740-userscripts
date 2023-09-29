// ==UserScript==
// @name        Unmask f95 Links
// @namespace   dragontamer8740.unmaskf95link
// @description redirect to unmasked page on f95
// @include     http://f95zone.to/masked/*
// @include     https://f95zone.to/masked/*
// @version     1
// ==/UserScript==

/* for GM 4.x compatibility, we are also forced to put my entire script in an
   async anonymous function wrapper and use the 'requests' api, instead of just
   copying the jquery code out of the page and running that. Unless I want to
   include a full copy of jquery in this script, which I don't.
   
   Maybe XMLHttpRequest would work fine, but I've had problems with it and CORS,
   etc. in modern browsers. */

(async function() {


  /* the above doesn't work in modern ff/greasemonkey because i can't use the
     in-page copy of jquery. And I really don't watch to fetch jquery in the
     script itself. So I had to rewrite the `$.ajax()` line to not use jquery
     anymore. */

  /* Also I am bad at callbacks. Sorry about the ugly code. */
  try {
    async function grablink() {
      try {
        var payload = {
          'xhr': 1,
          'download': 1
        }
        var request = new Request(window.location, {
          method: 'post',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'DNT': 1
          },
          body: 'xhr=1&download=1'
        });
        var v = await fetch(request).then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        return v;
      }
      catch(e) {
        console.log("failure with async request. RIP, programmer :(");
        throw(e);
      }
    }
    
    var res=await grablink();
    console.log(res);
    if(res.status == "captcha") {
      console.log("Need a captcha!");
      alert("captcha required. Sorry.");
    }
    else {
      /* alert(res.msg);*/
      window.location=res.msg;
    }
  }
  catch
  {
    throw(e);
  }
/*
  {
  try {
  $.ajax({
  data: {
  xhr: 1,
  download: 1
  },
  success: function(a) {
  window.location=a.msg;
  }
  });
  }
  catch(e) {
  try {
  window.$.ajax({
  data: {
  xhr: 1,
  download: 1
  },
  success: function(a) {
  window.location=a.msg;
  }
  });
  }
  catch(e) {
  console.log("userscript: Couldn't get access to in-page jquery object, or something else failed");
  throw(e);
  }
  }
  }
*/

})();

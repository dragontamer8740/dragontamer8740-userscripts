// ==UserScript==
// @name        Unmask f95 Links
// @namespace   dragontamer8740.unmaskf95link
// @description redirect to unmasked page on f95
// @include     http://f95zone.to/masked/*
// @include     https://f95zone.to/masked/*
// @version     1
// @grant       GM_setClipboard
// @grant       GM.setClipboard
// @grant       unsafeWindow
// ==/UserScript==

/* needs unsafeWindow to use '$' (jquery, i assume), since f95 uses jquery to
   perform the ajax request and I really hate doing requests in js when i could
   just repurpose the existing function in the page. */

/* edit: nope, doesn't work in modern ff because fuck you, that's why. */

/* so instead I need to reload the in-page jquery resource instead, or rewrite the
   `$.ajax()` call. because fuck you, that's why. */


/* Polyfill for Greasemonkey 3 and 4 compatibility (for seamonkey/pale moon) */
/* GM4 GM3 compatibility test */
/* BEGIN POLYFILL */
if (typeof GM == 'undefined') {
  this.GM = {};
}


if (typeof GM_addStyle == 'undefined') {
  this.GM_addStyle = (aCss) => {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    if (head) {
      let style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.textContent = aCss;
      head.appendChild(style);
      return style;
    }
    return null;
  };
}


if (typeof GM_registerMenuCommand == 'undefined') {
  this.GM_registerMenuCommand = (caption, commandFunc, accessKey) => {
    if (!document.body) {
      if (document.readyState === 'loading'
          && document.documentElement && document.documentElement.localName === 'html') {
        new MutationObserver((mutations, observer) => {
          if (document.body) {
            observer.disconnect();
            GM_registerMenuCommand(caption, commandFunc, accessKey);
          }
        }).observe(document.documentElement, {childList: true});
      } else {
        console.error('GM_registerMenuCommand got no body.');
      }
      return;
    }
    let contextMenu = document.body.getAttribute('contextmenu');
    let menu = (contextMenu ? document.querySelector('menu#' + contextMenu) : null);
    if (!menu) {
      menu = document.createElement('menu');
      menu.setAttribute('id', 'gm-registered-menu');
      menu.setAttribute('type', 'context');
      document.body.appendChild(menu);
      document.body.setAttribute('contextmenu', 'gm-registered-menu');
    }
    let menuItem = document.createElement('menuitem');
    menuItem.textContent = caption;
    menuItem.addEventListener('click', commandFunc, true);
    menu.appendChild(menuItem);
  };
}


if (typeof GM_getResourceText == 'undefined') {
  this.GM_getResourceText = (aRes) => {
    'use strict';
    return GM.getResourceUrl(aRes)
      .then(url => fetch(url))
      .then(resp => resp.text())
      .catch(function(error) {
        GM.log('Request failed', error);
        return null;
      });
  };
}


Object.entries({
  'log': console.log.bind(console),  // Pale Moon compatibility.  See #13.
  'info': GM_info,
}).forEach(([newKey, old]) => {
  if (old && (typeof GM[newKey] == 'undefined')) {
    GM[newKey] = old;
  }
});


Object.entries({
  'GM_addStyle': 'addStyle',
  'GM_deleteValue': 'deleteValue',
  'GM_getResourceURL': 'getResourceUrl',
  'GM_getValue': 'getValue',
  'GM_listValues': 'listValues',
  'GM_notification': 'notification',
  'GM_openInTab': 'openInTab',
  'GM_registerMenuCommand': 'registerMenuCommand',
  'GM_setClipboard': 'setClipboard',
  'GM_setValue': 'setValue',
  'GM_xmlhttpRequest': 'xmlHttpRequest',
  'GM_getResourceText': 'getResourceText',
}).forEach(([oldKey, newKey]) => {
  let old = this[oldKey];
  if (old && (typeof GM[newKey] == 'undefined')) {
    GM[newKey] = function(...args) {
      return new Promise((resolve, reject) => {
        try {
          resolve(old.apply(this, args));
        } catch (e) {
          reject(e);
        }
      });
    };
  }
});

/* END OF POLYFILL */

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

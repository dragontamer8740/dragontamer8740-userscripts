// ==UserScript==
// @name        BE Addventure Option Hotkeys
// @namespace   dragontamer8740.bearchivehotkeys
// @description Add keybindings for selecting where to go. 
// @include     http://old.bearchive.com/~addventure/*
// @match       http://old.bearchive.com/~addventure/*
// @include     https://old.bearchive.com/~addventure/*
// @match       https://old.bearchive.com/~addventure/*
// @include     http://addventure.bearchive.com/~addventure/*
// @match       http://addventure.bearchive.com/~addventure/*
// @include     https://addventure.bearchive.com/~addventure/*
// @match       https://addventure.bearchive.com/~addventure/*
// @version     1
// @grant       GM_getValue
// @grant       GM.getValue
// @grant       GM_setValue
// @grant       GM.setValue
// ==/UserScript==

/*
   This script lets you navigate through choices in BEA by hitting the
   appropriate number keys on your keyboard, eliminating the need to use a
   mouse for most tasks.

   Other keyboard shortcuts:

   <- (left arrow)  : "Go back"
                 b  : "Go back"

   -> (right arrow) : Go forward (when paging back, this script keeps a log of
                      the path you traversed so you can hopefully return to
                      your starting point). Don't depend on this behavior, it
                      will notably fail to operate correctly in some
                      situations, especially with multiple tabs.
   
*/


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
   async anonymous function wrapper and use await on GM.getValue() calls. */
(async function() {

  var nextpage=await GM.getValue("forwardPage", '');
  var visited=await GM.getValue("lastVisited", '');
  console.log(nextpage);
  if(nextpage) {
    nextpage=JSON.parse(nextpage);
  }
  else
  {
    nextpage = [ ]; /* empty array */
  }
  GM.setValue("lastVisited", window.location.href);
  var tmp;
  /* remember up to 10 levels */
  if(nextpage.length > 0) {
    while(nextpage.length > 10)
    {
      nextpage=nextpage.slice(1,(nextpage.length-1));
    }
  }

  
  var aa=document.querySelectorAll('a');
  var i=0;
  var backindex=-1;
  var pagelinks;
  var backCandidates = [ ];
  while(i<aa.length)
  {
    if(aa[i].innerHTML === "Go back")
    {
      backCandidates.push(i)
      backindex=i;
      i=aa.length; // stop iterating
      pagelinks=aa;
    }
    
    else {
      aa[i].addEventListener("click", 
                             function (event) {
                               event.preventDefault();
                               /* clear forward stack */
                               GM.setValue("forwardPage", '');
                               window.location = this.href;
                             },
                             false)
    }
    i++;
  }

  backindex = backCandidates.pop();
  /*
     we want the LAST "go back" on the page to be the one we use... so now all
     the other candidates need to get bindings set on them.
   */
  while (backCandidates.length > 0) {
    aa[backCandidates.pop()].addEventListener("click", 
                           function (event) {
                             event.preventDefault();
                             /* clear forward stack */
                             GM.setValue("forwardPage", '');
                             window.location = this.href;
                           },
                           false)
  }
  

 

  window.addEventListener('keyup', function(event) {
    //window.onkeyup = function(event) {
    /* if we aren't inputting text on the page: */
    if(pagelinks)
    {
      var pgIndex=-1;
      if(document.activeElement.tagName != "INPUT" && document.activeElement.tagName != "TEXTAREA" )
      {
        var key=event.which||event.keyCode;
        if(key >= 49 && key <=57)
        {
          event.preventDefault();
          pgIndex=key-48; /* indices start at 1 here. ugh. */
          if((pgIndex) < backindex ) // don't look for entry 5 if there are only 4 entries
          {
            /* clear all 'forward' values */
            GM.setValue("forwardPage", '');
            window.location=pagelinks[pgIndex].href;
          }
        }
        else if(key >= 97 && key <=105) /* numpad digits */
        {
          event.preventDefault();
          pgIndex=key-96;
          if((pgIndex) < backindex)
          {
            GM.setValue("forwardPage", '');
            window.location=pagelinks[pgIndex].href;
          }
        }
        else
        {
          switch(key)
          {
            case 66: // 'b'
            case 37: // left arrow
            event.preventDefault();
            nextpage.push(window.location.href);
            GM.setValue("forwardPage", JSON.stringify(nextpage));
            window.location=pagelinks[backindex];
            break;
            case 39: // right arrow
            console.log("aa: " + JSON.stringify(nextpage));
            if(nextpage && (nextpage.length > 0)) {
              event.preventDefault();
              var navto=nextpage.pop();
              console.log("navto: " + navto);
              if(nextpage.length > 0) {
                GM.setValue("forwardPage", JSON.stringify(nextpage));
              }
              else {
                GM.setValue("forwardPage", '');
              }
              if(navto) {
                window.location=navto;
              }
/*              alert(JSON.stringify(nextpage));*/
            }
            break;
          }
        }
      }
    }
  });
})(); /* end of async wrapper */

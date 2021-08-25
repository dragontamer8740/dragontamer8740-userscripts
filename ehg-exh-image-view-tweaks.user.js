// ==UserScript==
// @name        X Image View Tweaks (hide top bar in galleries, image scaling)
// @namespace   dragontamer8740.xhideTopBar
// @description Make image start at top of display. Adds keybindings for fitting to height, width, original size.
// @include     https://exhentai.org/s/*
// @include     http://exhentai.org/s/*
// @include     https://e-hentai.org/s/*
// @include     http://e-hentai.org/s/*
// @version     1
// @grant       GM_getValue
// @grant       GM.getValue
// @grant       GM_setValue
// @grant       GM.setValue
// ==/UserScript==
/*GM_setValue("foo", "bar")*/



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

  // easily allow opting out of fullscreen functionality
  var ALLOW_FULLSCREEN = false;


  var is_changing_page = false;
  // at run-at      document-start

  var i1=document.getElementById("i1");
  /* move title below image */
  var h1=document.querySelector("h1");
  if(h1){
    h1=h1.cloneNode(true);
  }
  document.querySelectorAll("h1")[0].setAttribute("id","toHide");

  var i2=document.getElementById("i2").cloneNode(true);

  var i4=document.getElementById("i4");

  var s = document.createElement("style");

  var currmode = { 
    varnam: await GM.getValue("viewMode", "orig"),
    varZoom: await GM.getValue("zoomLvl"),
    varIsFullscreen: await GM.getValue("isFullsc"),
    set modename(name) {
      this.varnam=name;
      /*
         "await"ing setValues doesn't work - so whatever.
         I think I understand why. There's no real reason to wait in this
         case anyway.
      */
      GM.setValue("viewMode", name);
      if(name != "zoom")
      {
        reapplyFit();
      }
    },
    get modename() { return this.varnam;},
    get zoomLevel() { return this.varZoom;},
    set zoomLevel(num) {
      this.varZoom=parseInt(num);
      GM.setValue("zoomLvl", parseInt(num));
    },
    get isFullscreen() { return this.varIsFullscreen },
    set isFullscreen(yesno) {
      this.varIsFullscreen=yesno;
      GM.setValue("isFullsc", yesno);
    }
  };
  
  // fullscreen function is the same everywhere unless I decide otherwise.
  function enterFullscreen()
  {
    if(ALLOW_FULLSCREEN == true)
    {
      document.querySelector('html').requestFullscreen();
    }
  }
  /* document.onfullscreenchange = function (event) {
     if (document.fullscreenElement) {
     console.log('setting true');
     currmode.isFullscreen=true;
     }
     }; */
  function reapplyFullscreen()
  {
    if(currmode.isFullscreen == true)
    {
      enterFullscreen()
    }
  }
  function leaveFullscreen()
  {
    if (document.exitFullscreen)
    {
      document.exitFullscreen();
      currmode.isFullscreen=false;
    }
  }
  function toggleFullscreen()
  {
    // check if global pref is enabled, as well as per-site pref. Right now, this is an opt-in basis.
    if (!document.fullscreenElement)
    {
      enterFullscreen();
      currmode.isFullscreen=true;
    }
    else
    {
      leaveFullscreen();
    }
  }


  s.type = "text/css";
  s.innerText = `
               h1#toHide {
                    display: none !important;
               }
               div#i2 {
                    display: none !important;
               }
               body {
                    padding-top: 0px !important;
               }
               div#i1 {
                    padding-top: 0px !important;
                    margin-top: 0px !important;
                    border-top-width: 0px !important;
               }
               div.sni img {
                    margin: 0px !important;
               }`
  document.head.appendChild(s);

  i1.appendChild(h1); 

  var img=document.getElementById("img");
  var imgContain = document.getElementById('img').parentNode.parentNode;
  var imgOrigHeight=img.style.height;
  var imgOrigWidth=img.style.width;

  img.style.margin="0px";

  /*i1.insertBefore(h1,i4);*/

  function fitHeight(store)
  {
    img=document.getElementById("img");
    img.style.width="auto";
    // don't stretch beyond 100%
    if(document.documentElement.clientHeight <= img.naturalHeight)
    {
      img.style.height="100vh";
    }
    else
    {
      img.style.height="100%";
    }
    img.style.margin="0px";
    if(store) {currmode.modename="height";}
  }

  function fitWidth(store)
  {
    img=document.getElementById("img");
    // don't stretch beyond 100%
    if(document.documentElement.clientWidth <= img.naturalWidth)
    {
      img.style.width="100vw";
    }
    else
    {
      img.style.width="100%";
    }
    img.style.height= "auto";
    img.style.margin= "0px";
    if(store) {currmode.modename="width";}
  }

  function origSize(store)
  {
    img=document.getElementById("img");
    img.style.width= "100%";
    img.style.height="100%";
    img.style.margin= "0px";
    if(store) {currmode.modename="orig";}
  }

  function zoomSize(store)
  {
    img=document.getElementById("img");
    img.style.height="auto";
    img.style.width=parseInt(currmode.zoomLevel) + '%'
    img.style.margin= "0px";
    if(store) { currmode.modename="zoom";}
  }

  function zoomBy(store, inc)
  {
    /* first reset zoom to 100% if not already in zoom mode */
    if(currmode.modename != "zoom") {
      img.style.height="auto";
      img.style.width="100%"
      currmode.zoomLevel=100;
    }
    img=document.getElementById("img");
    
    img.style.width=(parseInt(currmode.zoomLevel) + inc ) + '%';
    /*alert((parseInt(currmode.zoomLevel) + inc ) + '%');*/
    img.style.margin= "0px";
    if(parseInt(img.style.width) > 100)
    {
      currmode.zoomLevel=100;
      img.style.width="100%";
    }
    else
    {
      currmode.zoomLevel=parseInt(img.style.width);
    }
    if(store) { currmode.modename="zoom" };
  }

  /*function origSizeFull(store)
    {
    i1.style.maxHeight=null;
    i1.style.maxWidth=null;
    
    img.style.width= "100%";
    img.style.height="100%";
    img.style.maxHeight=null;
    img.style.maxWidth=null;
    img.style.margin= "0px";
    if(store) {currmode.modename="origFull";}
    }*/

  function bestFit(store)
  {
    img=document.getElementById("img");
    img.style.width= "100vw";
    img.style.height="auto";
    img.style.margin="0px";
    var windowaspectratio=document.documentElement.clientWidth / document.documentElement.clientHeight;
    var imgaspectratio=img.naturalWidth / img.naturalHeight;
    if(imgaspectratio < windowaspectratio) // image ratio is taller than screen aspect ratio, so fit to height
    {
      fitHeight(false);
    }
    else // if (imgaspectratio >= windowaspectratio) - image ratio is wider or the same as screen ratio, so fit to width
    {
      fitWidth(false);
    }
    if(store) {currmode.modename="fit";}
  }

  reapplyFullscreen();

  //if (not_reapplied){
  /* every 200 milliseconds, try to resize the image to the current setting until successful. */
  var not_reapplied=true;
  function wait_reapply(){
    img=document.getElementById("img");
    if (not_reapplied && img==null){
      setTimeout(wait_reapply, 200);
    } else {
      reapplyFit();
      not_reapplied=false;
    }
  }
  wait_reapply();

  document.getElementById("prev").onclick = function(){ };
  document.getElementById("next").onclick = function(){ };
  document.getElementById("img").parentElement.onclick = function(){ };
  document.getElementById("img").parentElement.removeAttribute("onclick");

  img.addEventListener('load', reapplyFit, false);

  /* we need to use 'keydown' for things where we want key-repeat to work.
     we have to make sure ctrl isn't being held down, though, or we block the
     browsers' native shortcuts. */
  window.addEventListener('keydown', function(event) {
    /* if we aren't inputting text on the page: */
    if(document.activeElement.tagName != "INPUT" && document.activeElement.tagName != "TEXTAREA" && !event.ctrlKey)
    {
      var key=event.which||event.keyCode;
      switch(key){
      case 173: /* - */
      case 109: /* numpad - */
        event.preventDefault();
        window.removeEventListener("resize", bestFit, false);
        zoomBy(true, -1); /* zoom out */
        break;
      case 61: /* '+' or '=' */
      case 107: /* numpad '+' */
        event.preventDefault();
        window.removeEventListener("resize", bestFit, false);
        zoomBy(true, 1); /* zoom in */
        break;
      }
    }
  });

  window.addEventListener('keyup', function(event) {
    /* if we aren't inputting text on the page: */
    if(document.activeElement.tagName != "INPUT" && document.activeElement.tagName != "TEXTAREA" )
    {
      var key=event.which||event.keyCode;
      switch(key){
      case 70: /* 'f' */
        if(ALLOW_FULLSCREEN == true)
        {
          event.preventDefault();
          toggleFullscreen();
        }
        break;
      case 72: /* 'h' */
        event.preventDefault();
        window.removeEventListener("resize", bestFit, false);
        fitHeight(true);
        break;
      case 87: /* 'w' */
        event.preventDefault();
        window.removeEventListener("resize", bestFit, false);
        fitWidth(true);
        break;  
      case 90: /* 'z' */
        event.preventDefault();
        window.removeEventListener("resize", bestFit, false);
        zoomSize(true);
        break;
      case 65: /* 'a' */
      case 86: /* 'v' */
        event.preventDefault();
        window.removeEventListener("resize", bestFit, false);
        origSize(true);
        break;
      case 66: /* 'b' */
        event.preventDefault();
        bestFit(true);
        window.addEventListener("resize", bestFit, false);
        break;
      case 37: // left
        event.preventDefault();
        window.location=document.getElementById("prev").href;
        break;
      case 39: // right
        event.preventDefault();
        window.location=document.getElementById("next").href;
        break;
      }
    }
  });

  function reapplyFit()
  {
    var mode=currmode.modename;
    switch(mode)
    {
      case "fit":
      window.removeEventListener("resize", bestFit, false);
      bestFit(false);
      window.addEventListener("resize", bestFit, false);
      break;
      case "width":
      window.removeEventListener("resize", bestFit, false);
      fitWidth(false);
      break;
      case "height":
      window.removeEventListener("resize", bestFit, false);
      fitHeight(false);
      break;
      case "zoom":
      window.removeEventListener("resize", bestFit, false);
      zoomSize(false);
      break;
      case "orig":
      window.removeEventListener("resize", bestFit, false);
      /*        origSize(); */ /* do nothing */
      break;
    }
  }


  /* AUTO FIT TO HEIGHT */
  /* will require more advanced inspection of DOM */

  /* try to fix height before image is done loading. Inelegant solution
     to wait for image to start loading so we know the size. */
  /* note: in future, check if html itself contains dimensions */
  /*window.setTimeout(reapplyFit, 800);*/

})(); /* end of async wrapper */

// ==UserScript==
// @name        Download with left click on swfchan
// @namespace   dragontamer8740.swfchanleftclickdownload
// @description Download with left click on swfchan
// @include     http://eye.swfchan.com/flash.asp?id=*
// @version     1
// @grant       none
// ==/UserScript==

/* strip event listener by replacing with a clone */

var aLink=document.querySelector("#hotl > a");
var aRef=aLink.href;
var newElem=document.createElement("a");
newElem.href=aLink.href;
newElem.innerText=aLink.innerText;

aLink.parentNode.replaceChild(newElem,aLink);

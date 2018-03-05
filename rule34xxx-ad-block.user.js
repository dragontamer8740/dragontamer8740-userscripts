// ==UserScript==
// @name        r34 block bottom ads
// @namespace   dragontamer8740.fuckExoclick
// @description Block ads below paginator on r34.xxx (eventually other boorus too)
// @version     1
// @include     https://rule34.xxx/*
// @match       https://rule34.xxx/*
// @include     http://rule34.xxx/*
// @match       http://rule34.xxx/*
// @run-at      document-start
// @grant       none
// ==/UserScript==
window.addEventListener('beforescriptexecute', function(e){
  if(e.target.innerHTML.includes("addEventListener") && e.target.innerHTML.includes("appendChild"))
     {
       // we've got a self modifying webpage of cancer.
       // EXTERMINATE with webpage modifying code :D
       e.target.innerHTML="";
       // remove our listener to make the page work better now
       window.removeEventListener(e.type, arguments.callee, true);
     }
}, true);

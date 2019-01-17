// ==UserScript==
// @name        booru block bottom exoclick ads
// @namespace   dragontamer8740.fuckExoclick
// @description Block ads below paginator on r34.xxx (eventually other boorus too)
// @version     1
// @include     https://rule34.xxx/*
// @match       https://rule34.xxx/*
// @include     http://rule34.xxx/*
// @match       http://rule34.xxx/*
// @include     http://hypnohub.net/*
// @match       http://hypnohub.net/*
// @include     https://hypnohub.net/*
// @match       https://hypnohub.net/*
// @run-at      document-start
// @grant       none
// ==/UserScript==

/* this is a pretty weird one as far as blocking scripts go. */
/* it seems that exoclick ads are being fed through some javascript which attempts to defeat
   blockers with inline JS loading stubs which only activate after the page has been loaded,
   after when adblockers seem to apply their blocks.
   
   This code should (if I myself remember what I did correctly months later) run before any
   inline javascript. The code itself checks the contents of said scripts with simple
   heuristic methods that prevent certain naughty/unwanted bahaviour from taking place.
   The rationale behind the chosen heuristics is that there is absolutely no good reason
   that any non-advertisement script on these pages would need to use the code segments
   i picked. Thus the only remaining purposes are subversive or advertising, both of which
   I disapprove of. */
   
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


/* hypnohub uses more tricks */
window.addEventListener('beforescriptexecute', function(e){
  if(e.target.innerHTML.includes("observe(\"dom:loaded\""))
     {
       // remove the entire script from the page so that nothing gets executed
       e.target.innerHTML="";
       // remove our listener to make the page work better now
       window.removeEventListener(e.type, arguments.callee, true);
     }
}, true);

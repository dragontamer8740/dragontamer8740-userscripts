// ==UserScript==
// @name        BE Addventure Option Hotkeys
// @namespace   dragontamer8740.bearchivehotkeys
// @description Add keybindings for selecting where to go.
// @include     http://old.bearchive.com/~addventure/*
// @match       http://old.bearchive.com/~addventure/*
// @include     https://old.bearchive.com/~addventure/*
// @match       https://old.bearchive.com/~addventure/*
// @version     1
// @grant       none
// ==/UserScript==

var aa=document.querySelectorAll('a');
var i=0;
var backindex=-1;
var pagelinks;
while(i<aa.length)
{
  if(aa[i].innerHTML.includes("Go back"))
  { 
    backindex=i;
    i=aa.length;
    pagelinks=aa;
  }
  i++;
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
          window.location=pagelinks[backindex].href;
          break;
        }
      }
    }
  }
});

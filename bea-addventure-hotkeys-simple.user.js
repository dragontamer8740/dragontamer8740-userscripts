// ==UserScript==
// @name        BE Addventure Option Hotkeys - Simple
// @namespace   dragontamer8740.bearchivehotkeys.simple
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
// @grant       none
// ==/UserScript==

/*
   This script lets you navigate through choices in BEA by hitting the
   appropriate number keys on your keyboard, eliminating the need to use a
   mouse for most tasks.

   1                : Option 1
   2                : Option 2
   ...
   6                : Option 6

   Other keyboard shortcuts:

   <- (left arrow)  : "Go back"
                 b  : "Go back"
   
*/

/*
 * list of "all 'a'" tags (links) on the page
 */
var aa = document.querySelectorAll('a');

/*
 * general-purpose iterator
 */
var i = aa.length - 1;

/*
 * index (result number) in list of all links to use for going back
 */
var backindex = -1;

/*
 * This gets set if we found "Go back" and it looks to be a proper addventure
 * page. I forget why I did it this way now, but it works, so whatever.
 */
var pagelinks;

while(i >= 0) {
  if(aa[i].innerHTML === ("Go back"))
  {
    backindex=i;
    i = 0; /* stop iterating (i will be set to -1 by outer loop) */
  }
  i--;
}

if(backindex >= 0) { /* found at least one match */
  pagelinks = aa; /* let key binding bit know this is probably a valid page */
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

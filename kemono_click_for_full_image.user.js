// ==UserScript==
// @name        kemono click for full image 
// @namespace   dragontamer8740.kemonoClick
// @description Click to follow image links instead of expanding in current page.
// @include     http://kemono.party/*
// @include     https://kemono.party/*
// @version     1
// @grant       none
// ==/UserScript==

function listenBlock(obj, eventType, keycode)
{
  obj.addEventListener(eventType, function(event) {
    var key;
    if(eventType=="click")
    {
        key= event.button // || event.which
    }
    else // assume it is a keystroke i guess
    {
        key=event.which|| event.keyCode;
    }
    if(key==keycode || keycode == null)
    {
      event.stopPropagation();
      /* event.preventDefault(); */
    }
  }, true); /* true for event capture */
}

listenBlock(document, 'click', 1); // 2==middle click, apparently, for event.which; event.button middle click is 1

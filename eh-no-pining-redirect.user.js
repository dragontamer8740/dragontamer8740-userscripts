// ==UserScript==
// @name        ENoRedir
// @namespace   dragontamer8740.ENoRedir
// @description Don't automatically redirect to homepage when pining for the fjords.
// @include     http://e-hentai.org/s/*
// @include     https://e-hentai.org/s/*
// @include     http://exhentai.org/s/*
// @include     https://exhentai.org/s/*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==


if(document.title=="Gallery Not Available - E-Hentai Galleries")
  {
    window.addEventListener('beforescriptexecute', function(e) {
    var regex = /setTimeout/i;
    if(regex.test(e.target.text)){
        e.stopPropagation();
        e.preventDefault();
    }
    }, true);
    function gotonext()
    {
      return true;
    }
  }

/* remove the following line:
 * "You will be redirected to the front page momentarily."
*/
document.querySelector(".d p:nth-child(2)").innerHTML=""

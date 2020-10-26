// ==UserScript==
// @name        EHF Dark (Fusion) Quote and Code Block Color Fixes
// @namespace   dragontamer8740.ehfFusionFixes
// @description Miscellaneous fixes for EH Forums' dark theme ('fusion')
// @include     http://forums.e-hentai.org/*
// @include     https://forums.e-hentai.org/*
// @version     1
// @grant       none
// ==/UserScript==

var headStyles=document.head.querySelectorAll('style[type="text/css"]');
// Could do a normal querySelector, but I have to make sure no other scripts
// have added styles, so we search until we find css_27.css or run out of
// elements to look through.
// Fusion's theme ID is 27; Ambience (the default) is 26.

var i=0;
while(i<headStyles.length)
{
  if(headStyles[i].innerHTML.includes('style_images/css_27.css'))
  {
    var s=document.createElement("style");
    s.type="text/css";
    s.innerText=`
      /* Fixes for forum Fusion (dark) theme legibility on quote and code block headings */
      .codetop, .sqltop, .htmltop, .quotetop {
        color: #f1f1f1 !important;
      }
    `;
    document.head.appendChild(s);
    i=headStyles.length; // don't keep looping, we've found the Fusion theme (id 27).
  }
  i++;
}

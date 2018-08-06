// ==UserScript==
// @name        Thumbnail height set
// @namespace   dragontamer8740.thumbHeight
// @description changes thumbnail height to allow more text in results. use along with usercontent.css.
// @include        http://g.e-hentai.org/*                                      
// @include        http://e-hentai.org/*                                        
// @include        http://exhentai.org/*                                        
// @include        https://g.e-hentai.org/*                                     
// @include        https://e-hentai.org/*                                       
// @include        https://exhentai.org/*                                       
// @match          http://g.e-hentai.org/*                                      
// @match          http://e-hentai.org/*                                        
// @match          http://exhentai.org/*                                        
// @match          https://g.e-hentai.org/*                                     
// @match          https://e-hentai.org/*                                       
// @match          https://exhentai.org/*  
// @version     1
// @grant       none
// ==/UserScript==
var list=document.querySelectorAll(".id1");
var len=list.length;
var i=0;
while(i<len)
{
  var elem=list[i];
  elem.setAttribute("style", elem.getAttribute("style").replace("350px","365px"));
  i++;
}

/* usercontent.css:
@-moz-document url-prefix(http://exhentai.org/),url-prefix(https://exhentai.org/),url-prefix(http://e-hentai.org/),url-prefix(https://e-hentai.org/)
{
  div.id2
  {
    -moz-appearance: none !important;
    max-height: 65px !important;
    min-height: 30px !important;
    display: table-cell !important;
    vertical-align: middle !important;
  }
}
*/

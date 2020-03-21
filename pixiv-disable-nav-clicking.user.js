// ==UserScript==
// @name        Pixiv disable nav clicking
// @namespace   dragontamer8740.pixivDisableNavClick
// @description Disable the top and bottom portions of the screen progressing/moving back in albums/manga
// @include     http://www.pixiv.net/member_illust.php?*illust_id=*
// @include     https://www.pixiv.net/member_illust.php?*illust_id=*
// @version     1
// @grant       none
// ==/UserScript==

/*var navbtns=document.querySelectorAll("div[role='presentation'] button");
var i=0;
while(i<navbtns.length)
{
  navbtns[i].style.display='none';
  i++;
}*/


var s = document.createElement("style");
s.type = "text/css";
s.innerText = `div[role='presentation'] button {
  display: none !important;
}
`;

               
               
document.head.appendChild(s);


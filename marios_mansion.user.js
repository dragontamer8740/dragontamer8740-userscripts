// ==UserScript==
// @name        Mario's Mansion
// @namespace   dragontamer8740.mariosMansion
// @description Evict Luigi
// @include     http://forums.e-hentai.org/index.php?*showtopic=*
// @include     https://forums.e-hentai.org/index.php?*showtopic=*
// @include     https://forums.e-hentai.org/index.php?*st=*
// @include     https://forums.e-hentai.org/index.php?*st=*
// @version     1
// @grant       none
// ==/UserScript==
var posts=document.querySelectorAll(".postdetails .bigusername a[href$='index.php?showuser=5175192']");
function findParentTable(elem) {
  while(elem && elem.tagName.toUpperCase() !== 'TABLE')
    elem=elem.parentElement;
  return elem;
}
posts.forEach(p => findParentTable(p).setAttribute('style', 'display: none'));

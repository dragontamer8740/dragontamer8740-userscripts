// ==UserScript==
// @name        Mario's Mansion
// @namespace   dragontamer8740.mariosMansion
// @description Evict Luigi
// @include     /^https?://forums\.e-hentai\.org/index\.php?.*showtopic=.*$/
// @include     /^https?://forums\.e-hentai\.org/index\.php?.*st=.*$/
// @version     1
// @grant       none
// ==/UserScript==
// to add more users, add a comma after the first user ID in the list and then your additional ID.
// example:   [ 5175192, 4544793 ];
var userlist= [ 5175192 ];
function findParentTable(elem) {
  while(elem && elem.tagName.toUpperCase() !== 'TABLE')
    elem=elem.parentElement;
  return elem;
}
function filterUser(id) {
  var posts=document.querySelectorAll(".postdetails .bigusername a[href$='index.php?showuser=" + id + "']");
  posts.forEach(p => findParentTable(p).setAttribute('style', 'display: none'));
}
userlist.forEach(u => filterUser(u));

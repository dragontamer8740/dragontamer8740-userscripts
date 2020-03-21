// ==UserScript==
// @name        EHFSearch
// @namespace   dragontamer8740.ehfSearch
// @description When searching in the EH Forums, default to searching for posts rather than threads.
// @include     https://forums.e-hentai.org/index.php?act=Search&f=
// @version     1
// @grant       none
// ==/UserScript==
var searchposts=document.querySelector("input#result_posts");
if(searchposts)
{
  searchposts.checked=true;  
}

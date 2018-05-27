// ==UserScript==
// @name        tumblr image set raw image source links
// @namespace   dragontamer8740.tumblrRawSourceLinks
// @description makes _1280 image url's instead link to the raw images. Currently only works on photo sets, not individual photos.
// @include     http://*.tumblr.com/*/photoset_iframe/*
// @include     https://*.tumblr.com/*/photoset_iframe/*
// @version     1
// @grant       none
// ==/UserScript==

for(let value of document.querySelectorAll("a"))
{
  var url=value.href;
  url=url.replace(/^https:\/\//,"http://")
  url=url.replace(/[0-9]+\.media/,"data");
  url=url.replace(/_1280\./,"_raw.");
  value.href=url;
}

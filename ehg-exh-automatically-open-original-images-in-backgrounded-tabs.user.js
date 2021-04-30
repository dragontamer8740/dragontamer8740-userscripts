// ==UserScript==
// @name        Automatically open original images in background tabs
// @namespace   dragontamer8740.xTabAutoOrig
// @description Load original images if tabs are backgrounded after 3 seconds. Hooks off of the hotkey script, so must execute after it.
// @version     1
// @include     https://exhentai.org/s/*
// @include     http://exhentai.org/s/*
// @include     https://e-hentai.org/s/*
// @include     http://e-hentai.org/s/*
// @include     https://exhentai.org/g/*
// @include     http://exhentai.org/g/*
// @include     https://e-hentai.org/g/*
// @include     http://e-hentai.org/g/*
// @include     http://exhentai.org/*
// @include     https://exhentai.org/*
// @include     http://rule34.xxx/index.php*
// @include     https://rule34.xxx/index.php*
// @include     http://rule*.paheal.net/post/view/*
// @include     https://rule*.paheal.net/post/view/*
// @include     http://e621.net/post/show/*
// @include     https://e621.net/post/show/*
// @include     http://e621.net/posts/*
// @include     https://e621.net/posts/*
// @include     http://chan.sankakucomplex.com/post/show/*
// @include     https://chan.sankakucomplex.com/post/show/*
// @include     http://*.furaffinity.net/view/*/
// @include     https://*.furaffinity.net/view/*/
// @include     http://*.furaffinity.net/full/*/
// @include     https://*.furaffinity.net/full/*/
// @include     http://*.furaffinity.net/gallery/*/
// @include     https://*.furaffinity.net/gallery/*/
// @include     http://*.weasyl.com/*/submissions/*
// @include     https://*.weasyl.com/*/submissions/*
// @include     http://*.weasyl.com/*/submissions/*/*
// @include     https://*.weasyl.com/*/submissions/*/*
// @include     http://derpibooru.org/images/*
// @include     https://derpibooru.org/images/*

// @grant       unsafeWindow
// ==/UserScript==
// unsafeWindow allows us to call scripts exported by hotkey script.
// we only allow things other than the basic ehg/s/ stuff so that we can turn off the script from the menu while anywhere on the site
function doFocusCheckOpen() {
  if(!document.hasFocus())
  {
    unsafeWindow.openImgHere();
  }
}

// setInterval(doFocusCheck, 2000);
var urlwoprot=window.location.href.replace(/(^\w+:|^)\/\//, '');
if(urlwoprot.startsWith("exhentai.org/s/") | urlwoprot.startsWith("e-hentai.org/s/"))
{
  setTimeout(doFocusCheckOpen, 1500);
}
else if( window.location.origin.endsWith("rule34.xxx"))
{
  if(/\?s\=view|&s\=view/i.test(window.location.href) )
  {
    setTimeout(doFocusCheckOpen, 3000);
  }
}
else if(urlwoprot.startsWith("e621.net/posts/"))
{
  setTimeout(doFocusCheckOpen, 1500);
}
else if (urlwoprot.startsWith("chan.sankakucomplex.com"))
{
  setTimeout(doFocusCheckOpen, 2250);
}
else if (urlwoprot.startsWith("derpibooru.org/images/"))
{
  setTimeout(doFocusCheckOpen, 2500);
}
else if (urlwoprot.startsWith("www.furaffinity.net/view/"))
{
  setTimeout(doFocusCheckOpen, 1500);
}
else if(window.location.origin.endsWith("weasyl.com"))
{
  setTimeout(doFocusCheckOpen, 3000);
}
else /* default */
{
  setTimeout(doFocusCheckOpen, 1500);
}

if(document.title=="503 Backend fetch failed")
{
    setTimeout(function(){ location.reload(); }, 2*1000);
}
else if (document.title=="I Just Don't Know What Went Wrong")
{
    setTimeout(function(){ location.reload(); }, 2*1000);
}
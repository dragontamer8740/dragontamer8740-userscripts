// ==UserScript==
// @name        X Site Hotkeys
// @namespace   dragontamer8740.openImageInTab
// @description Open an X image at full size in a new browser tab when 'i' is pressed, or current tab when 'o' is. Also adds some arrow key navigation to pages as a bonus.
// @include     https://exhentai.org/s/*
// @include     http://exhentai.org/s/*
// @include     https://e-hentai.org/s/*
// @include     http://e-hentai.org/s/*
// @include     https://exhentai.org/g/*
// @include     http://exhentai.org/g/*
// @include     https://e-hentai.org/g/*
// @include     http://e-hentai.org/g/*
// @include     https://inkbunny.net/s/*
// @include     http://inkbunny.net/s/*
// @include     https://inkbunny.net/submissionview.php*
// @include     http://inkbunny.net/submissionview.php*
// @include     http://e621.net/post/show/*
// @include     https://e621.net/post/show/*
// @include     http://rule34.xxx/index.php*
// @include     https://rule34.xxx/index.php*
// @version     1
// @grant       none
// ==/UserScript==

/* to override later */
function openImgTab(){
  alert("No function defined for opening the image in new tab on this page. Something's wrong.");
}
function openImgHere(){
  alert("No function defined for opening the image on this page. Something's wrong.");
}
function nextImg(){
  return;
}
function prevImg(){
  return;
}

/*
 * nextImg() gives the next image in the current set. If we are at the end of
 * a set of images (or our set of images is 1 large), go to the next
 * submission in the gallery (on Inkbunny). This is bound to the right arrow
 * key.
 * 
 * prevImg() does the opposite of this and is bound to the left arrow key.
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ====================START INKBUNNY DEFINES==================== */
if(window.location.origin.endsWith("inkbunny.net"))
{
  function nextImg()
  {
    var candidates=document.querySelectorAll("a"); /* wish I knew a better css selector */
    var i=0;
    var nextPgLink=null;
    while(i < candidates.length)
    {
      if(candidates[i].innerHTML==="next")
      {
        nextPgLink=candidates[i].href;
        i=candidates.length; /* stop iterating */
      }
      i++;
    }
    if(nextPgLink)
    {
      window.location=nextPgLink;
    }
  }
  function prevImg()
  {
    var candidates=document.querySelectorAll("a"); /* wish I knew a better css selector */
    var i=0;
    var prevPgLink=null;
    while(i < candidates.length)
    {
      if(candidates[i].innerHTML==="previous")
      {
        prevPgLink=candidates[i].href;
        i=candidates.length; /* stop iterating */
      }
      i++;
    }
    if(prevPgLink)
    {
      window.location=prevPgLink;
    }
  }
  function getDlLink() /* inkbunny specific since I need more logic to get the download link than w/ others */
  {
    var dlLinkCandidates=document.querySelectorAll('a[target^="_blank"] > span');
    var i=0;
    var dlLink=null;
    while(i < dlLinkCandidates.length){  
      if(dlLinkCandidates[i].innerHTML.startsWith("Download"))
      {
        dlLink=dlLinkCandidates[i].parentNode.href;
        i=dlLinkCandidates.length; /* stop iterating */
      }
      if(!dlLink) /* if there is no 'download' button */
      {
        dlLink=document.getElementById("magicbox").src;
      }
      i++;
    }
    return dlLink;
  }
  
  function openImgTab()
  {
    var dlLink=getDlLink();
    if(dlLink)
    {
      window.open(dlLink);
    }
    else
    {
      // full image is already being viewed; there is no "download original" button
      console.log("Cannot find a download link. Might need to update or fix the script?");
    }
  }

  function openImgHere(){
    var dlLink=getDlLink();
    if(dlLink)
    {
      window.location=dlLink;
    }
    else
    {
      // full image is already being viewed; there is no "download original" button
      console.log("Cannot find a download link. Might need to update or fix the script?");
    }
  }
}
/* ====================END INKBUNNY DEFINES==================== */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ====================BEGIN EHG DEFINES==================== */
else if( Boolean(window.location.origin.endsWith("exhentai.org") | window.location.origin.endsWith("e-hentai.org")))
{
  /* nextImg() and prevImg() have functionality the site already covers. But for the gallery
     thumbnails view we can page left and right using the same nav keys so we have to handle
     that for gallery pages specifically. */
  function nextImg()
  {
    var urlwoprot=window.location.href.replace(/(^\w+:|^)\/\//, '');
    if(urlwoprot.startsWith("exhentai.org/g/") | urlwoprot.startsWith("e-hentai.org/g/"))
    {
      nextPgXThumb();
    }
    /* don't do anything if not on a /g/ page (let it handle things) */
  }
  function prevImg()
  {
    var urlwoprot=window.location.href.replace(/(^\w+:|^)\/\//, '');
    if(urlwoprot.startsWith("exhentai.org/g/") | urlwoprot.startsWith("e-hentai.org/g/"))
    {
      prevPgXThumb();
    }
    /* don't do anything if not on a /g/ page (let it handle things) */
  }
  function nextPgXThumb(){ /* go to next page of thumbnails for a gallery on ehg */
    var candidates=document.querySelectorAll("a"); /* wish I knew a better css selector */
    var i=0;
    var nextPgLink=null;
    while(i < candidates.length)
    {
      if(candidates[i].innerHTML==="&gt;")
      {
        nextPgLink=candidates[i].href;
        i=candidates.length; /* stop iterating */
      }
      i++;
    }
    /* If the next page wasn't found, Go to the next submission instead. */
    if(nextPgLink)
    {
      window.location=nextPgLink;
    }
  }
  function prevPgXThumb(){ /* go to previous page of thumbnails for a gallery on ehg */
    var candidates=document.querySelectorAll("a"); /* wish I knew a better css selector */
    var i=0;
    var prevPgLink=null;
    while(i < candidates.length)
    {
      if(candidates[i].innerHTML==="&lt;")
      {
        prevPgLink=candidates[i].href;
        i=candidates.length; /* stop iterating */
      }
      i++;
    }
    if(prevPgLink)
    {
      window.location=prevPgLink;
    }
  }
  function openImgTab(){
    var dlLink=document.querySelector("div#i7 > a");
    if(dlLink)
    {
      window.open(dlLink.href);
    }
    else
    {
      // full image is already being viewed; there is no "download original" button
      window.open(document.querySelector("div#i3 > a > img").src);
    }
  }

  function openImgHere(){
    var dlLink=document.querySelector("div#i7 > a");
    if(dlLink)
    {
      window.location=dlLink.href;
    }
    else
    {
      // full image is already being viewed; there is no "download original" button
      window.location=document.querySelector("div#i3 > a > img").src;
    }
  }
}
/* ====================END EHG DEFINES==================== */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ====================BEGIN E621 DEFINES==================== */
else if(window.location.origin.endsWith("e621.net"))
{
  function nextImg()
  {
    var i=0;
    var candidates=document.querySelectorAll("li > a[href^='/post/show']");
    var nextPgLink=null;
    while(i<candidates.length)
    {
      if(candidates[i].innerHTML==="Next")
      {
        nextPgLink=candidates[i].href;
        i=candidates.length;
      }
      i++;
    }
    if(nextPgLink){
      window.location=nextPgLink;
    }
  }
  function prevImg()
  {
    var i=0;
    var candidates=document.querySelectorAll("li > a[href^='/post/show']");
    var prevPgLink=null;
    while(i<candidates.length)
    {
      if(candidates[i].innerHTML==="Previous")
      {
        prevPgLink=candidates[i].href;
        i=candidates.length;
      }
      i++;
    }
    if(prevPgLink){
      window.location=prevPgLink;
    }
  }
  function openImgTab()
  {
    var i=0;
    var candidates=document.querySelectorAll("a#highres");
    while(i<candidates.length){
      if(candidates[i].href)
      {
        var dlLink=candidates[i].href;
        i=candidates.length;
        window.open(dlLink);
      }
      i++;
    }
  }

  function openImgHere()
  {
    var i=0;
    var candidates=document.querySelectorAll("a#highres");
    while(i<candidates.length){
      if(candidates[i].href)
      {
        var dlLink=candidates[i].href;
        i=candidates.length;
        window.location=dlLink;
      }
      i++;
    }
  }
}
/* ====================END E621 DEFINES==================== */


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ====================BEGIN R34.XXX DEFINES==================== */
/* make sure we're on a "image view" page, not a result list etc */
/* (found by checking url param s=view) */
else if( window.location.origin.endsWith("rule34.xxx") && /\?s\=view|&s\=view/i.test(window.location.href) )
{
  var dlLink=document.querySelector("div#post-view div.sidebar div ul li a[style=\"font-weight: bold;\"").href;
  function openImgTab()
  {
    if(dlLink){
      window.open(dlLink);
    }
    else {
      alert("Unable to fetch download link. Check the selector in the script.");
    }
  }

  function openImgHere()
  {
    if(dlLink){
      window.location=dlLink;
    }
    else {
      alert("Unable to fetch download link. Check the selector in the script.");
    }
  }
  
  /*  function nextImg()
      {
      var i=0;
      var candidates=document.querySelectorAll("li > a[href='#']");
      var nextPgLink=null;
      while(i<candidates.length)
      {
      if(candidates[i].innerHTML==="Next")
      {
      candidates[i].onclick(); // call the onclick the page already used
      i=candidates.length;
      }
      i++;
      }
      if(nextPgLink){
      window.location=nextPgLink;
      }
      }
      function prevImg()
      {
      var i=0;
      var candidates=document.querySelectorAll("li > a[href='#']");
      var prevPgLink=null;
      while(i<candidates.length)
      {
      if(candidates[i].innerHTML==="Previous")
      {
      candidates[i].onclick();
      i=candidates.length;
      }
      i++;
      }
      if(prevPgLink){
      window.location=prevPgLink;
      }
      }*/
}
/* ====================END R34.XXX DEFINES==================== */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* register hotkeys */
window.onkeyup = function(event) {
  /* if we aren't inputting text on the page: */
  if(document.activeElement.tagName != "INPUT")
  {
    var key=event.which||event.keyCode;
    switch(key){
    case 73: /* 'i' */
      event.preventDefault();
      openImgTab();
      break;
    case 79: /* 'o' */
      event.preventDefault();
      openImgHere();
      break;
    case 39: /* right arrow */
      nextImg();
      break;
    case 37: /* left arrow */
      prevImg();
      break;
    }
  }
}

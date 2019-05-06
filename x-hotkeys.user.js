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
// @include     http://exhentai.org/*
// @include     https://exhentai.org/*
// @include     https://inkbunny.net/s/*
// @include     http://inkbunny.net/s/*
// @include     https://inkbunny.net/submissionview.php*
// @include     http://inkbunny.net/submissionview.php*
// @include     http://e621.net/post/show/*
// @include     https://e621.net/post/show/*
// @include     http://rule34.xxx/index.php*
// @include     https://rule34.xxx/index.php*
// @include     http://*.hentai-foundry.com/pictures/user/*/*/*
// @include     http://hentai-foundry.com/pictures/user/*/*/*
// @include     https://*.hentai-foundry.com/pictures/user/*/*/*
// @include     https://hentai-foundry.com/pictures/user/*/*/*
// @include     http://*.furaffinity.net/view/*/
// @include     https://*.furaffinity.net/view/*/
// @include     http://gelbooru.com/index.php*
// @include     https://gelbooru.com/index.php*
// @include     http://chan.sankakucomplex.com/post/show/*
// @include     https://chan.sankakucomplex.com/post/show/*
// @include     http://*.newgrounds.com/art/view/*/*
// @include     https://*.newgrounds.com/art/view/*/*
// @include     http://newgrounds.com/art/view/*/*
// @include     https://newgrounds.com/art/view/*/*
// @include     http://*.newgrounds.com/portal/view/*/*
// @include     https://*.newgrounds.com/portal/view/*/*
// @include     http://newgrounds.com/portal/view/*/*
// @include     https://newgrounds.com/portal/view/*/*
// @include     http://*.newgrounds.com/portal/view/*
// @include     https://*.newgrounds.com/portal/view/*
// @include     http://newgrounds.com/portal/view/*
// @include     https://newgrounds.com/portal/view/*
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
    else if(window.location.pathname == '/') /* | window.location.search.includes("f_search") */
    {
      /* we are on the gallery search page, so page using arrow keys. */
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
    else if(window.location.pathname == '/') /* | window.location.search.includes("f_search") */
    {
      /* we are on the gallery search page, so page using arrow keys. */
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
else if( window.location.origin.endsWith("rule34.xxx"))
{
  if(/\?s\=view|&s\=view/i.test(window.location.href) )
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
    
  }
  
  /////////// Search listing next/prev page
  else if(/\?s\=list|&s\=list/i.test(window.location.href) )
  {
    function nextImg()
    {
      window.location=document.querySelector("a[alt='next']").href;
    }
    function prevImg()
    {
      window.location=document.querySelector("a[alt='back']").href;
    }
    function openImgHere()
    {
      return;
    }
    function openImgTab()
    {
      return;
    }
  }
  else /* disable all functions */
  {
    function openImgHere()
    {
      return;
    }
    function openImgTab()
    {
      return;
    }
    function prevImg()
    {
      return;
    }
    function nextImg()
    {
      return;
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

/* ====================BEGIN HF DEFINES==================== */
else if(window.location.origin.endsWith("hentai-foundry.com"))
{
  function openImgTab(){
    /* alternative selector: "section#picBox > div.boxbody > img" */
    var img=document.querySelector("section#picBox img.center");
    if(img.src)
    {
      window.open(img.src);
    }
  }
  function openImgHere(){
    var img=document.querySelector("section#picBox img.center");
    if(img.src)
    {
      window.location=img.src;
    }
  }
}
/* ====================END HF DEFINES==================== */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ====================BEGIN FA DEFINES==================== */
else if(window.location.origin.endsWith("furaffinity.net"))
{
  function getFAURL(){
    var linkCandidates=document.querySelectorAll(".actions a");
    var i=0;
    var linkurl="";
    while(i<linkCandidates.length)
    {
      if(linkCandidates[i].innerHTML=="Download")
      {
        linkurl=linkCandidates[i].href;
        i=linkCandidates.length;
      }
      i++;
    }
    return linkurl;
  }
  function openImgHere(){
    window.location=getFAURL();
  }
  function openImgTab(){
    window.open(getFAURL());
  }
  
  /* nextImg and prevImg are swapped on FA to align with the directions of the
     nav buttons. So next will go to the previous image */
  function prevImg()
  {
    window.location=document.querySelector(".next").href;
  }
  function nextImg()
  {
    window.location=document.querySelector(".prev").href;
  }
  
}
/* ====================END FA DEFINES==================== */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ====================BEGIN GELBOORU DEFINES==================== */

else if(window.location.origin.endsWith("gelbooru.com"))
{
  function getGBURL(){
    var linkCandidates=document.querySelectorAll("div li a");
    var i=0;
    var linkurl="";
    while(i<linkCandidates.length)
    {
      if(linkCandidates[i].innerHTML=="Original image")
      {
        linkurl=linkCandidates[i].href;
        i=linkCandidates.length;
      }
      i++;
    }
    return linkurl;
  }
  
  function openImgHere(){
    window.location=getGBURL();
  }
  function openImgTab(){
    window.open(getGBURL());
  }  
}

/* ====================END GELBOORU DEFINES==================== */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ====================BEGIN SANKAKUCOMPLEX DEFINES==================== */
else if(window.location.origin.endsWith("chan.sankakucomplex.com"))
{
  function getSKURL(){
    return document.querySelector("a#highres").href;
  }
  
  function openImgHere(){
    window.location=getSKURL();
  }
  function openImgTab(){
    window.open(getSKURL());
  }  
}
/* ====================END SANKAKUCOMPLEX DEFINES==================== */


////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* ====================BEGIN NEWGROUNDS DEFINES==================== */

else if(window.location.origin.endsWith("newgrounds.com"))
{
  
  /* bypass "adult content" warnings on flash files," since the account 
     setting seems broken */
  /* only tested with flash player installed. Might not work for video
     converted versions of SWF's. */
  if(document.querySelector(".pod-body #embed_wrapper"))
  {
    try{
      unsafeWindow.checkPreroll();
    }
    catch(e)
    {
      try{
        checkPreroll();
      }
      catch(e){console.log("couldn't run 'checkPreroll()' from the source page. Probably a sandboxing problem I failed to account for.")}
    }
  }

  function getNGURL()
  {
    if(document.querySelector(".pod-body #embed_wrapper"))
    {
      /* this is a flash animation page */
      /* only tested with flash player installed. Might not work for video
         converted versions of SWF's. */
      return document.querySelector(".pod-body #embed_wrapper object").data;
    }
    else
    {
      /* this is not a flash page */
      return document.querySelector(".pod-body .image > a#portal_item_view").href;
    }
  }
  function openImgHere(){
    window.location=getNGURL();
  }
  function openImgTab(){
    window.open(getNGURL());
  }  
}

/* ====================END NEWGROUNDS DEFINES==================== */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* register hotkeys */
window.onkeyup = function(event) {
  /* if we aren't inputting text on the page: */
  if(document.activeElement.tagName != "INPUT" && document.activeElement.tagName != "TEXTAREA" )
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

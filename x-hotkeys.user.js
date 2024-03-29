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
// @include     http://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/*
// @include     http://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/g/*
// @include     http://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/s/*
// @include     https://inkbunny.net/s/*
// @include     http://inkbunny.net/s/*
// @include     https://inkbunny.net/submissionview.php*
// @include     http://inkbunny.net/submissionview.php*
// @include     http://e621.net/post/show/*
// @include     https://e621.net/post/show/*
// @include     http://e621.net/posts*
// @include     https://e621.net/posts*
// @include     http://e926.net/post/show/*
// @include     https://e926.net/post/show/*
// @include     http://e926.net/posts*
// @include     https://e926.net/posts*
// @include     http://rule34.xxx/index.php*
// @include     https://rule34.xxx/index.php*
// @include     http://rule34.us/index.php?r=posts/view*
// @include     https://rule34.us/index.php?r=posts/view*
// @include     http://*.hentai-foundry.com/pictures/user/*/*/*
// @include     http://hentai-foundry.com/pictures/user/*/*/*
// @include     https://*.hentai-foundry.com/pictures/user/*/*/*
// @include     https://hentai-foundry.com/pictures/user/*/*/*
// @include     http://*.furaffinity.net/view/*
// @include     https://*.furaffinity.net/view/*
// @include     http://*.furaffinity.net/full/*
// @include     https://*.furaffinity.net/full/*
// @include     http://*.furaffinity.net/gallery/*/
// @include     https://*.furaffinity.net/gallery/*/
// @include     http://*.furaffinity.net/search/*
// @include     https://*.furaffinity.net/search/*
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
// @include     http://rule*.paheal.net/post/view/*
// @include     https://rule*.paheal.net/post/view/*
// @include     http://*.weasyl.com/*/submissions/*
// @include     https://*.weasyl.com/*/submissions/*
// @include     http://*.weasyl.com/*/submissions/*/*
// @include     https://*.weasyl.com/*/submissions/*/*
// @include     http://*.weasyl.com/submissions*
// @include     https://*.weasyl.com/submissions*
// @include     https://*.wikipedia.org/wiki/File:*
// @include     http://derpibooru.org/images/*
// @include     https://derpibooru.org/images/*
// @include     http://derpibooru.org/search*
// @include     https://derpibooru.org/search*
// @include     /http://derpibooru.org/[0-9]*$/
// @include     /https://derpibooru.org/[0-9]*$/
// @include     http://*.booru.org/index.php*
// @include     https://*.booru.org/index.php*
// @include     http://*.patreon.com/*
// @include     https://*.patreon.com/*
// @include     http://hypnohub.net/post*
// @include     https://hypnohub.net/post*
// @include     http://www.hentai-foundry.com/search/*
// @include     https://www.hentai-foundry.com/search/*
// @version     1
// @grant       unsafeWindow
// ==/UserScript==

//unsafeWindow needed to access these functions from another script

// a setting, since some people might not like going fullscreen on an 'f' key press.
var ALLOW_FULLSCREEN = true;

var SITE_CAN_FULLSCREEN = false; // overridden per-site

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

// fullscreen function is the same everywhere unless I decide otherwise.
function toggleFullscreen()
{
  // check if global pref is enabled, as well as per-site pref. Right now, this is an opt-in basis.
  if(ALLOW_FULLSCREEN == true && SITE_CAN_FULLSCREEN == true)
  {
    if (!document.fullscreenElement)
    {
      document.querySelector('html').requestFullscreen();
    }
    else
    {
      if (document.exitFullscreen)
      {
        document.exitFullscreen(); 
      }
    }
  }
}

/*
 * nextImg() gives the next image in the current set. If we are at the end of
 * a set of images (or our set of images is 1 large), go to the next
 * submission in the gallery (on Inkbunny, FA, and a few others). This is
 * bound to the right arrow key.
 * 
 * prevImg() does the opposite of this and is bound to the left arrow key.
 *
 * On FA, these are swapped so that they make sense with the left/right
 * positioning of newer/older images respectively.
 *
 * openImgHere() and openImgTab() open the image that is the point of focus
 * on the given page, in its original (largest) version, either in the
 * current loaded tab/window (for openImgHere()), or in a new tab/window
 * (for openImgTab()).
 *
 * Making opening images work as expected may require installing a proper
 * add-on, such as 'InlineDisposition Reloaded,' or 'InlineDisposition' in
 * older versions of Firefox/forks and derivatives that allow XUL addons)
 * so that images load in the window instead of trying to download.
 *
 * Opening in a new tab/window without triggering the ad blocker is only
 * tested in Firefox-like browsers (e.g. Seamonkey, Firefox) and requires
 * some changes to about:config to operate properly due to security problems
 * that can arise otherwise.
 *
 * Change:
 * --------------------------------------------------------------------------
 * dom.popup_allowed_events
 *
 *   Description (rationale for change requirement):
 *     My script triggers new tab creatio on the release of a keyboard key
 *     (the `window.onkeyup`.) By default, this action is not allowed as a
 *     'springboard' to new window/tab opening, as this would allow an easy
 *     entry point for unwanted popups. Unfortunately, in a userscript I
 *     cannot seem to make my script differentiated from on-page triggered
 *     popups, so we need to add 'keyup' as an allowed event trigger.
 *
 *   Original value:
 *     change click dblclick mouseup notificationclick reset submit touchend
 *
 *   Recommended new value:
 *     change click dblclick mouseup notificationclick reset submit touchend keyup
 * --------------------------------------------------------------------------
 * dom.popup_maximum
 *
 *   Description (rationale for change requirement):
 *     dom.popup_maximum sets the number of 'popups' that are allowed to be
 *     active at any time. This includes 'popups' that are simply new tabs.
 *     If you are opening a crap-ton of images in new tabs, you will reach
 *     this cutoff point relatively quickly.
 *     When this point is reached, the blocker will tell you that it blocked
 *     the page from opening a popup, even if you had previously told the
 *     browser to allow popups on that page/site.
 *     Setting it to zero seems to allow an infinite number of pop-ups to
 *     be created. Of course, if you whitelist a naughty site and do this,
 *     you may be opening a can of worms. An ad blocker is highly, highly
 *     recommended to be used in conjunction with this script, if you
 *     change this to zero.
 *
 *   Original value:
 *     20
 *
 *   Recommended new value:
 *     0
 *
 *   NOTE:
 *     In Chrome/Chromium, this appears to be set at compile-time in
 *     `chrome/browser/ui/blocked_content/popup_blocker_tab_helper.cc` in
 *     the variable `kMaximumNumberOfPopups`. Therefore, it seems to be 
 *     un-changeable in the browser without recompiling it, possibly limiting
 *     the usefulness of this script in Chrome derivatives.
 *
 *     I have not checked that this actually matters in the case of my
 *     user script, though. it might be silly to even worry about.
 *
 * --------------------------------------------------------------------------
 * browser.tabs.loadDivertedInBackground
 *
 *   Description (rationale for change option):
 *     Setting this to true makes new tabs open in the background. This
 *     allows for navigating to the next page in a gallery, hitting 'i' to
 *     open in a new tab, then right key to go to the next page, followed by
 *     'i' again.
 *     Then, all the new tabs can be viewed at once later or saved as a
 *     batch.
 * 
 *  Original value:
 *    false
 *
 *  Recommended new value:
 *    true
 */

/* SOME CHROME/CHROMIUM EXTENSION SUGGESTIONS THAT MIGHT MAKE THIS ADDON
 * WORK BETTER:
 * 
 * Force Background Tab
 *   https://chrome.google.com/webstore/detail/force-background-tab/gidlfommnbibbmegmgajdbikelkdcmcl
 * InlineDisposition
 *   https://chrome.google.com/webstore/detail/inlinedisposition/ojbnblcchccjnihldfnommncemiejein
 * ViolentMonkey (to install this script in)
 *   https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag
 * 
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ====================START INKBUNNY DEFINES==================== */
if(window.location.origin.endsWith("inkbunny.net"))
{
  function nextImg()
  {
    //    var candidates=document.querySelectorAll("a"); /* wish I knew a better css selector */
    var candidates=document.getElementsByTagName("a");
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
    if(!nextPgLink)
    {
      /* not a multi-part thing, so go to next newest submission */
      nextPgLink=document.querySelectorAll("a[title='Newer']")[0];
    }
    if(nextPgLink)
    {
      window.location=nextPgLink;
    }
  }
  function prevImg()
  {
    //    var candidates=document.querySelectorAll("a"); /* wish I knew a better css selector */
    var candidates=document.getElementsByTagName("a");
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
    if(!prevPgLink)
    {
      prevPgLink=document.querySelectorAll("a[title='Older']")[0];
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
  // allow fullscreen func on ehg
  SITE_CAN_FULLSCREEN = false;
  /* 1 Mar 2022: ehg added some conflicting hotkeys. Disable. */
  function listenBlock(obj, eventType, keycode)
  {
    obj.addEventListener(eventType, function(event) {
      var key=event.which||event.keyCode;
      if(key==keycode)
      {
        event.stopPropagation();
        /* event.preventDefault(); */
      }
    }, true); /* true for event capture */
  }
  [ KeyEvent.DOM_VK_W, KeyEvent.DOM_VK_A, KeyEvent.DOM_VK_S, KeyEvent.DOM_VK_D ].forEach(function (a){listenBlock(document, 'keydown', a);});

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
    //    var candidates=document.querySelectorAll("a"); /* wish I knew a better css selector */
    var candidates=document.querySelectorAll(".searchnav a");
    var i=0;
    var nextPgLink=null;
    while(i < candidates.length)
    {
      if(candidates[i].innerHTML==="Next &gt;" || candidates[i].innerHTML==="&gt;")
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
    //    var candidates=document.querySelectorAll("a"); /* wish I knew a better css selector */
    var candidates=document.querySelectorAll(".searchnav a");
    var i=0;
    var prevPgLink=null;
    while(i < candidates.length)
    {
      if(candidates[i].innerHTML==="&lt; Prev" || candidates[i].innerHTML==="&lt;")
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
      var imglink=document.querySelector("div#i3 > a > img");
      if(imglink) {
        window.location=imglink.src;
      }
    }
  }
}
/* ====================END EHG DEFINES==================== */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ====================BEGIN E621 DEFINES==================== */
else if(window.location.origin.endsWith("e621.net") || window.location.origin.endsWith("e926.net"))
{
  function nextImg()
  {
    var i=0;
    /*var candidates=document.querySelectorAll("li > a[href^='/posts/']");*/
    var candidates=document.querySelectorAll("li > a.next");
    var nextPgLink=null;
    while(i<candidates.length)
    {
      //if(candidates[i].innerHTML==="Next")
      if(candidates[i].innerHTML.startsWith("next"))
      {
        nextPgLink=candidates[i].href;
        i=candidates.length;
      }
      i++;
    }
    if(candidates.length == 0) // search pages use different ids for the next/previous page buttons
    {
      candidates=document.querySelectorAll("li.arrow > a#paginator-next");
      i=0;
      while(i<candidates.length)
      {
        if(candidates[i].id==='paginator-next')
        {
          nextPgLink=candidates[i].href;
          i=candidates.length;
        }
        i++;
      }
    }
    if(nextPgLink){
      window.location=nextPgLink;
    }
  }
  function prevImg()
  {
    var i=0;
    //var candidates=document.querySelectorAll("li > a[href^='/post/show']");
    var candidates=document.querySelectorAll("li > a.prev");
    var prevPgLink=null;
    while(i<candidates.length)
    {
      //if(candidates[i].innerHTML==="Previous")
      if(candidates[i].innerHTML.endsWith("prev"))
      {
        prevPgLink=candidates[i].href;
        i=candidates.length;
      }
      i++;
    }
    if(candidates.length == 0) // search pages use different ids for the next/previous page buttons
    {
      candidates=document.querySelector("li.arrow > a#paginator-prev");
      i=0;
      while(i<candidates.length)
      {
        if(candidates[i].id==='paginator-prev')
        {
          prevPgLink=candidates[i].href;
          i=candidates.length;
        }
        i++;
      }
    }
    if(prevPgLink){
      window.location=prevPgLink;
    }
  }
  function getContentLink()
  {
    var i=0;
    //var candidates=document.querySelectorAll("a#highres");
    var firstCheck=document.querySelector('div#image-download-link > a');
    if(firstCheck)
      return firstCheck.href;
    else
    {
      var candidates=document.querySelector("section#post-information > ul > li > a");
      if(candidates && candidates.length > 0)
      {
        while(i<candidates.length){
          if(candidates[i].parentElement.innerHTML.includes('Size'))
          {
            if(candidates[i].href)
            {
              var dlLink=candidates[i].href;
              i=candidates.length;
              return dlLink;
            }
          }
          i++;
        }
      }
      else /* might be a swf? */
      {
        return null;
        // dangerous: finds first swf or other object on page.
        // this is left over from my old script version before e621 changed its html a lot.
        // the above stuff should work for SWFs as well now.
        //return document.querySelector("object param").getAttribute("value");
      }
    }
  }
  function openImgTab()
  {
    var url=getContentLink();
    if(url)
      window.open(url);
  }

  function openImgHere()
  {
    var url=getContentLink();
    if(url)
      window.location=url;
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

/* ====================BEGIN R34.US DEFINES=================== */

else if( window.location.origin.endsWith("rule34.us"))
{
    var dlLink=document.querySelector("ul.tag-list-left a li.character-tag");
    if(dlLink.parentNode.tagName==="A")
    {
      dlLink=dlLink.parentNode.href;
    }
    else
    {
      // "unset" so that we get the error if there's a problem
      dlLink=null;
    }
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

/* ====================END R34.US DEFINES===================== */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ====================BEGIN HF DEFINES==================== */
else if(window.location.origin.endsWith("hentai-foundry.com"))
{
  var urlwoprot=window.location.href.replace(/(^\w+:|^)\/\//, '');
  if(urlwoprot.startsWith("hentai-foundry.com/pictures/")||urlwoprot.startsWith("www.hentai-foundry.com/pictures/"))
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

  if(urlwoprot.startsWith("hentai-foundry.com/search/"))
  {
    function prevImg() /* search back a page */
    {
      var prevbtn=document.querySelectorAll("li.previous:not(.hidden) a");
      if(prevbtn) { /* undefined if no matches found */
        prevbtn[0].click();
      }
    }
    function nextImg() /* search forward a page */
    {
      var nextbtn=document.querySelectorAll("li.next:not(.hidden) a");
      if(nextbtn) { /* undefined if no matches found */
        nextbtn[0].click();
      }
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
    window.open(getFAURL());``
  }
  
  /* nextImg and prevImg are swapped on FA to align with the directions of the
     nav buttons. So next will go to the previous image */
  var urltmp=window.location.href.replace(/^htt.*\:\/\/www\.furaffinity.net/,'')
  if(urltmp.startsWith('/view') || urltmp.startsWith('/full'))
  {
    function prevImg()
    {
      window.location=document.querySelector(".next").href;
    }
    function nextImg()
    {
      window.location=document.querySelector(".prev").href;
    }
  }
  else if(urltmp.startsWith('/search'))
  {
    /* FA uses stupid HTTP POSTs to navigate through search results. */
    /* get fields */
    
    /*var form=document.querySelector('form#search-form[action="/search/"]').cloneNode(true).innerHTML;*/

    
    //document.querySelector('form#search-form[action="/search/"] > fieldset > input#q').parentElement.innerHTML=fieldset;
    
    // stash values on page load time for later backward navigation.
    var postField=document.querySelector('form#search-form[action="/search/"] > fieldset > input#q').parentElement;
    var pageNum=parseInt(postField.querySelector("input#page").getAttribute('value'));
    /*
     * make a backup of the entire contents of the search form for restoring
     * when moving back a page. Not sure if the clone is actually needed here
     * though.
     */
    var fieldset=postField.cloneNode(true).innerHTML;
    
    function prevImg()
    {
      /* decrement page field by 1  and click 'search' button.*/
      
      /* First, restore the values from page load time first in case user
         tweaks and then wants to go back without applying changes.*/
      postField.innerHTML=fieldset;
      // decrement by one.
      postField.querySelector("input#page").setAttribute('value',String(pageNum-1));
      // hit search button.
      document.querySelector("input.listbox[name='do_search']").click();
    }
    function nextImg()
    {
      // the page gives us a 'next' button, but not a 'previous' button -_-
      // so this is easier.
      document.querySelector("input.button[name='next_page']").click();
    }
  }
  else // on an image/content viewing page
  {
    function prevImg()
    {
      if(document.querySelector(".button-link.left").href)
      {
        window.location=document.querySelector(".button-link.left");
      }
    }
    function nextImg()
    {
      if(document.querySelector(".button-link.right").href)
      {
        window.location=document.querySelector(".button-link.right");
      }
    }
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
    try{ /* try to use greasemonkey 4 functions, then fall back on the other kind if not using GM 4 */
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
      var imgurlobj=document.querySelector(".pod-body .image > a#portal_item_view");
      if(imgurlobj)
      {
        return imgurlobj.href;
      }
      else /* gif's sometimes do this */
      {
        imgurlobj=document.querySelector(".pod-body .image > img");
        if(imgurlobj)
        {
          return imgurlobj.src;
        }
      }
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

/* ====================BEGIN R34.PAHEAL DEFINES==================== */
else if(window.location.origin.endsWith("rule34.paheal.net"))
{
  function get34URL()
  {
    //    var candidates=document.querySelectorAll("a"); /* wish I knew a better css selector */
    var candidates=document.getElementsByTagName("a");
    var i=0;
    var imgLink=null;
    while(i < candidates.length)
    {
      if(candidates[i].innerHTML==="Image Only" || candidates[i].innerHTML==="File Only")
      {
        imgLink=candidates[i].href;
        i=candidates.length; /* stop iterating */
      }
      i++;
    }
    return imgLink;
  }
  function openImgHere(){
    window.location=get34URL();
  }
  function openImgTab(){
    window.open(get34URL());
  }
  
  
  function prevImg()
  {
    window.location=document.querySelector("#prevlink").href;
  }
  function nextImg()
  {
    window.location=document.querySelector("#nextlink").href;
  }
  
}
/* ====================END R34.PAHEAL DEFINES==================== */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* =====================BEGIN WEASYL DEFINES===================== */
else if(window.location.origin.endsWith("weasyl.com"))
{
  function getWeasylURL()
  {
    var i=0;
    var candidates=document.getElementsByTagName("a");
    var imgLink=null;
    while(i < candidates.length)
    {
      if(candidates[i].innerHTML.endsWith("Download"))
      {
        imgLink=candidates[i].href;
        i=candidates.length;
      }
      i++;
    }
    return imgLink;
  }
  function openImgHere(){
    var urlnav=getWeasylURL();
    if(urlnav) // if not null
    {
      window.location=urlnav;
    }
  }
  function openImgTab(){
    var urlnav=getWeasylURL();
    if(urlnav)
    {
      window.open(urlnav);
    }
  }
  /* weasyl already handles next/previous on its own */
  /* ...except on user submission category folder pages, I guess? */
  if(/folderid=/i.test(window.location.href) )
  {
    function prevImg()
    {
      var pagenavbuttons=document.querySelectorAll("a.button");
      var i=0;
      while(i < pagenavbuttons.length)
      {
        // if pagenavbuttons has href attribute and that contains 'backid',
        // it's a back button.
        if(pagenavbuttons[i].href && /backid=/i.test(pagenavbuttons[i].href))
        {
          window.location=pagenavbuttons[i].href;
          i=pagenavbuttons.length;
        }
        i++;
      }
    }
    function nextImg()
    {
      var pagenavbuttons=document.querySelectorAll("a.button");
      var i=0;
      while(i < pagenavbuttons.length)
      {
        // if pagenavbuttons has href attribute and that contains 'backid',
        // it's a back button.
        if(pagenavbuttons[i].href && /nextid=/i.test(pagenavbuttons[i].href))
        {
          window.location=pagenavbuttons[i].href;
          i=pagenavbuttons.length;
        }
        i++;
      }
    }
  }
}
/* ======================END WEASYL DEFINES====================== */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ====================BEGIN WIKIPEDIA DEFINES==================== */
else if(window.location.origin.endsWith(".wikipedia.org"))
{
  function getWikipediaURL()
  {
    return document.querySelector('.fullImageLink > a').href;
  }
  function openImgHere(){
    window.location=getWikipediaURL();
  }
  function openImgTab(){
    window.open(getWikipediaURL());
  }
}
/* ====================END WIKIPEDIA DEFINES==================== */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ====================BEGIN DERPIBOORU DEFINES==================== */

if(window.location.origin.endsWith("derpibooru.org"))
{
  /* block "go to index" hotkey from interfering (or try to anyway).
     it uses a keydown instead of my preferred keyup.
     thankfully, due to this, I can block the page's listener without
     interfering with my own (which works on keyup instead). */
  function listenBlock(obj, eventType, keycode)
  {
    obj.addEventListener(eventType, function(event) {
      var key=event.which||event.keyCode;
      if(key==keycode)
      {
        event.stopPropagation();
        /* event.preventDefault(); */
      }
    }, true); /* true for event capture */
  }
  // listenBlock(window, 'keydown', 73);
  listenBlock(document, 'keydown', 73); /* 73 == 'i' */
  function nextImg() /* next page of results or next image */
  {
    var nextbtn=document.querySelectorAll('a.js-next')[0];
    if(nextbtn)
    {
      window.location=nextbtn.href;
    }
  }
  function prevImg()
  {
    var prevbtn=document.querySelectorAll('a.js-prev')[0];
    if(prevbtn)
    {
      window.location=prevbtn.href;
    }
  }
  if(/\/images\//i.test(window.location.href) || /\/[0-9]*$/i.test(window.location.href) ) /* url contains /images/ */
  {
    function getDerpibooruURL()
    {
      // this one is ugly and I don't trust it.
      var links=document.querySelectorAll("div.stretched-mobile-links > a > .fa-download");
      return links[links.length-1].parentElement.href;
    }
    function openImgHere()
    {
      window.location=getDerpibooruURL();
    }
    function openImgTab()
    {
      window.open(getDerpibooruURL());
    }
  }
}
/* ====================END DERPIBOORU DEFINES==================== */

/* ====================BEGIN BOORU.ORG DEFINES==================== */
if(window.location.origin.endsWith(".booru.org"))
{
  function getBooruOrgURL()
  {
    imgobj=document.querySelector("img[alt='img']");
    if(imgobj != null)
    {
      return imgobj.src;
    }
    return null;
  }
  function openImgHere(){
    var imgurl=getBooruOrgURL();
    if(imgurl != null)
    {
      window.location=imgurl;
    }
  }
  function openImgTab(){
    var imgurl=getBooruOrgURL();
    if(imgurl != null)
    {
      window.open(imgurl);
    }
  }
  function nextImg(){
    var nextbtn=document.querySelector("a[alt='next']");
    if(nextbtn)
    {
      window.location=nextbtn.href;
    }
    else {
      var candidates=document.querySelectorAll('a');
      var i=0;
      var link=null;
      while(i<candidates.length){
        if(candidates[i].innerHTML.toLowerCase().includes('next')){
          link=candidates[i].href;
          i=candidates.length;
        }
        i++;
      }
      if(link != null){
        window.location=link;
      }
    }
  }
  function prevImg(){
    var prevbtn=document.querySelector("a[alt='back']");
    if(prevbtn)
    {
      window.location=prevbtn.href;
    }
    else {
      var candidates=document.querySelectorAll('a');
      var i=0;
      var link=null;
      while(i<candidates.length){
        if(candidates[i].innerHTML.toLowerCase().includes('previous')){
          link=candidates[i].href;
          i=candidates.length;
        }
        i++;
      }
      if(link != null){
        window.location=link;
      }
    }
  }
}
/* ====================END BOORU.ORG DEFINES==================== */

/* ====================BEGIN PATREON DEFINES==================== */

if(window.location.origin.endsWith("patreon.com"))
{
  function getPatreonURL()
  {
    var lightboxImgs=document.querySelectorAll('div[data-target="lightbox-content"] img');
    if(lightboxImgs.length > 0)
    {
      var i=0;
      /* while no src exists, continue to look through elements.*/
      while(!lightboxImgs[i].src && i < lightboxImgs.length)
      {
        i++;
      }
      if(lightboxImgs[i].src != undefined)
      {
        return lightboxImgs[i].src;
      }
    }
    return null;
  }
  function openImgHere(){
    var imgurl=getPatreonURL();
    if(imgurl != null)
    {
      window.location=imgurl;
    }
  }
  function openImgTab(){
    var imgurl=getPatreonURL();
    if(imgurl != null)
    {
      window.open(imgurl);
    }
  }
}
/* =====================END PATREON DEFINES===================== */

/* ====================BEGIN HYPNOHUB DEFINES=================== */
if(window.location.origin.endsWith("hypnohub.net"))
{
  function getHypnoHubURL()
  {
    var hireslink = document.getElementById("highres");
    if(hireslink != null && hireslink.href)
    {
      return hireslink.href;
    }
    return null;
  }
  function openImgHere(){
    var imgurl=getHypnoHubURL();
    if(imgurl != null)
    {
      window.location=imgurl;
    }
  }
  function openImgPopup(e)
  {
/*    if(typeof e === 'object')
    {
      var imgurl=getHypnoHubURL();
      if(imgurl != null)
      {
        if(e.button == 0)
        {
          window.location=imgurl;
        }
      }
      }*/
    return;
  }
  function openImgTab()
  {
    var imgurl=getHypnoHubURL();
    if(imgurl != null)
    {
      window.open(imgurl);
    }
  }
  function nextImg()
  {
    var nextbtn=document.querySelector("a.nextPage");
    if(nextbtn)
    {
      window.location=nextbtn.href;
    }
  }
  function prevImg()
  {
    var prevbtn=document.querySelector("a.previousPage");
    if(prevbtn)
    {
      window.location=prevbtn.href;
    }
  }
  var imgobj=document.getElementById("image");
  if(imgobj)
  {
    imgobj.addEventListener("mouseup", openImgPopup);
/*   imgobj.addEventListener("click", openImgHere);*/
  }
}
/* =====================END HYPNOHUB DEFINES==================== */

/* =================BEGIN HENTAI-FOUNDRY DEFINES================ */
if(window.location.origin.endsWith("hentai-foundry.com"))
{
  var urlwoprot=window.location.href.replace(/(^\w+:|^)\/\//, '');
  if(urlwoprot.startsWith("hentai-foundry.com/search/")||urlwoprot.startsWith("www.hentai-foundry.com/search/"))
  {
    function prevImg() /* search back a page */
    {
      var prevbtn=document.querySelectorAll("li.previous:not(.hidden) a");
      if(prevbtn) { /* undefined if no matches found */
        prevbtn[0].click();
      }
    }
    function nextImg() /* search forward a page */
    {
      var nextbtn=document.querySelectorAll("li.next:not(.hidden) a");
      if(nextbtn) { /* undefined if no matches found */
        nextbtn[0].click();
      }
    }
  }
}


/* ==================END HENTAI-FOUNDRY DEFINES================= */



/* register hotkeys */
window.addEventListener('keyup', function(event) {
  //window.onkeyup = function(event) {
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
});

// export for other scripts to be able to hook
try{
  unsafeWindow.openImgHere=openImgHere;
  unsafeWindow.openImgTab=openImgTab;
  unsafeWindow.prevImg=prevImg;
  unsafeWindow.nextImg=nextImg;
}
catch(e){}
// do not report an error if not using GreaseMonkey 4.
// (GM 3.x, Violentmonkey, and maybe Tampermonkey don't need unsafeWindow)

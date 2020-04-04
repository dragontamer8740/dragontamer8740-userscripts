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
// @include     http://e621.net/posts*
// @include     https://e621.net/posts*
// @include     http://rule34.xxx/index.php*
// @include     https://rule34.xxx/index.php*
// @include     http://*.hentai-foundry.com/pictures/user/*/*/*
// @include     http://hentai-foundry.com/pictures/user/*/*/*
// @include     https://*.hentai-foundry.com/pictures/user/*/*/*
// @include     https://hentai-foundry.com/pictures/user/*/*/*
// @include     http://*.furaffinity.net/view/*
// @include     https://*.furaffinity.net/view/*
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
// @include     https://*.wikipedia.org/wiki/File:*
// @include     http://derpibooru.org/images/*
// @include     https://derpibooru.org/images/*
// @version     1
// @grant       unsafeWindow
// ==/UserScript==

//unsafeWindow needed to access these functions from another script

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
  /* Right click as shortcut for tag upvote */
  // Right click as shortcut for upvote
  
  
  
  /*var i=0;
    var tags=document.querySelectorAll('.gt, .gtl, .gtw');
    while(i<tags.length){
    var tagid=tags[i].id.toString();
    var tag=tags[i];
    tags[i].oncontextmenu = function (arg)
    {
    return function(){
    //arg.click();
    var onclickfn=arg.children[0].getAttribute('onclick');
    // trim return
    onclickfn=onclickfn.substr(onclickfn.indexOf(" ") + 1);
    // highlight element
    unsafeWindow.eval(onclickfn);
    // do the upvote
    unsafeWindow.tag_vote_up();
    return false; // prevent normal context menu
    }
    }(tag)
    i++;
    }*/

  
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
    //    var candidates=document.querySelectorAll("a"); /* wish I knew a better css selector */
    var candidates=document.getElementsByTagName("a");
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
    //    var candidates=document.querySelectorAll("a"); /* wish I knew a better css selector */
    var candidates=document.getElementsByTagName("a");
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
    window.open(getFAURL());``
  }
  
  /* nextImg and prevImg are swapped on FA to align with the directions of the
     nav buttons. So next will go to the previous image */
  if(window.location.href.replace(/^htt.*\:\/\/www\.furaffinity.net/,'').startsWith('/view'))
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
  else if(window.location.href.replace(/^htt.*\:\/\/www\.furaffinity\.net/,'').startsWith('/search'))
  {
    // FA uses stupid HTTP POSTs to navigate through search results.
    // And only provides a 'more results' button, not anything to go back.
    // stash values on page load time for later backward navigation.
    var postField=document.querySelector('form#search-form[action="/search/"] > fieldset > input#q').parentElement;
    var pageNum=parseInt(postField.querySelector("input#page").getAttribute('value'));
    // make a backup of the entire contents of the search form for restoring
    // when moving back a page.
    // not sure if the clone is actually needed here though.
    var fieldset=postField.cloneNode(true).innerHTML;
    
    function prevImg()
    {
      // decrement page field by 1  and click 'search' button.
      // First, restore the values from page load time first in case user
      // tweaks them and then wants to go back without applying changes.
      postField.innerHTML=fieldset;
      // decrement by one.
      postField.querySelector("input#page").setAttribute('value',String(pageNum-1));
      // hit search button.
      document.querySelector("input.listbox[name='do_search']").click();
    }
    function nextImg()
    {
      // the page gives us a 'next' button, but not a 'previous' button -_-
      // so this is much easier.
      document.querySelector("input.button[name='next_page']").click();
    }
  }
  else // on an image/content viewing page
  {
    function prevImg()
    {
      window.location=document.querySelector(".button-link.left");
    }
    function nextImg()
    {
      window.location=document.querySelector(".button-link.right");
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
      if(candidates[i].innerHTML==="Image Only")
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
    window.location=getWeasylURL();
  }
  function openImgTab(){
    window.open(getWeasylURL());
  }
}
/* weasyl already handles next/previous on its own*/
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
/* ====================END DERPIBOORU DEFINES==================== */


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


// export for other scripts to hook
try{
  unsafeWindow.openImgHere=openImgHere;
  unsafeWindow.openImgTab=openImgTab;
  unsafeWindow.prevImg=prevImg;
  unsafeWindow.nextImg=nextImg;
}
catch(e){}
// do not report an error if not using GM 4

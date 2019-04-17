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
// @version     1
// @grant       none
// ==/UserScript==

/* to override later */
function openImgTab(){alert("No function defined for opening the image in new tab on this page. Something's wrong.")};
function openImgHere(){alert("No function defined for opening the image on this page. Something's wrong.")};

/*
 * nextImg() gives the next image in the current set. If we are at the end of
 * a set of images (or our set of images is 1 large), go to the next
 * submission in the gallery (on Inkbunny). This is bound to the right arrow
 * key.
 * 
 * prevImg() does the opposite of this and is bound to the left arrow key.
 */
function nextImg(){
  if(window.location.origin.endsWith("inkbunny.net"))
  {
    var candidates=document.querySelectorAll("a"); /* wish I knew a better css selector */
    var i=0;
    var nextPgLink=null;
    /* first check for a next image in the current set */
    while(i < candidates.length)
    {
      if(candidates[i].innerHTML==="next")
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
    /*      else
            {
            nextPgLink=document.querySelectorAll("a[title='Newer']")[0].href;
            if(nextPgLink)
            {
            window.location=nextPgLink;
            }
            }*/
    /* don't go back to top of page - remote #pictop from url */
    /* window.location=nextPgLink.href.match(/.*\#/)[0].replace(/\#$/,"")*/
    
  }
}

function prevImg(){
  if(window.location.origin.endsWith("inkbunny.net"))
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
    /* don't go back to top of page - remote #pictop from url */
    /* window.location=prevPgLink.href.match(/.*\#/)[0].replace(/\#$/,"")*/
    if(prevPgLink)
    {
      window.location=prevPgLink;
    }
    /*      else
            { // already at start of set, try to go to previous submission
            prevPgLink=document.querySelectorAll("a[title='Newer']")[0].href;
            if(prevPgLink)
            {
            window.location=prevPgLink;
            }
            }*/
  }
}


function nextPgXThumb(){
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

function prevPgXThumb(){
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




if( Boolean(window.location.origin.endsWith("exhentai.org") | window.location.origin.endsWith("e-hentai.org")))
{
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
else if(window.location.origin.endsWith("inkbunny.net"))
{
  function getDlLink()
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
  
  function openImgTab(){
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
  }
}

/* register hotkeys */
window.onkeyup = function(event) {
  if(document.activeElement.tagName != "INPUT")
  {
    var key=event.which||event.keyCode;
    switch(key){
    case 73:
      event.preventDefault();
      openImgTab();
      break;
    case 79:
      event.preventDefault();
      openImgHere();
      break;
    case 39: /* right arrow */ /* already works in ehg without any work on my part. Site-specific. */
      if(window.location.origin.endsWith("inkbunny.net"))
      {
        nextImg();
      }
      else
      {
        /* strip protocol from url */
        var urlwoprot=window.location.href.replace(/(^\w+:|^)\/\//, '');
        if(urlwoprot.startsWith("exhentai.org/g/") | urlwoprot.startsWith("e-hentai.org/g/"))
        {
          nextPgXThumb();
        }
      } 
      break;
    case 37: /* left arrow */
      if(window.location.origin.endsWith("inkbunny.net"))
      {
        prevImg();
      }
      else
      {
        /* strip protocol from url */
        var urlwoprot=window.location.href.replace(/(^\w+:|^)\/\//, '');
        if(urlwoprot.startsWith("exhentai.org/g/") | urlwoprot.startsWith("e-hentai.org/g/"))
        {
          prevPgXThumb();
        }
      }
      break;
    }
  }
}



// This requires an addon like "inline disposition" to work as I intend.
// There are addons that accomplish this for both FF57+ and older versions.
// Seamonkey also can be used with the older type Firefox addon, when run
// through the seamonkey extension converter

/* try to get original download button if the image has one */
/*
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
*/

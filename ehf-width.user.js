// ==UserScript==
// @name        EH Forums Constrain to Screen Width
// @namespace   dragontamer8740.ehfWidth
// @description E-H Forums: Force posts to fit in screen width so horizontal scrolling is not necessary.
// @include     https://forums.e-hentai.org/index.php*
// @include     http://forums.e-hentai.org/index.php*
// @version     1
// @grant       none
// ==/UserScript==

function vw()
{
  return Math.min(document.documentElement.clientWidth, window.innerWidth || 0);
}
function vh()
{
  return Math.min(document.documentElement.clientHeight, window.innerHeight || 0);
}


function fitWidth(img)
{
  // offset for things I'm too lazy to find influencing width.
  // 2 appears to be the bare minimum but I use 4 because no reason.
  var miscPadding=4;
  var currPostWidth=document.querySelectorAll(".tablebg")[0].clientWidth;
  var diff=currPostWidth-vw();
  //var diff=84;
  
  // Fill, but don't stretch beyond 100% normal size
  //if(document.documentElement.clientWidth <= img.naturalWidth )
  if(document.documentElement.clientWidth-diff-miscPadding <= img.naturalWidth)
  {
    //img.setAttribute('style', 'width: '+img.naturalWidth+'px');
    //img.setAttribute('style', 'width: '+String(document.documentElement.clientWidth-diff-miscPadding)+'px');
    img.style.width=String(document.documentElement.clientWidth-diff-miscPadding)+'px';
  }
/*  else
  {
    //img.setAttribute('style', 'width: 100%');
    //console.log('hi');
    //img.setAttribute('style', 'width: '+img.naturalWidth+'px');
    //img.setAttribute('style', 'width: '+String(document.documentElement.clientWidth)+'px');
  }*/
  img.style.height= "auto";
  //img.style.width=String(document.documentElement.clientWidth-diff-miscPadding)+'px';
}

function doFit()
{
  var i=0;
  /* select all images embedded in post fields */
  /* note: I don't think this counts signature images */
  var images=document.querySelectorAll("div[id^=post-] > img");
  while(i<images.length)
  {
    console.log(images[i].src);
    images[i].style.height="auto";
    images[i].style.margin="0px";
    fitWidth(images[i]);
    i++;
  }
}

doFit();
/* in case browser isn't done loading images (which is likely if not cached) */
img.addEventListener('load', doFit, false);

// ==UserScript==
// @name        X Image View Tweaks (hide top bar in galleries, image scaling)
// @namespace   dragontamer8740.xhideTopBar
// @description Make image start at top of display. Adds keybindings for fitting to height, width, original size.
// @include     https://exhentai.org/s/*
// @include     http://exhentai.org/s/*
// @include     https://e-hentai.org/s/*
// @include     http://e-hentai.org/s/*
// @version     1
// @grant       none
// ==/UserScript==

var i1=document.getElementById("i1");
/* move title below image */
var h1=document.querySelector("h1").cloneNode(true);
document.querySelectorAll("h1")[0].setAttribute("id","toHide");

var i2=document.getElementById("i2").cloneNode(true);

var i4=document.getElementById("i4");

var s = document.createElement("style");
s.type = "text/css";
s.innerText = `
               h1#toHide {
                    display: none !important;
               }
               div#i2 {
                    display: none !important;
               }
               body {
                    padding-top: 0px !important;
               }
               div#i1 {
                    padding-top: 0px !important;
                    margin-top: 0px !important;
                    border-top-width: 0px !important;
               }
               div.sni img {
                    margin: 0px !important;
               }`
document.head.appendChild(s);

i1.appendChild(h1); 

var img=document.getElementById("img");
var imgOrigHeight=img.style.height;
var imgOrigWidth=img.style.width;

img.style.margin="0px";

/*i1.insertBefore(h1,i4);*/

function fitHeight()
{
  img=document.getElementById("img");
  img.style.width="auto";
  // don't stretch beyond 100%
  if(document.documentElement.clientHeight <= img.naturalHeight)
  {
    img.style.height="100vh";
  }
  else
  {
    img.style.height="100%";
  }
  img.style.margin="0px";
}

function fitWidth()
{
  img=document.getElementById("img");
  // don't stretch beyond 100%
  if(document.documentElement.clientWidth <= img.naturalWidth)
  {
    img.style.width="100vw";
  }
  else
  {
    img.style.width="100%";
  }
  img.style.height= "auto";
  img.style.margin= "0px";
}

function origSize()
{
  img=document.getElementById("img");
  img.style.width= "100%";
  img.style.height="100%";
  img.style.margin= "0px";
}

function bestFit()
{
  img=document.getElementById("img");
  img.style.width= "100vw";
  img.style.height="auto";
  img.style.margin="0px";
  var windowaspectratio=document.documentElement.clientWidth / document.documentElement.clientHeight;
  var imgaspectratio=img.naturalWidth / img.naturalHeight;
  if(imgaspectratio < windowaspectratio) // image ratio is taller than screen aspect ratio, so fit to height
  {
    fitHeight();
  }
  else // if (imgaspectratio >= windowaspectratio) - image ratio is wider or the same as screen ratio, so fit to width
  {
    fitWidth();
  }
}

window.addEventListener('keyup', function(event) {
  /* if we aren't inputting text on the page: */
  if(document.activeElement.tagName != "INPUT" && document.activeElement.tagName != "TEXTAREA" )
  {
    var key=event.which||event.keyCode;
    switch(key){
    case 72: /* 'h' */
      event.preventDefault();
      window.removeEventListener("resize", bestFit, false);
      fitHeight();
      break;
      
    case 87: /* 'w' */
      event.preventDefault();
      window.removeEventListener("resize", bestFit, false);
      fitWidth();
      break;  
      /*case 65: // a
        event.preventDefault();
        window.addEventListener("resize", bestFit);
        origSize();
        break;*/
    case 86: /* 'v' */
      event.preventDefault();
      window.removeEventListener("resize", bestFit, false);
      origSize();
      break;
    case 66: /* 'b' */
      event.preventDefault();
      bestFit();
      window.addEventListener("resize", bestFit, false);
      break;
    }
  }
});


/* AUTO FIT TO HEIGHT */
/* will require more advanced inspection of DOM */

// ==UserScript==
// @name        Add X link to ehg
// @namespace   dragontamer8740.ehgAddXLink
// @description Add link to X to top bar
// @version     1
// @include     http://e-hentai.org/*
// @include     https://e-hentai.org/*
// @match       http://e-hentai.org/*
// @match       https://e-hentai.org/*
// @grant       none
// ==/UserScript==

var s = document.createElement("style");
s.type = "text/css";
s.innerText = '#nb { flex-flow: row !important; overflow: visible !important; }';
document.head.appendChild(s);

if(document.querySelector('a[href^="https://exhentai.org/"]')==null)
{
  var link=[];
  var arrow=[];
  var navbar=document.getElementById("nb");
  var div=[];
  
  function assembleDiv(index)
  {
    div[index]=document.createElement("div");
    div[index].appendChild(link[index]);
    return div[index]
  }
  /* link to respective page on other site */
  link[0]=document.createElement("a");
  link[0].href=window.location.href.replace(/^https?:\/\/e-hentai.org/, "https://exhentai.org");
  link[0].innerHTML="X";
  /* 'null' means to add link1 after the last element */
  navbar.insertBefore(assembleDiv(0), null);
}

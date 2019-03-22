// ==UserScript==
// @name        Add wiki, home, news, and forum Links
// @namespace   dragontamer8740.exhWikiLink
// @description Add links to the wiki, forum, news, and user home pages to X
// @version     1
// @include        http://exhentai.org/*
// @include        https://exhentai.org/*
// @match          http://exhentai.org/*
// @match          https://exhentai.org/*
// @grant       none
// ==/UserScript==
/* User ID (found in URL for user profile page on forums). */
var uid=1097716
/* fix styling of header bar, allow larger titles to display in thumbnail mode */
var s = document.createElement("style");
s.type = "text/css";
s.innerText = '#nb { flex-flow: row !important; overflow: visible !important; } .gl4t { max-height: 96px !important; }';
document.head.appendChild(s);
if(document.querySelector('a[href="https://ehwiki.org/"]')==null)
{
  var link=[];
  var div=[];
  var navbar=document.getElementById("nb");
  var linkNames = [ "My Tagging Log",
                    "Wiki",
                    "My Home",
                    "News",
                    "Forums"
                  ];
  var linkURLs  = [ "https://e-hentai.org/tools.php?act=taglist&uid="+uid,
                    "https://ehwiki.org/",
                    "https://e-hentai.org/home.php",
                    "https://e-hentai.org/news.php",
                    "https://forums.e-hentai.org/"
                  ];
  var i=0;
  while(i < linkURLs.length)
  {
    /* add "My Tagging Log" button */
    link[i]=document.createElement("a");
    link[i].href=linkURLs[i];
    link[i].innerHTML=linkNames[i];
    div[i]=document.createElement("div");
    div[i].appendChild(link[i]);
    navbar.insertBefore(div[i], null);
    i++;
  }
}

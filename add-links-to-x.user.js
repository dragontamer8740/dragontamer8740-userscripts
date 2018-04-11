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

if(document.querySelector('a[href="https://ehwiki.org/"]')==null)
{
  var link=[];
  var arrow=[];
  var navbar=document.getElementById("nb");
  /* make arrows */
  var i=0;
  while(i<=3)
  {
    arrow[i]=document.createElement("img");
    arrow[i].src="https://exhentai.org/img/mr.gif";
    i++;
  }
  link[0]=document.createElement("a");
  link[0].href="https://ehwiki.org/";
  link[0].innerHTML=" Wiki";
  /* 'null' means to add link1 after the last element */
  navbar.insertBefore(link[0], null);
  /* then insert the arrow icon */
  navbar.insertBefore(arrow[0], link[0]);

  link[1]=document.createElement("a");
  link[1].href="https://e-hentai.org/home.php";
  link[1].innerHTML=" My Home";
  /* add "my home" button just before  the 'my galleries' button */
  navbar.insertBefore(link[1], document.querySelector('a[href="https://exhentai.org/upload/manage.php"]').previousElementSibling);
  /* add "my home" arrow */
  navbar.insertBefore(arrow[1], link[1]);

  /* add "forums" button */
  link[2]=document.createElement("a");
  link[2].href="https://forums.e-hentai.org/";
  link[2].innerHTML=" Forums";
  navbar.insertBefore(link[2], arrow[0]);
  /* add "Forums" arrow */
  navbar.insertBefore(arrow[2], link[2]);

  /* add "news" button just before the "forums" button */
  /* add "news" button */
  link[3]=document.createElement("a");
  link[3].href="https://e-hentai.org/news.php";
  link[3].innerHTML=" News";
  navbar.insertBefore(link[3], arrow[2]);
  /* add "news" arrow */
  navbar.insertBefore(arrow[3], link[3]);
}

// ==UserScript==
// @name        Change BE Addventure colour scheme
// @namespace   dragontamer8740.bearchivecolours
// @description change colours on be archive addventure
// @include     http://old.bearchive.com/~addventure/*
// @match       http://old.bearchive.com/~addventure/*
// @include     https://old.bearchive.com/~addventure/*
// @match       https://old.bearchive.com/~addventure/*
// @version     1
// @grant       none
// ==/UserScript==

var s = document.createElement("style");
s.type = "text/css";
s.innerText = 'body { background-color: #252525; color: #afafaf;} a { color: #3086ae;} a:visited { color: #b277aa; }';
document.head.appendChild(s);

if(document.title=="Addventure Server Is Busy")
{
  setTimeout(function(){ location.reload(); }, 6*1000);
}

// ==UserScript==
// @name        Change BE Addventure colour scheme
// @namespace   dragontamer8740.bearchivecolours
// @description change colours on be archive addventure, switch to 'AND' searching by default when searching tags, autoreload on cgi loading failures.
// @include     http://old.bearchive.com/~addventure/*
// @match       http://old.bearchive.com/~addventure/*
// @include     https://old.bearchive.com/~addventure/*
// @match       https://old.bearchive.com/~addventure/*
// @include     http://addventure.bearchive.com/~addventure/*
// @match       http://addventure.bearchive.com/~addventure/*
// @include     https://addventure.bearchive.com/~addventure/*
// @match       https://addventure.bearchive.com/~addventure/*
// @version     1
// @grant       none
// ==/UserScript==

var s = document.createElement("style");
s.type = "text/css";
s.innerText = 'body { background-color: #252525; color: #afafaf;} a { color: #3086ae;} a:visited { color: #b277aa; } td[colspan="3"] { color: #000000; }';
document.head.appendChild(s);

/*document.a.setAttribute("color","#3086AE");*/

/* search by tag: AND by default */
var andRadioBtn=document.querySelector('input[value="and"]')
if(andRadioBtn)
{
  andRadioBtn.checked=true;
}

/* auto refresh when CGI fails to load */

if(document.title=="Addventure Server Is Busy")
  {
    setTimeout(function(){ location.reload(); }, 6*1000);
  }

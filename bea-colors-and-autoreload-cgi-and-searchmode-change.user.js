// ==UserScript==
// @name        BE Addventure Change Colour Scheme
// @namespace   dragontamer8740.bearchivecolours
// @description change colours on be archive addventure, default search tags, etc
// @include     http://old.bearchive.com/~addventure/*
// @match       http://old.bearchive.com/~addventure/*
// @include     https://old.bearchive.com/~addventure/*
// @match       https://old.bearchive.com/~addventure/*
// @include     http://addventure.bearchive.com/~addventure/*
// @match       http://addventure.bearchive.com/~addventure/*
// @include     https://addventure.bearchive.com/~addventure/*
// @match       https://addventure.bearchive.com/~addventure/*
// @include     http://127.0.0.1/bea/*
// @match       http://127.0.0.1/bea/*
// @version     1
// @grant       none
// ==/UserScript==

var defaultSearchTags = [ "herm", "shem" ]
var colpref='dark'; /* valid options are 'light' or 'dark' */

var bgColor;
var fgColor;
var link;
var linkVisited;
if(document.location.hostname == '127.0.0.1') {
  /* bgColor='#331833';
     fgColor='#c8c8c8'; */
  if(colpref==='dark'){
    bgColor='#252525';
    fgColor='#afafaf';
    linkVisited='#b277aa';
    link='#3086ae';
  }
  else { /* light */
    bgColor='#c0c0c0';
    fgColor='#252525';
    linkVisited='#73007c';
    link='#0000dd';
  }
}
else {
  if(colpref==='dark') {
    bgColor='#252525';
    fgColor='#afafaf';
    linkVisited='#b277aa';
    link='#3086ae';
  }
  else { /* light */
    bgColor='#c0c0c0';
    fgColor='#252525';
    linkVisited='#73007c';
    link='#0000dd';
  }
}
function fixblacktext() { /* some absolute morons hard-code black text. */
  document.querySelectorAll('span').forEach((a) => {
    if(a.style.color == "rgb(0, 0, 0)" || a.style.color === "black" ) {
      a.style.color = fgColor;
    }
  });
}

function unretardify() {
  /* Are people writing this shit in MS word and exporting HTML or something? */
  /* ... knowing people, probably. So much stupid shit */
  // margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;
  document.querySelectorAll('span, p').forEach((a) => {
    if(a.style.color == "rgb(0, 0, 0)") {
      a.style.color = fgColor;
    }
    if(a.style.lineHeight) {
      a.style.lineHeight='';
    }
    var fnt=a.style.fontFamily.toUpperCase();
    if(fnt.includes("TIMES NEW ROMAN")) {
      a.style.fontFamily = '';
      a.style.fontWeight='';
      if(a.style.fontSize == '12pt') {
        a.style.fontSize='';
      }
      a.style.verticalAlign='';
    }
    else if(fnt.includes("SANS-SERIF") || fnt.includes("CALIBRI") || fnt.includes("ARIAL") || fnt.includes("HELVETICA")) {
      a.style.fontFamily = 'Times New Roman';
      if(a.style.fontSize == '12pt') {
        a.style.fontSize=''
      }
    }

  });

/*    document.querySelectorAll('span').forEach((a) => { */
}

function unbleach()
{
  var i=0;
  var whitebgs=document.querySelectorAll('[bgcolor="#FFFFFF"]');
  while(i<whitebgs.length)
  {
    whitebgs[i].setAttribute('bgcolor', bgColor);
    i++;
  }
}

function replaceBodyChar(badRegex, translation)
{
  document.body.innerHTML = document.body.innerHTML.replace(badRegex, translation);
}

function fixWrongEncoding() {
  // windows-1252/unicode to universal escapes
  replaceBodyChar(/â€“/g, "&ndash;");
  /* document.body.innerHTML = document.body.innerHTML.replace(/â€“/g,"&ndash;"); */
}

var s = document.createElement("style");
s.type = "text/css";
s.innerText = 'body { background-color: ' + bgColor + '; color: ' + fgColor + ';} a { color: ' + link + ';} a:visited { color: ' + linkVisited + '; }';
if(colpref==='dark') {
  s.innerText = s.innerText + 'td[colspan="3"] { background-color: #121212; color: ' + fgColor + '; }';
}
else {
  s.innerText = s.innerText + 'td[colspan="3"] { background-color: #b0b0b0; color: ' + fgColor + '; }';
}
fixblacktext();
unretardify();
fixWrongEncoding();
/*document.a.setAttribute("color","#3086AE");*/

function checkTagBox(tagName) {
  var box=document.querySelector('input[name="' + tagName + '"]');
  if(box) {
    box.checked=true;
  }
}

function uncheckTagBox(tagName) {
  var box=document.querySelector('input[name="' + tagName + '"]');
  if(box) {
    box.checked=false;
  }
}

function toggleTagBox(tagName) {
  var box=document.querySelector('input[name="' + tagName + '"]');
  if(box) {
    box.checked=!box.checked;
  }
}

/* check some boxes by default (see 'defaultSearchTags' at top of script) */
var isTagSearch=document.querySelector('form[method="GET"] input[value="Search"][type="submit"]') ? true : false
if(isTagSearch) {
  /* search by tag: AND by default */
/*
  var andRadioBtn=document.querySelector('input[value="and"]')
  if(andRadioBtn)
  {
    andRadioBtn.checked=true;
  }
*/
  defaultSearchTags.forEach(tagName => checkTagBox(tagName));
/* search by tag: OR by default */
  var orRadioBtn=document.querySelector('input[value="or"]')
  if(orRadioBtn)
  {
    orRadioBtn.checked=true;
  }
}

/* auto refresh when CGI fails to load */
if(document.title=="Addventure Server Is Busy")
{
  setTimeout(function(){ location.reload(); }, 6*1000);
}
else if(document.title=="Story Codes")
{
  s.innerText += 'body { background-image: url(data:image/gif;base64,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); }';
  unbleach();
}

/*else if(window.location.pathname.includes('tagcharts/root'))
{
  unbleach();
}*/

document.head.appendChild(s);

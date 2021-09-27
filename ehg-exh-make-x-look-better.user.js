// ==UserScript==
// @name        Make x look better
// @namespace   dragontamer8740.xcss
// @description Make x look better
// @include     http://exhentai.org/*
// @include     https://exhentai.org/*
// @include     http://e-hentai.org/*
// @include     https://e-hentai.org/*
// @include     http://upld.e-hentai.org/*
// @include     https://upld.e-hentai.org/*
// @include     http://upload.e-hentai.org/*
// @include     https://upload.e-hentai.org/*
// @include     https://repo.e-hentai.org/*
// @include     http://repo.e-hentai.org/*
// @version     1
// @grant       none
// ==/UserScript==

/* DEFINES */
/*var thumbHi = "200px";
  var thumbWd = "282px";*/
/* if not hentaiverse */
var REPLACE_WITH_X_CSS = true;
var SHOW_PRECISE_CURRENT_MOD_POWER = true;

if(! window.location.origin.endsWith("hentaiverse.org"))
{
  var thumbHi = "300px";
  var thumbWd = "423px";
  /* determines # of lines of text before title gets truncated in thumb view */
  var titleHi = "96px"

  /* find link to g.css and replace */
  var links=document.head.querySelectorAll("link");
  var i=0;
  if ( REPLACE_WITH_X_CSS == true )
  {
    while(i < links.length)
    {
      if(links[i].getAttribute("rel") === "stylesheet")
      {
        links[i].setAttribute("href",links[i].getAttribute("href").replace('e-hentai','exhentai').replace('g.css','x.css'));
        i=links.length;
      }
      i++;
    }
  }

  var heading=document.querySelector("h1");
  if ( ( heading ) && heading.innerHTML.startsWith("E-Hentai") )
  {
    var t = document.createElement("style");
    t.type="text/css";
    /* simulate netscape blink, in red */
    t.innerText = `
h1 {
  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;
  color: #00ffff;
  text-decoration: underline;
}
@keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
@-webkit-keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
`;
    document.head.appendChild(t);
    heading.innerHTML = "Reminder: You are currently using E-Hentai";
  }

  var eventpane=document.getElementById("eventpane");
  if(eventpane)
  {
    eventpane.style.background="#4f535b none repeat scroll 0 0";
    eventpane.style.border="1px solid #606060";
  }

  var s = document.createElement("style");
  s.type = "text/css";
  s.innerText = `/* style ehg like X */
                 input:not([type="checkbox"]):not([type="radio"]),select,option,optgroup,textarea,input[type="button"],input[type="submit"]
                 {
                   font-size: 8pt !important;
                   border: initial !important;
                   border-radius: initial !important;
                   background-color: #34353b !important;
                   -moz-appearance: none !important;
               }

               body {
                     background: #34353b none repeat scroll 0 0 !important;
                     color: #f1f1f1;
               }
               a {
                     color: #dddddd;
               }
               h2 a {
                     color: #f1f1f1 !important;
               }
               h2 {
                     border-bottom: 1px solid gray !important;
               }
               div.newstitle {
                     border-color: currentcolor currentcolor  #f1f1f1 !important;
               }
               div.ido {
                     border: 1px solid #f1f1f1 !important;
                     background: #4f535b none repeat scroll 0 0 !important;
               }
/* archiver */
               div#db {
                     background: #4F535B  none repeat scroll 0 0 !important;
                     border: 1px solid #f1f1f1 !important;
               }
/* home.php */
               div.homebox {
                     border: 1px solid gray !important;
               }
/* stats.php */
               div.stuffbox {
                     border: 1px solid gray !important;
               }
               td.stdk, td.stdv {
                     border: 1px solid gray !important;
               }
               div.idi {
/*                     border: 2px ridge #f1f1f1 !important;*/
                     border: 2px ridge #808080 !important;
               }
               td.ptds {
                     background: #43464e none repeat scroll 0 0 !important;
               }
               table.ptt td {
                     background: #34353b none repeat scroll 0 0 !important;
               }*/
               .gl1t:nth-child(2n+1) {
                     background: #363940 none repeat scroll 0 0  !important;
               }
               .gl1t:nth-child(2n+2) {
                     background: #3c414b none repeat scroll 0 0  !important;
               }
               .gl1t:nth-child(8n+1), .gl1t:nth-child(8n+3), .gl1t:nth-child(8n+6), .gl1t:nth-child(8n+8)
               {
                     background: #363940 none repeat scroll 0 0 !important;
               }
               .gl1t:nth-child(8n+2), .gl1t:nth-child(8n+4), .gl1t:nth-child(8n+5), .gl1t:nth-child(8n+7)
               {
                     background: #3c414b none repeat scroll 0 0 !important;
               }



               #nb {
                     flex-flow: row !important;
                     overflow: visible !important;
               }
               .gl4t {
                     max-height: ` + titleHi + ` !important;
                     margin: 6px 2px 0 !important;
               }
               .gl1t, .gl3t, .gl5t, .gl6t
               {
                     min-width: 0 !important;
                     min-height: 0 !important;
                     max-width: none !important;
                     max-height: none !important;
                     width: auto !important;
                     height: auto !important;
               }
               .gl3t a img
               {
                     height: auto !important;
                     width: auto !important;
                     max-height: ` + thumbHi + ` !important;
                     max-width: ` + thumbWd + ` !important;
                     display: block !important;
                     position: static !important;
                     margin: 0 auto !important;
               }


               /*.gl1t
               {
                     margin: 3px !important;
                     background: #43464e !important;
                     border: 1px solid #34353b !important;
                     border-radius: 10px;
               }

               .ido
               {
                     max-width: 1170px !important;
               }
               .gld
               {
                     max-width: 1150px !important;
                     border-left: none !important;
               }*/
 
               .gl5t
               {
                     height: 44px!important;
               }
               div.stuffbox
               {
                     background: #4F535B none repeat scroll 0 0;
               }
               table {
                     background: #4F535B none repeat scroll 0 0
               }
               div.ido
               {
                     border: 1px solid #000000 !important;
               }
               input, select, option, optgroup, textarea
               {
                     background-color: #34353b !important;
                     color: #f1f1f1 !important;
               }

  /* ONLY FOR WHEN EXH IS UTTERLY DEAD: */
/*               a, a.glink, a:visited, a:visited .glink, a:active, a:active .glink
               {
                     color: #dddddd !important;
               }
               a:hover, a:hover .glink
               {
                     color: #ffffff !important;
               }
               input[type="button"]:enabled:hover,input[type="submit"]:enabled:hover,input[type="button"]:enabled:focus,input[type="submit"]:enabled:focus
               {
                     background-color: #3E424A !important;
                     border-color:#977273 !important;
                     outline:0;
               }
               div#gd4
               {
                     border-left: 1px solid #606060 !important;
                     border-right: 1px solid #606060 !important;
               }
               table.ptb td.ptds, table.ptt td.ptds
               {
                     border-color: #606060 !important;
                     background-color: rgb(67,70,78) !important;
               }
               table.ptb td, table.ptt td
               {
                     border-color: #606060 !important;
                     background-color: #363940 !important;
               }
               table.ptt a
               {
                     color: #ffffff !important;
               }
               div.gm, div#gmid, div#gd2, div.ths, div#tagpopup, div.sni
               {
                     background-color: #4F535B !important;
                     border-color: #606060 !important;
               }
               div#gdt img
               {
                     border-color: #606060 !important;
               }
               div#gdt
               {
                     border-color: #606060 !important;
                     background-color: #34353B !important;
               }
               h1#gj
               {
                     border-bottom: 1px solid #606060 !important;
               }
               div.tha, div.thd
               {
                     border-color: #606060 !important;
                     color: #f1f1f1 !important;
               }
               div.tha:hover
               {
                     background-color: #222222 !important;
               }
               div.thd
               {
                     color: #b1b1b1 !important;
               }
               div.c2
               {
                     background-color: #363940 !important;
                     border-color: #606060 !important;
               }
               div.gt, div.gtl, div.gtw
               {
                     background-color: #595D66 !important;
                     border-color: #606060 !important;
               }
               div.gt a:hover, div.gtl a:hover, div.gtw a:hover
               {
                     background-color: #595D66 !important;
                     border-color: #606060 !important;
                     color: #ffffff !important;
               }
               div.gdtl:hover, div#gdt a:hover
               {
                     color: #f1f1f1 !important;
               }*/
`;

  document.head.appendChild(s);
  
  
}
/* second karma rule is for karma.php, for imbuing karma from forums.*/
if(/karma$/.test(window.location.href) || /credits$/.test(window.location.href) || /karma\.php/.test(window.location.href) || /logs.php\?t=karma/.test(window.location.href))
{
  var i=0;
  var divs=document.querySelectorAll("div");
  while(i<divs.length)
  {
    if(divs[i].style.backgroundColor == "rgb(237, 235, 223)")
    {
      divs[i].style.background="#4F535B";
      i=divs.length;
    }
    i++;
  }
  var spanInput=document.querySelector("span#as"); /* input for karma quantity to imbue */
  if(spanInput){
    spanInput.style.background="#34353B none repeat scroll 0% 0%";
  }
}
// else if(/stats.php$/.test(window.location.href))
else if(/bounty.php/.test(window.location.href))
{
  var s=document.createElement("style");
  s.type="text/css";
  s.innerText=` /* bounty.php additional rule */
    div#x {
      background: #363940 none repeat scroll 0 0 !important;
      border: 1px solid #606060 !important;
    }
    div#g th{
      font-weight:bold;border-bottom:1px solid gray !important;
    }
    div#h th{
      font-weight:bold;border-bottom:1px solid gray !important;
    }
div.d4
{
width:480px;
height:199px;
float:left;
/*border:1px solid #5C0D12;*/
border:1px solid gray;
border-left:0;
}

div.d5{
width:480px;
height:200px;
float:left;
/*border:1px solid #5C0D12;*/
border: 1px solid gray;
border-right:0;
border-top:0;
}

`;
  document.head.appendChild(s);
  /*=document.querySelector("div#x");
  bountyField;*/
}
else if (/bitcoin.php/.test(window.location.href))
{
  var s=document.createElement("style");
  s.type="text/css";
  s.innerText=` /* bitcoin.php rules */
tr#dlvl {
background-color: #545860;
border: 1px solid gray;
}
#tdon th{
  border-bottom: 1px solid gray;
}
#adon > div:nth-child(3) {
  border-left: 1px solid gray;
}
#adon {
  border-top: 1px solid gray;
}
#coinselector > div:not([onclick]) {
  border: 1px solid gray;
}
#coinselector > div[onclick] {
  border-bottom: 1px solid gray;
  background-color: #34353B;
}
#coinselector>div[onclick]:hover {
  background-color: #545860
}
#coinselector>div[onclick]:hover a {
  color: #f0f0f0;
}
`;
  document.head.appendChild(s);     
}
else if(/bounty_post.php/.test(window.location.href))
{
         var s=document.createElement("style");
  s.type="text/css";
  s.innerText=` /* bounty.php additional rule */
body {
background: #34353b none repeat scroll 0 0;
}
td.l{
width:300px;
vertical-align:top;
border-bottom:1px solid gray;
padding:5px;
}
td.r{
width:670px;
vertical-align:top;
border-bottom:1px solid gray;
padding:5px;
}

`;
  document.head.appendChild(s);     
}
else if(/stats.php/.test(window.location.href))
{
  document.body.style["color"]="#f1f1f1";
  var s = document.createElement("style");
  s.type = "text/css";
  s.innerText = `/*stats.php additional rule */
    body {
      color: #f1f1f1 !important;
    }
    a {
      color: #dddddd !important;
    }
  `;
  document.head.appendChild(s);
  var i=0;
  var tables=document.querySelectorAll("table");
  while(i<tables.length)
  {
    /* tables[i].style.background="#4F535B";*/
    tables[i].style.background="#545860";
    tables[i].style["border-color"]="gray gray currentcolor";
    i++;
  }
}
else if(/home.php$/.test(window.location.href))
{
  if(SHOW_PRECISE_CURRENT_MOD_POWER == true)
  {
    var tds=document.querySelectorAll("td");
    var i=0;
    while(i<tds.length)
    {
      if(tds[i].innerHTML.includes("Current Moderation Power"))
      {
        tds[i].style["border-right"]="1px solid gray";
        i=tds.length;
      }
      i++;
    }
    
    /* doesn't really belong in this script, but here it is anyway.
     * A precise sum of moderation power scores. */
    var modsum = document.createElement("div");
    modsum.style.marginTop="5px";
    modsum.style.fontSize="10pt";
    modsum.style.fontWeight="bold";
    modsum.id='summod';
    var rightsum=0;
    var leftsum=0;
    var trs=document.querySelectorAll('html body div.stuffbox div.homebox table tbody tr td table tbody tr');
    i=0;
    while(i<trs.length)
    {
      if(trs[i].innerHTML.includes("(capped to"))
      {
        rightsum=trs[i].querySelector('td[style*="font-weight"]');
        rightsum=parseFloat(rightsum.innerHTML.replace(/[^0-9\.]+/g,""));
      }
      else if(trs[i].innerHTML.includes("Tagging"))
      {
        /* this is horrible. */
        /* one tr past here is what we want */
        leftsum=trs[i+1].querySelector('td[style*="font-weight"]');
        if(leftsum)
        {
          leftsum=leftsum.innerHTML;
        }
      }
      i++;
    }
    /* there are multiple matches for leftsum, we just want the last one of them. Hacky. */
    leftsum=parseFloat(leftsum.replace(/[^0-9\.]+/g,""));
    trs=document.querySelectorAll('html body div.stuffbox div.homebox table tbody tr td');
    i=0;
    while(i<trs.length)
    {
      if(trs[i].innerHTML.includes("Current Moderation Power"))
      {
        appendTargetSum=trs[i];
        appendTargetSum.insertBefore(modsum,null);
        // document.getElementById("summod").textContent='(' + (rightsum + leftsum) + ')';
        // We need to round or we'll get weird floating point artifacts sometimes
        // (like with 16.97 + 1.45)
        var sum=Math.round((rightsum + leftsum) * Math.pow(10, 2)) / Math.pow(10, 2);
        document.getElementById("summod").textContent='(' + (sum) + ')';
      }
      i++;
    }
    i=0;
  }
}
if (window.location.origin.endsWith("upld.e-hentai.org") || window.location.origin.endsWith("upload.e-hentai.org"))
{
  var s = document.createElement("style");
  s.type = "text/css";
  s.innerText = `/* uploader additional rules */
               div[id^="cell_"] {
                     border-radius: 0px !important;
                     background: #34353C !important;
                     border: 1px solid gray !important;
               }
               div.stuffbox {
                     border: 1px solid gray !important;
               }
               td.stdk, td.stdv {
                     border: 1px solid gray !important;
               }
               div.idi {
                     border: 2px ridge #808080 !important;
               }
               td.ptds {
                     background: #43464e none repeat scroll 0 0 !important;
               }
               table.ptt td {
                     background: #34353b none repeat scroll 0 0 !important;
               }
               .gl1t:nth-child(2n+1) {
                     background: #363940 none repeat scroll 0 0  !important;
               }
               .gl1t:nth-child(2n+2) {
                     background: #3c414b none repeat scroll 0 0  !important;
               }
               .gl1t:nth-child(8n+1), .gl1t:nth-child(8n+3), .gl1t:nth-child(8n+6), .gl1t:nth-child(8n+8)
               {
                     background: #363940 none repeat scroll 0 0 !important;
               }
               .gl1t:nth-child(8n+2), .gl1t:nth-child(8n+4), .gl1t:nth-child(8n+5), .gl1t:nth-child(8n+7)
               {
                     background: #3c414b none repeat scroll 0 0 !important;
               }



               #nb {
                     flex-flow: row !important;
                     overflow: visible !important;
               }
               .gl4t {
                     max-height: ` + titleHi + ` !important;
                     margin: 6px 2px 0 !important;
               }
               .gl1t, .gl3t, .gl5t, .gl6t
               {
                     min-width: 0 !important;
                     min-height: 0 !important;
                     max-width: none !important;
                     max-height: none !important;
                     width: auto !important;
                     height: auto !important;
               }
               .gl3t a img
               {
                     height: auto !important;
                     width: auto !important;
                     max-height: ` + thumbHi + ` !important;
                     max-width: ` + thumbWd + ` !important;
                     display: block !important;
                     position: static !important;
                     margin: 0 auto !important;
               }

               .gl5t
               {
                     height: 44px!important;
               }
               div.stuffbox
               {
                     background: #4F535B none repeat scroll 0 0;
               }
               table {
                     background: #4F535B none repeat scroll 0 0
               }
               div.ido
               {
                     border: 1px solid #000000 !important;
               }
               input, select, option, optgroup, textarea
               {
                     background-color: #34353b !important;
                     color: #f1f1f1 !important;
               }

  `;
  document.head.appendChild(s);
}

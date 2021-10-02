// ==UserScript==
// @name        Elda/Hujan Disable Title
// @namespace   com.dragontamer8740.ehEldaTitle
// @description Disable user title for Elda88, aka Hujan86
// @include     http://forums.e-hentai.org/*
// @include     https://forums.e-hentai.org/*
// @version     1
// @grant       none
// ==/UserScript==
var i=0;
var sels=document.querySelectorAll(".post2 ");
while(i < sels.length) {
  if(sels[i].parentElement.innerHTML.includes("Member No.: 173,922")){
    sels[i].parentElement.querySelector(".info").style.display="none";
  }
  i++;
}

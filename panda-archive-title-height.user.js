// ==UserScript==
// @name        Panda Archive Title Height
// @namespace   dragontamer8740.pandaArchive
// @description Increase thumbnail title height on panda archive
// @include     https://panda.chaika.moe/*
// @include     http://panda.chaika.moe/*
// @version     1
// @grant       none
// ==/UserScript==
var s = document.createElement("style");
s.type = "text/css";

s.innerText = `
.cover-title {
/* default was 32px: */
  max-height: 96px !important;
/* default was 3 or 4em, can't remember: */
  height: 8em !important;
}
`
document.head.appendChild(s);

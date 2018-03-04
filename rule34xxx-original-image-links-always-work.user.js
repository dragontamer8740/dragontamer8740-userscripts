// ==UserScript==
// @name        r34-original-image-links-always-work
// @namespace   dragontamer8740.r34orig
// @description make R34.xxx "original image" links always link to the original image with a left click.
// @include     http://rule34.xxx/*
// @include     https://rule34.xxx/*
// @version     1
// @grant       none
// ==/UserScript==

// remove onclick handler
// this CSS selector just checks that the text is bold when looking for what to remove
// the handler from
document.querySelector("div#post-view div.sidebar div ul li a[style=\"font-weight: bold;\"").onclick=null;

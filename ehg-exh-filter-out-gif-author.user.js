// ==UserScript==
// @name        Filter out GIF Author
// @namespace   dragontamer8740.filterGifAuthor
// @description Filters out GIF Author galleries. I like some of his work but the current thumbnail is horrendous.
// @version     1.0
// @include        http://g.e-hentai.org/*
// @include        http://e-hentai.org/*
// @include        http://exhentai.org/*
// @include        https://g.e-hentai.org/*
// @include        https://e-hentai.org/*
// @include        https://exhentai.org/*
// @match          http://g.e-hentai.org/*
// @match          http://e-hentai.org/*
// @match          http://exhentai.org/*
// @match          https://g.e-hentai.org/*
// @match          https://e-hentai.org/*
// @match          https://exhentai.org/*
// @grant          none
// ==/UserScript==

//puts '-artist:"transmorpher DDS"' in the search field.
if( document.querySelector('input[name="f_search"]').value=="")
{
  document.querySelector('input[name="f_search"]').value +="-artist:\"GIF Author\" ";
}
//if it's already in the search field (case insensitive), don't do anything. Otherwise, add it to the end.
else if( !(document.querySelector('input[name="f_search"]').value.toUpperCase().includes("-artist:\"GIF Author\"".toUpperCase())) )
{
  document.querySelector('input[name="f_search"]').value +=" -artist:\"GIF Author\" ";
}

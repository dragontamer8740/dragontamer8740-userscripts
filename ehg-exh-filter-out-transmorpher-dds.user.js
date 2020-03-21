// ==UserScript==
// @name           Filter out Transmorpher DDS
// @namespace      dragontamer8740
// @description    Automatically removes the artist "Transmorpher DDS" from searches.
// @version        1.0
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

// Description:
// puts '-artist:"transmorpher DDS"' in the search field.

//don't cause errors in console on non-search pages
if (document.querySelector('input[name="f_search"]')) // only if search bar exists on current page
{
  if (document.querySelector('input[name="f_search"]').value == '')
  {
    document.querySelector('input[name="f_search"]').value += '-a:"transmorpher DDS" ';
  }  //if it's already in the search field (case insensitive), don't do anything. Otherwise, add it to the end.
  else if (!(document.querySelector('input[name="f_search"]').value.toUpperCase().includes('-a:"transmorpher DDS"'.toUpperCase())))
  {
    document.querySelector('input[name="f_search"]').value += ' -a:"transmorpher DDS" ';
  }
}

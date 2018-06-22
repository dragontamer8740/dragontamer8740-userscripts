// ==UserScript==
// @name           Filter out Transmorpher DDS
// @namespace      dragontamer8740.filterTransmorpherDDS
// @description    Automatically removes the artist "Transmorpher DDS" from searches. His art style is subjectively terrible and his galleries are constantly being bumped to the top of results.
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

//puts '-artist:"transmorpher DDS"' in the search field.
var searchField = document.querySelector('input[name="f_search"]');

if(searchField != null)
{
  if( searchField.value=="")
  {
    searchField.value +="-artist:\"transmorpher DDS\" ";
  }
  //if it's already in the search field (case insensitive), don't do anything. Otherwise, add it to the end.
  else if( !(searchField.value.toUpperCase().includes("-artist:\"transmorpher DDS\"".toUpperCase())) )
  {
    searchField.value +=" -artist:\"transmorpher DDS\" ";
  }
}

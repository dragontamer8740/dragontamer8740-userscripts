// ==UserScript==
// @name        Filter out xmrsmoothx
// @namespace   dragontamer8740.filterxmrsmoothx
// @description Block an awful artist
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
// @grant       none
// ==/UserScript==


//puts '-artist:"xmrsmoothx"' in the search field.
var searchField = document.querySelector('input[name="f_search"]');
if(searchField != null)
{
  if( searchField.value=="")
  {
    searchField.value +="-artist:\"xmrsmoothx\" ";
  }
  //if it's already in the search field (case insensitive), don't do anything. Otherwise, add it to the end.
  else if( !(searchField.value.toUpperCase().includes("-artist:\"xmrsmoothx\"".toUpperCase())) )
  {
    searchField.value +=" -artist:\"xmrsmoothx\" ";
  }
}

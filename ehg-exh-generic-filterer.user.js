// ==UserScript==
// @name        Filter out bad content
// @namespace   dragontamer8740.ehgfiltergeneric
// @description Blocks awful artists and uploaders.
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


function addArtistFilter(name)
{
  var searchField = document.querySelector('input[name="f_search"]');
  if(searchField != null)
  {
    if( searchField.value=="")
    {
      searchField.value +="-artist:\"" + name + "\" ";
    }
    //if it's already in the search field (case insensitive), don't do anything. Otherwise, add it to the end.
    else if( !(searchField.value.toUpperCase().includes("-artist:\"" + name + "\"".toUpperCase())) )
    {
      searchField.value +=" -artist:\"" + name + "\" ";
    }
  } 
}

function addUploaderFilter(name)
{
  var searchField = document.querySelector('input[name="f_search"]');
  if(searchField != null)
  {
    if( searchField.value=="")
    {
      searchField.value +="-uploader:\"" + name + "\" ";
    }
    //if it's already in the search field (case insensitive), don't do anything. Otherwise, add it to the end.
    else if( !(searchField.value.toUpperCase().includes("-uploader:\"" + name + "\"".toUpperCase())) )
    {
      searchField.value +=" -uploader:\"" + name + "\" ";
    }
  } 
}


addArtistFilter("xmrsmoothx");
addUploaderFilter("OHPriest");

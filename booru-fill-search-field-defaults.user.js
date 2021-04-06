// ==UserScript==
// @name        Booru default search tag fill
// @namespace   dragontamer8740.booruSearchTagFill
// @description Automatically add strings to the search fields on various boorus
// @version     1
// @include     http://e621.net/
// @include     https://e621.net/
// @include     http://e621.net/posts*
// @include     https://e621.net/posts*
// @grant       none
// ==/UserScript==

// Currently this script does nothing; to make it do something uncomment the
// line near the bottom beginning with 'addToSearch'.

var tagField;
function addToSearch(tagText){
  if(tagField)
  {
    if(tagField.value == '')
    {
      tagField.value += (tagText);
    }
    else if(!(tagField.value.toUpperCase().includes(tagText.toUpperCase())))
    {
      /* if the tag isn't already in the text field then add it to end;
         otherwise do nothing. */
      tagField.value += (' ' + tagText);
    }
    /* set input focus to tags box */
    tagField.focus();
  }
  /* add a trailing space on the end for user appending convenience */
  if(tagField.value != '')
  {
    if(!(tagField.value.endsWith(' ')))
    {
      tagField.value += ' ';
    }
  }
}
if(window.location.hostname == "e621.net")
{
  // get actual string value with '.value'
  // use querySelector if worried about tags matching some non-input type field
  // or when being used on other sites without convenient ID's like this. E.g.,
  // tagField = document.querySelector("input#tags");
  tagField = document.getElementById("tags");
/*  addToSearch("status:any"); */
}

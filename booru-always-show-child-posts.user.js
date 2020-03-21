// ==UserScript==
// @name        Booru Always Show Child Posts
// @namespace   dragontamer8740.e621ShowChildren
// @description Always show child posts on boorus that collapse them by default
// @version     1
// @include        http://e621.net/posts/*
// @include        https://e621.net/posts/*
// @grant       none
// ==/UserScript==

if(window.location.origin.endsWith("e621.net"))
{
// old site script was:
// // toggleChildPosts();
//   var spacerDisplay=document.getElementById("child-posts-spacer").style.display;
//   if(spacerDisplay == "none" || spacerDisplay == "")
//   {
//     window.toggleChildPosts();
//   }

/* 
 * The new site layout uses JQuery (ugh), which I have no patience for.
 * So I reimplemented the functions to show parent elements/child elements
 * using pure JS instead.
 */

  // same fn called for children and parents.
  function showTheThing(postLink,thingToShow)
  {
    if(postLink)
    {
      var previewparents=document.getElementById('has-parent-relationship-preview');
      if(thingToShow && thingToShow.style.display == 'none' || thingToShow.style.display == '')
      {
        thingToShow.style.display='block';
        postLink.innerHTML='« hide';
      }
    }
  }
  showTheThing(document.getElementById('has-parent-relationship-preview-link'),document.getElementById('has-parent-relationship-preview'));
  showTheThing(document.getElementById('has-children-relationship-preview-link'),document.getElementById('has-children-relationship-preview'));

  /* Next, move all notices above the image (instead of below) */
  var notices=document.querySelectorAll('.bottom-notices')
  if(notices.length > 0)
  {
    var x=0;
    while(x < notices.length)
    {
      var noticeDiv=notices[x].cloneNode(true);
      var imgCont=document.getElementById('image-container')
      imgCont.parentElement.insertBefore(noticeDiv,imgCont);
      // remove original
      notices[x].remove();
      // could just the one below hide instead, if we so chose.
      // notices[x].setAttribute( 'style', 'display: none !important' );
      x++;
    } // end while loop
  } // (if notices.length > 0)
} // (if e621)

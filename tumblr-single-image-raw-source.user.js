// ==UserScript==
// @name        tumblr single image raw source link
// @namespace   dragontamer8740.tumblrSingleImageRawSourceLink
// @description Sets the normally '_1280' sized images in single-image posts actually be the raw image sources.
// @include     http://*.tumblr.com/image/*
// @include     https://*.tumblr.com/image/*
// @version     1
// @grant       none
// ==/UserScript==
/* not 100% sure this works perfectly, but it worked on the handful of images
   that I tried it on. */
for(let value of document.querySelectorAll("img"))
{
  if(value.hasAttribute("srcset"))
  {
    var url=value.src;
    url=url.replace(/^https:\/\//,"http://")
    url=url.replace(/[0-9]+\.media/,"data");
    url=url.replace(/_1280\./,"_raw.");
    value.src=url;
    /* There's also a "srcset" attribute which I apparently have to manipulate.
       Seems to be rather annoying. */
    var urlSet=value.srcset.split(',');
    for(var i=0; i<urlSet.length; i++)
    {
      if(urlSet[i].toString().includes("_1280."))
      {
        var url=urlSet[i];
        url=url.replace(/https:\/\//,"http://")
        url=url.replace(/[0-9]+\.media/,"data");
        url=url.replace(/_1280\./,"_raw.");
        urlSet[i]=url;
        console.log(url)
      }
    }
    value.srcset=urlSet.join(',');
  }
}

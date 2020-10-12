// ==UserScript==
// @name        EHF Dark News Link
// @namespace   dragontamer8740.ehfDarkNews
// @description Add "News" link to header on the dark theme on EH Forums
// @include     http://forums.e-hentai.org/*
// @include     https://forums.e-hentai.org/*
// @version     1
// @grant       none
// ==/UserScript==

var calendarBtnImg = document.querySelector('img[src="style_images/fusion/fusion_header_calendar.gif"]');
if(calendarBtnImg) // this will be null if using the "ambience" theme; do nothing in that case.
{
  // replace 'calendar' button with homemade 'news' button (I used the Shakagraphics 14 font, if anyone else is wondering; it appears to be a perfect match).
  calendarBtnImg.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAmCAMAAABwIXKiAAAANlBMVEUgISY0Nz8zNj4yNDwwMjovMTkuMDguMDctLzaZmZ4xMzssLjUpKzEPDxIODhEcHSE+QUs0NTtxQvx3AAAAf0lEQVR4Ae2TBRLDMBADzzj9/2uTmG/LHSqzWcoqbC/nFW9u4v6cvIhrl3BOinaHVRwND314XYfC2xXiJ9fVaGPMoita9uhDLgUOpU2a1lQGj+ejkI/am4QhzFjSh1YJ4eczn7e++Xc7979ancmlM7l47/1xHujtl+zL+t7P0QG6tyXAowh3UQAAAABJRU5ErkJggg==';
  // old image was 68px; new image is only 39px (half as wide), so we have to fix the layout for it.
  calendarBtnImg.setAttribute("width", "39");
  if(calendarBtnImg.parentNode)
  {
    var calendarBtnLink = calendarBtnImg.parentNode;
    calendarBtnLink.href='https://e-hentai.org/news.php';
    if(calendarBtnLink.parentNode)
    {
      calendarBtnLink.parentNode.setAttribute("width", "39");
    }
  }
}

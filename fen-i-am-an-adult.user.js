// ==UserScript==
// @name        I Need an Adult
// @namespace   dragontamer8740.ineedanadult
// @description (I am an adult.) Automatically confirm age.
// @include     https://www.fenoxo.com/
// @include     http://www.fenoxo.com/
// @version     1.0
// @grant       none
// ==/UserScript==
var checkbox=document.querySelector("input#av_verify_confirm");
if(checkbox != null) {
  checkbox.checked=true;
}
var enterbtn=document.getElementById("av_verify");
if(enterbtn)
{
  enterbtn.click();
}

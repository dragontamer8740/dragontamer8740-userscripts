// ==UserScript==
// @name           Always show expunged
// @namespace      dragontamer8740.expunged
// @description    Automatically checks the "show expunged galleries" checkbox. Now works in GreaseMonkey 4.
// @version        1.1
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

// add a convenient ID for future use (also avoids some overhead from multiple selectors)
if(!document.getElementById("showAdvSearchLink"))
{
  document.querySelector('a[onclick="toggle_advsearch_pane(this); return false"]').setAttribute("id", "showAdvSearchLink");
}
if(document.getElementById("advdiv").style.display == "none")
{
  // we use unsafeWindow to call page functions in Greasemonkey 4; otherwise, we don't prefix page function calls.
  // first, try the greasemonkey 4 call. If that fails, try the normal page call. If both fail, we've failed.
  try{ unsafeWindow.toggle_advsearch_pane(document.getElementById("showAdvSearchLink")); }
  catch(e)
  {
    console.log("1 couldn't run 'toggle_advsearch_pane()'");
    // try un-prefixed version (non-GM4):
  	try{ toggle_advsearch_pane(document.getElementById("showAdvSearchLink")); }
    catch(e){console.log("(user script): couldn't find a way to run 'toggle_advsearch_pane()' from the source page. Probably a sandboxing problem I failed to account for. This is a bug! Please report it!")}
  }
}
function checkExpungedLocal()
{
  if(document.getElementById("advdiv").style.display != "none")
  {
      document.querySelector('input[name="f_sh"]').checked=true;
  }
}
checkExpungedLocal();
// store on the topmost level (window)
window.checkExpunged=checkExpungedLocal;
document.getElementById("showAdvSearchLink").addEventListener("click", window.checkExpunged);

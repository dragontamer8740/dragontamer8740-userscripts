// ==UserScript==
// @name        EH Show Tag Definitions and Tagged Galleries in New Tabs
// @namespace   dragontamer8740.ehgTagInfo
// @description Show tag definitions and tagged galleries in a new tab instead of in a popup/in the current window.
// @include     https://e-hentai.org/g/*
// @include     http://e-hentai.org/g/*
// @include     https://exhentai.org/g/*
// @include     http://exhentai.org/g/*
// @include     http://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/g/*
// @version     1
// @grant       none
// ==/UserScript==

// make a new <script> block in HTML to append to end of body to override the original functions.  
var definitionScript = document.createElement("script");
/* I got the original script definitions using function_name.toSource() and
 * then edited them.  * Inserting back into the page without using
 * unsafeWindow. (doesn't matter for GM 4 in this case I guess). The original
 * used '\s' like so, but it doesn't appear to work quite like I expected
 * it to. Tenboro's regex was:
 * selected_tag.replace(/[a-z]+:\s?/gi,\"\") */

// tag_define() in new window/tab instead of popup
// 2023: selected_tag renamed to selected_tagname
definitionScript.innerHTML="function tag_define(){window.open(\"https://ehwiki.org/wiki/\"+selected_tagname.replace(/[a-z]+:/gi,\"\"))}" + "\n";
//tag_show_galleries() in new window/tab instead of current window/tab
definitionScript.innerHTML+="function tag_show_galleries(){window.open(base_url+\"tag/\"+selected_tagname.replace(/ /g,\"+\"))}";
// supersede the original definitions of tag_define() and tag_show_galleries()
document.body.appendChild(definitionScript); 
// no longer needed as a variable, since it's now present in the page itself:
definitionScript.remove();

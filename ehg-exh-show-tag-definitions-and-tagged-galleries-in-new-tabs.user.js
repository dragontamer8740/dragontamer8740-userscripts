// ==UserScript==
// @name        EH Show Tag Definitions and Tagged Galleries in New Tabs
// @namespace   dragontamer8740.ehgTagInfo
// @description Show tag definitions and tagged galleries in a new tab instead of in a popup/in the current window.
// @include     https://exhentai.org/g/*
// @include     http://exhentai.org/g/*
// @include     https://e-hentai.org/g/*
// @include     http://e-hentai.org/g/*
// @version     1
// @grant       none
// ==/UserScript==

// make a new <script> block in HTML to append to end of body to override the original functions.  
var definitionScript = document.createElement("script");
// I got the original script definitions using function_name.toSource() and then edited them.
// Inserting back into the page without using unsafeWindow. (doesn't matter for GM 4 in this case I guess)
// original used \s like so, but it doesn't appear to work quite like I expect it to. Tenboro's regex.
// selected_tag.replace(/[a-z]+:\s?/gi,\"\")

// tag_define() in new window instead of popup
definitionScript.innerHTML="function tag_define(){window.open(\"https://ehwiki.org/wiki/\"+selected_tag.replace(/[a-z]+:/gi,\"\"))}" + "\n";
//tag_show_galleries() in new window instead of popup
definitionScript.innerHTML+="function tag_show_galleries(){window.open(base_url+\"tag/\"+selected_tag.replace(/ /g,\"+\"))}";

document.body.appendChild(definitionScript); // replace the original definitions of tag_define() and tag_show_galleries()

// no longer needed as a variable:
definitionScript.remove();

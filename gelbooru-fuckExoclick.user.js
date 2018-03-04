// ==UserScript==
// @name        Fuck exoclick
// @namespace   dragontamer8740.exoclickGelbooru
// @description Fuck exoclick. Seriously. Fuck exoclick. (blocks banner ads on gelbooru)
// @include     https://gelbooru.com/index.php*
// @version     1
// @grant       none
// ==/UserScript==

/*
I honestly don't remember how this works anymore... but I
do remember that the ads on gelbooru were driving me absolutely
insane before I made this. This is absolutely not good javascript code.
Don't do this.
*/

var EXoDetector = {
    domain_base: "exoclick.com",
    version: '2.25',
    detectCensorship: function(onComplete)
    {
    }
}

var scriptCode = new Array();

// this bit doesn't work
scriptCode.push('var EXoDetector = {'        );
scriptCode.push('  detectCensorship: function(onComplete)'  );
scriptCode.push('  {  ' );
scriptCode.push('  }  ');
scriptCode.push('}');
scriptCode.push('var fuckingnormieswryyyyy = (function (detector) {'  );
scriptCode.push('  var randStr = function (length, possibleChars) { ');
scriptCode.push('  return "blockthisbullshitDiv";');
scriptCode.push(' }');
 
// this bit does work
scriptCode.push('var loader = { ');
scriptCode.push('  renderBannerZones: function (response) {');
scriptCode.push('  },');
scriptCode.push('renderBannerZone: function (id, img_data, dest, request) {');
scriptCode.push('  },');
scriptCode.push('  serve: function(params) {}');
scriptCode.push('}');
scriptCode.push('}  )(EXoDetector);');
scriptCode.push('EXoDetector.domain_base = ""');
var script = document.createElement('script');
script.innerHTML = scriptCode.join('\n');
scriptCode.length = 0; // recover the memory we used to build the script
document.getElementsByTagName('head')[0].appendChild(script);
//document.getElementsByTagName('head')[0].appendChild(script);
document.getElementsByTagName('body')[0].appendChild(script);

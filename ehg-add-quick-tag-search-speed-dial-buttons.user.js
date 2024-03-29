// ==UserScript==
// @name           EHG Custom Tag Buttons
// @namespace      dragontamer8740.ehgUsualTagsButton
// @description    Add custom buttons to the search dialogue to quickly add tags you use frequently to the bar without typing.
// @include        http://g.e-hentai.org/*
// @include        http://e-hentai.org/*
// @include        http://exhentai.org/*
// @include        https://g.e-hentai.org/*
// @include        https://e-hentai.org/*
// @include        https://exhentai.org/*
// @include        http://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/*
// @match          http://g.e-hentai.org/*
// @match          http://e-hentai.org/*
// @match          http://exhentai.org/*
// @match          https://g.e-hentai.org/*
// @match          https://e-hentai.org/*
// @match          https://exhentai.org/*
// @match          http://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/*
// @version        1.1
// @run-at         document-idle
// @grant          none
// ==/UserScript==

var searchBox=document.querySelector('input[name="f_search"]');
if(searchBox) // only if search bar exists on current page
{
  /* make 'clear filter' button just erase text in the input box instead of reloading the page */
  document.querySelector('input[value="Clear Filter"]').setAttribute("onClick", 'document.querySelector(\'input[name="f_search"]\').value=\'\'');
  if(!document.getElementById("showAdvSearchLink"))
  {
    document.querySelector('a[onclick="toggle_advsearch_pane(this); return false"]').setAttribute("id", "showAdvSearchLink");
  }
  if(document.getElementById("advdiv").style.display == "none")
  {
    //was originally an 'onClick' passing 'this' as the link to change the text on
    //toggle_advsearch_pane(document.querySelector('a[onclick="toggle_advsearch_pane(this); return false"'));
    toggle_advsearch_pane(document.getElementById("showAdvSearchLink"));
  }

  function addCustomButton(buttonLabel, tagValue, tagFuncName, afterElement)
  {
    var btnId=tagValue.replace(/:/g,'_');
    /* navigating back to an old page in firefox sometimes leaves the buttons
       from the last run existant. So don't add if they already exist.*/
    if(!document.getElementById(btnId)) {
      var advSearchElements=document.querySelectorAll(".itss")[0];
      var additionalButtonScript=document.createElement("script");
      // we're making an inline script and injecting it into the page sources so buttons can use the functions. One per button, for now.
      // I think I could and should rewrite this so one function that takes parameters of tag name, etc. is passed instead.
      // add a script to the dom so I can call it with a button
      additionalButtonScript.innerHTML='function ' + tagFuncName + `()
      {
        if (document.querySelector('input[name="f_search"]').value == '')
        {
          document.querySelector('input[name="f_search"]').value += '` + tagValue + `';
        }  //if it's already in the search field (case insensitive), don't do anything. Otherwise, add it to the end.
        else if (!(document.querySelector('input[name="f_search"]').value.toUpperCase().includes('` + tagValue + `'.toUpperCase())))
        {
          document.querySelector('input[name="f_search"]').value += ' ` + tagValue + `';
        }
        document.querySelector('input[name="f_search"]').focus();
      }`;
      document.body.appendChild(additionalButtonScript);
      
      var newButton=document.createElement('input');
      newButton.setAttribute('type','button');
      newButton.setAttribute('value',buttonLabel);
      newButton.setAttribute('onclick', tagFuncName + '();');
      afterElement.appendChild(newButton);
    }
  }

  /* add a button, but use a user-defined JS function (more versatile, but also
     more complicated): */
  function addButtonCustomFunction(buttonLabel, customFuncName, afterElement, functionStr) {
    var btnId="btn" + customFuncName;
    if(!document.getElementById(btnId)) {
      var advSearchElements=document.querySelectorAll(".itss")[0];
      var additionalButtonScript=document.createElement("script");
      // we're making an inline script and injecting it into the page sources
      // so buttons can use the functions. One per button, for now.
      // I think I could and should rewrite this so one function that takes
      // parameters of tag name, etc. is passed instead.
      // add a script to the dom so I can call it with a button
      additionalButtonScript.innerHTML='function ' + customFuncName + `()
      {
        ` + functionStr + `
        document.querySelector('input[name="f_search"]').focus();
      }`;
      document.body.appendChild(additionalButtonScript);
      
      var newButton=document.createElement('input');
      newButton.setAttribute('id',btnId);
      newButton.setAttribute('type','button');
      newButton.setAttribute('value',buttonLabel);
      newButton.setAttribute('onclick', customFuncName + '();');
      afterElement.appendChild(newButton);
    }
  }

// BUTTON ROWS GO HERE: Any additional button rows you want to create should
// be defined right here.
  var newButtonRow=[];
  newButtonRow[0]=document.createElement("div"); // new row for buttons. You can make more of these if needed.
  // newButtonRow[1]=document.createElement("div"); // example second row



  // No need to edit this; it just adds the rows of buttons into the page.  
  var elementBelow=document.querySelector('table.itss'); // the element that buttons should be positioned before.
  var i=0;
  while(i<newButtonRow.length) {
    newButtonRow[i].setAttribute('class', 'customRow');
    document.getElementById("advdiv").insertBefore(newButtonRow[i], elementBelow);
    i++;
  }
  

//  --- add all of the buttons you want here; just make sure they all use ----
//  ---------- different function names (second-to-last argument). -----------
  addCustomButton('English',     'l:english',        'addEnglishTag',  newButtonRow[0]);

// Example of a custom function button:
/*
  addButtonCustomFunction("Bad Category Toggle", 'categoryToggler', newButtonRow[0], `
    toggle_category(1); 
    toggle_category(64);
    toggle_category(128);
    // western will be automatically turned back on, but won't be automatically
    // turned off, since it occupies a middle ground partway between good and bad.
    if(document.getElementById('cat_512').getAttribute('data-disabled')) {
      toggle_category(512);
    }`
  );
*/

  // add stylings (you probably don't need to edit this)
  var s = document.createElement("style");
  s.type = "text/css";
  s.innerText = `div.customRow {
    text-align: right;
  }`
  document.head.appendChild(s);
  // add a teeny bit of padding above buttons and below 'show advanced search'/'show file search' links
  document.getElementById('showAdvSearchLink').parentNode.style['margin-bottom']='4px';
  // the following line isn't strictly necessary since these links both share the same container right now.
  // document.getElementById('showAdvSearchLink').parentNode.querySelector('a[onclick^="toggle_filesearch_pane"]').style['margin-bottom']='4px';
}

// ==UserScript==
// @name           EHG Usual Tags Button
// @namespace      dragontamer8740.ehgUsualTagsButton
// @description    Add button(s) for "speed dial" fast search terms to EHG. Makes advanced search pane always be visible, too.
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
// @version        1
// @grant          none
// ==/UserScript==

if(document.querySelector('input[name="f_search"]')) // only if search bar exists on current page
{
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

  function addCusttomButton(buttonLabel, tagValue, tagFuncName, afterElement)
  {
    var advSearchElements=document.querySelectorAll(".itss")[0].children[0];
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
    if(afterElement.firstChild) // has at least one child already (not sure I need this anymore since refactoring, might even be nonsensical)
    {
      advSearchElements.children[advSearchElements.children.length-2].insertBefore(afterElement,null);
    }
  }

  var newTd=document.createElement("td"); // table cell for buttons to go into

  // add all of the buttons you want here; just make sure they all use different function names (second-to-last argument).
  // syntax (Note that insertion point can always be 'newtd,' I think):
  //               'Button label', 'Tag to insert',    'Unique Function Name', 'Insertion point'
  addCusttomButton('English',      'l:english',        'tagAddEnglish',         newTd);
}

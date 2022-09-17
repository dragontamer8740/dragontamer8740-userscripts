// ==UserScript==
// @name        Add wiki, home, news, and forum Links
// @namespace   dragontamer8740.exhWikiLink
// @description Add links to the wiki, forum, news, and user home pages to X
// @version     1
// @include     http://exhentai.org/*
// @include     https://exhentai.org/*
// @include     http://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/*
// @match       http://exhentai.org/*
// @match       https://exhentai.org/*
// @match       http://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/*
// @grant       none
// ==/UserScript==


/* need a User ID (found in URL for user profile page on forums). */
/* December 31 2019: try to obtain from cookies, if available. */
function addLinks_getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
var uid=parseInt(addLinks_getCookie("ipb_member_id"));
if(uid==null){
  uid=0; /* Tagging log will return "No ACL Entry" if UID doesn't match your own */
  console.log("Could not find your UID, you are probably not logged in and tagging log will not work.");
}

/* fix styling of header bar, allow larger titles to display in thumbnail mode */
/* var s = document.createElement("style");
   s.type = "text/css";
   s.innerText = '#nb { flex-flow: row !important; overflow: visible !important; } .gl4t { max-height: 96px !important; }';
   document.head.appendChild(s); */
if(document.querySelector('a[href="https://ehwiki.org/"]')==null)
{
  var link=[];
  var navbar=document.getElementById("nb");
  if(navbar)
  {
    var linkNames = [ "My Tagging Log",
                      "News",
                      "Forums",
                      "Wiki"
                    ];
    var linkURLs  = [ "https://e-hentai.org/tools.php?act=taglist&uid="+uid,
                      "https://e-hentai.org/news.php",
                      "https://forums.e-hentai.org/",
                      "https://ehwiki.org/"
                    ];
    
    switch(window.location.pathname) {
    case "/upload/managegallery":
    case "/upload/manage.php":
    case "/upload/managefolders":
    case "/upload/manage":
      /* page uses old style nav bar still, so we don't encapsulate in 'div's */
      /* we need manually inserted '>' imgs for this technique */
      var templateImgs=[];
      var i=0;
      
      /* manually insert 'my home' link */
      templateImgs[i]=document.createElement("img"); /* re-use */
      templateImgs[i].setAttribute("src", "https://exhentai.org/img/mr.gif");
      link[i]=document.createElement("a");
      link[i].href="https://e-hentai.org/home.php";
      link[i].innerHTML=" My Home";
      /* insert before 'manage uploads' */
      navbar.appendChild(templateImgs[i]);
      navbar.appendChild(link[i]);
      i++;
      while(i-1 < linkURLs.length )
      {
        templateImgs[i]=document.createElement("img"); /* re-use */
        templateImgs[i].setAttribute("src", "https://exhentai.org/img/mr.gif");
        link[i]=document.createElement("a");
        link[i].href=linkURLs[i-1];
        link[i].innerHTML=' ' + linkNames[i-1];
        navbar.insertBefore(templateImgs[i], null);
        navbar.insertBefore(link[i], null);
        i++;
      }
      break;
    default:
      /* needs encapsulating in divs, new style */
      var div=[];
      var i=0;
      while(i < linkURLs.length)
      {
        /* add "My Tagging Log" button */
        link[i]=document.createElement("a");
        link[i].href=linkURLs[i];
        link[i].innerHTML=linkNames[i];
        div[i]=document.createElement("div");
        div[i].appendChild(link[i]);
        navbar.insertBefore(div[i], null);
        i++;
      } 
      /* i is now indexed one above the last item in link[] and div[].
         Manually insert home in the correct spot since it's not at the end on ehg */
      link[i]=document.createElement("a");
      link[i].href="https://e-hentai.org/home.php";
      link[i].innerHTML="My Home";
      div[i]=document.createElement("div");
      div[i].appendChild(link[i]);
      /* insert before 'manage uploads' */
      navbar.insertBefore(div[i], document.querySelectorAll("a[href='https://exhentai.org/upload/manage.php']")[0].parentNode);
      i++;
      /* manual i++ so if we do more manual insertion like this it continues making sense and can be function-ized maybe if
         I've not been awake for 18 hours and I return to this */
    }
  }
}

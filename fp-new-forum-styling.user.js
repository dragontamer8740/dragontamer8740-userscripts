// ==UserScript==
// @name        FP Forum Styling
// @namespace   dragontamer8740.fpNewForumStyles
// @description Styles for PhpBB
// @version     1
// @include     http://futanaripalace.com/*
// @include     https://futanaripalace.com/*
// @grant       none
// ==/UserScript==

var s = document.createElement("style");
s.type = "text/css";
s.innerText=`
.thead {
  background: #525252;
}
a:link {
  color: #d5d5d5;
}
a:visited {
  color: #d5d5d5;
}
#logo {
  background: #0d0d0d;
}
#panel .lower {
  background: #0d0d0d;
  border-top: 1px solid #464646;
  border-bottom: 1px solid #464646;
}
#panel .upper {
  color: #979797;
}
#panel .upper a:link, #panel .upper a:visited, #panel .upper a:hover, #panel .upper a:active {
  color: #c6c6c6;
}
#content {
  background: #222222;
}
.post .post_author div.author_statistics {
  color: #979797;
}
.navigation .active {
  color: #a2a2a2;
}
#container table
{
  color: #a2a2a2;
}
.post .post_author
{
  background: #0d0d0d;
  border-bottom: 1px solid #464646;
  border-top: 2px solid #464646;
}
.tfoot {
  background: #0d0d0d;
}
.tfoot a:link {
  color: #666;
}
.tborder {
  background: #141414;
  border: 1px solid #464646;
}
.post_controls {
  background: #0d0d0d;
  border-bottom: 1px solid #464646;
}
#footer .upper {
  background: #0d0d0d;
  border-bottom: 1px solid #464646;
  border-top: 1px solid #464646;
}
#footer .lower {
  color: #979797;
  background: #343434;
}
#footer .lower a:link, #footer .lower a:visited {
  color: #a1a1a1;
}
input.textbox {
  background: #0d0d0d;
  color: #c6c6c6;
  border: 1px solid #343434;
}
button, input.button {
  background: #0d0d0d;
  color: #979797;
  border: 1px solid #343434;
}
select {
  background: #0d0d0d;
  color: #a1a1a1;
  border: 1px solid #343434;
}
#footer .upper .theme select {
  border-color: #343434;
}
a.button:link, a.button:hover, a.button:visited, a.button:active {
  color: #a2a2a2;
  border: 1px solid #464646;
}
blockquote {
  background: #0d0d0d;
  border: 1px solid #464646;
}
textarea {
  background: #0d0d0d;
  border: 1px solid #464646;
  color: #d5d5d5;
}
.tfoot {
  border-top: 1px solid #464646;
}

/* forum indices */
.trow1 {
  background: #141414;
  border: 1px solid #464646;
}
.trow2 {
  background: #0d0d0d;
  border-color: #464646 #343434 #464646 #343434;
}
.trow_sep {
  background: #0d0d0d;
  border-bottom: 1px solid #464646;
  color: #979797;
}
.pagination a {
  background: #1a1a1a;
  border: 1px solid #464646;
}
.pagination a:hover {
  background: #525252;
}
.pagination .pagination_current {
  background: none;
  color: #878787;
}
#container {
  color: #979797;
}
.post .post_author div.author_avatar img {
  background: #222222;
  border: 1px solid #464646;
}
.post .post_head span.edited_post a{
  color: #d5d5d5;
}
.codeblock {
  background: #222222;
  border: 1px solid #343434;
}
.codeblock .title {
  border-bottom: 1px solid #464646;
}
.sceditor-container iframe, .sceditor-container textarea {
  background: #0d0d0d !important;
  color: #c6c6c6 !important;
}
.sceditor-container, .sceditor-container div, div.sceditor-dropdown, div.sceditor-dropdown div {
  background: padding-box #404040;
}
.sceditor-container {
  border: 1px solid #343434 !important;
  background: #202020 !important;
  color: #c6c6c6;
}
div.sceditor-toolbar {
  background: #202020 !important;
  border-bottom: #343434;
}
div.sceditor-group
{
  background: #404040 !important;
}
.sceditor-button {
  border: 1px solid #343434 !important;
  border-bottom: #343434;
}
.sceditor-button:hover, .sceditor-button:active, .sceditor-button.active {
  background: #0d0d0d !important;
  border-bottom: #343434;
}
body[contenteditable="true"] {
  color: #c6c6c6;
}
/* PM header (select who to send message to) */
.select2-container-multi .select2-choices
{
  background-color: #202020 !important;
  background-image: none !important;
  border: 1px solid #343434 !important;
}
`;
document.head.appendChild(s);

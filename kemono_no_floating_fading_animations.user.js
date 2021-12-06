// ==UserScript==
// @name        kemono no floating zoomy animations
// @namespace   Violentmonkey Scripts
// @match       https://kemono.party/*
// @grant       none
// @version     1.0
// @author      -
// @description 13/07/2021, 01:12:27 Stop being stupid kemono
// ==/UserScript==

var s = document.createElement("style");
s.type = "text/css";
s.innerText = `
:root {
 --positive-colour1-secondary: hsl(0, 0%, 30%);
 /* --duration-fast: 175ms; */
 --duration-fast: 0ms;
}
.post-card {
  border-radius: 0px;
}
.post-card:hover,
.post-card[focus-within] {
 /* transform:scale(1.05) */
 transform:none;
}
.post-card:hover,
.post-card:focus-within {
 /* transform:scale(1.05)*/
 transform:none;
}
.post-card:hover .post-card__image-container,
.post-card[focus-within] .post-card__image-container {
 visibility:hidden;
 opacity:0
}
.post-card:hover .post-card__image-container,
.post-card:focus-within .post-card__image-container {
 visibility:hidden;
 opacity:0
}
/* .post-card__image-container {
 transition-property:none;
 transition-duration:250ms;
 transition-duration:var(--duration-global)
}*/
`

document.head.appendChild(s);

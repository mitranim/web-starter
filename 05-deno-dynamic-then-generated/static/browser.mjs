/*
You can import arbitrary NPM modules, as long as they
conform to the JS module format. This package provides
shortcuts for rendering DOM/HTML via nested function calls.

It's also possible to use a browser-side importmap.
Omitted here for the sake of simplicity. In many modern browsers,
importmaps require an additional polyfill:

  https://github.com/guybedford/es-module-shims
*/
import {E} from 'https://cdn.jsdelivr.net/npm/prax@0.7.2/dom.mjs'

document.body.append(
  E('p', {class: 'italic'}, `This text was rendered in the browser.`),
)

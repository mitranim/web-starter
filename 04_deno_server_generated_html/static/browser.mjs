// You can import any library that uses the JS module format.
import {E} from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.23/ren_dom.mjs'

document.body.append(
  E(`p`, {class: `italic`}, `This text was rendered in the browser.`),
)

// You can import any library that uses the JS module format.
import * as p from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/prax.mjs'

const {E} = p.Ren.native()

document.body.append(
  E.p.props({class: `italic`}).chi(`This text was rendered in the browser.`),
)

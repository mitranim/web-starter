/* global Deno */

import * as p from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/prax.mjs'
import * as dg from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/dom_glob_shim.mjs'
import {paths as pt} from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/io_deno.mjs'

const {E} = new p.Ren(dg.document).patchProto(dg.glob.Element)

async function main() {
  await Promise.all([
    write(`target/index.html`, Index()),
    write(`target/404.html`, NotFound()),
  ])
  console.log(`[html] done`)
}

async function write(path, body) {
  await Deno.mkdir(pt.dir(path), {recursive: true})
  await Deno.writeTextFile(path, body)
  console.log(`[html] wrote`, path)
}

function Index() {
  return Layout(
    E.p.chi(`This text was rendered at build time.`),
    E.p.chi(
      `No dynamic rendering in this example, for technical reasons:`,
      E.ul.chi(
        E.li.chi(
          `This example generates multiple HTML files. We want to put our
          browser-side JS in a single file, and use `, E.code.chi(`<script src="...">`),
          ` to load it.`,
        ),
        E.li.chi(
          `We also want to use `, E.code.chi(`type="module"`), ` for the browser script,
          which allows modern JS features such as imports.`,
        ),
        E.li.chi(
          `Browsers refuse to load local "module" scripts when the page URL is `,
          E.code.chi(`file://some-local-file`), `. They require an HTTP server.
          Alternatively, we could inline the script into each HTML file, but
          that's not ideal.`,
        ),
      ),
    ),
    E.p.chi(`See the next example with an HTTP server.`),
  )
}

function NotFound() {
  return Layout(
    E.p.chi(`Sorry! Page not found.`),
    E.a.props({href: `index.html`}).chi(`Return home`),
  )
}

function Layout(...chi) {
  return p.renderDocument(
    E.html.chi(
      E.head.chi(
        E.link.props({rel: `icon`, href: `data:;base64,=`}),
        E.link.props({rel: `stylesheet`, href: `main.css`}),
      ),
      E.body.props({class: `center limit`}).chi(chi),
    )
  )
}

if (import.meta.main) await main()

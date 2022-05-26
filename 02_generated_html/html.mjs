/* global Deno */

import {E, ren} from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.23/ren_str.mjs'
import {paths as p} from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.23/io_deno.mjs'

async function main() {
  await Promise.all([
    write(`target/index.html`, Index()),
    write(`target/404.html`, NotFound()),
  ])
  console.log(`[html] done`)
}

async function write(path, body) {
  await Deno.mkdir(p.dir(path), {recursive: true})
  await Deno.writeTextFile(path, body)
  console.log(`[html] wrote`, path)
}

function Index() {
  return Layout(
    E(`p`, {}, `This text was rendered at build time.`),
    E(`p`, {},
      `No dynamic rendering in this example, for technical reasons:`,
      E(`ul`, {},
        E(`li`, {},
          `This example generates multiple HTML files. We want to put our
          browser-side JS in a single file, and use `, E(`code`, {}, `<script src="...">`),
          ` to load it.`,
        ),
        E(`li`, {},
          `We also want to use `, E(`code`, {}, `type="module"`), ` for the browser script,
          which allows modern JS features such as imports.`,
        ),
        E(`li`, {},
          `Browsers refuse to load local "module" scripts when the page URL is `,
          E(`code`, {}, `file://some-local-file`), `. They require an HTTP server.
          Alternatively, we could inline the script into each HTML file, but
          that's not ideal.`,
        ),
      ),
    ),
    E(`p`, {}, `See the next example with an HTTP server.`),
  )
}

function NotFound() {
  return Layout(
    E(`p`, {}, `Sorry! Page not found.`),
    E(`a`, {href: `index.html`}, `Return home`),
  )
}

function Layout(...chi) {
  return ren.doc(
    E(`html`, {},
      E(`head`, {},
        E(`link`, {rel: `icon`, href: `data:;base64,=`}),
        E(`link`, {rel: `stylesheet`, href: `main.css`}),
      ),
      E(`body`, {class: `center limit`}, chi),
    )
  )
}

if (import.meta.main) await main()

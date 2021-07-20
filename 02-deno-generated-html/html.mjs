import * as pt from 'https://deno.land/std@0.97.0/path/mod.ts'
import {E, doc, e} from 'https://cdn.jsdelivr.net/npm/prax@0.7.4/str.mjs'

async function main() {
  for (const {path, fun} of routes) {
    await Deno.mkdir(pt.dirname(path), {recursive: true})
    await Deno.writeTextFile(path, await fun())
  }
}

const routes = [
  {path: 'target/index.html', fun: Index},
  {path: 'target/404.html',   fun: NotFound},
]

function Index() {
  return Layout(
    p(`This text was rendered at build time.`),
    p(
      `No dynamic rendering in this example, for technical reasons:`,
      ul(
        li(
          `This example generates multiple HTML files. We want to put our
          browser-side JS in a single file, and use `, code(`<script src="...">`),
          ` to load it.`,
        ),
        li(
          `We also want to use `, code(`type="module"`), ` for the browser script,
          which allows modern JS features such as imports.`,
        ),
        li(
          `Browsers refuse to load local "module" scripts when the page URL is `,
          code(`file://some-local-file`), `. They require an HTTP server.
          Alternatively, we could inline the script into each HTML file, but
          that's not ideal.`,
        ),
      )
    ),
    p(`See the next example with an HTTP server.`),
  )
}

function NotFound() {
  return Layout(
    p(`Sorry! Page not found.`),
    E('a', {href: 'index.html'}, `Return home`),
  )
}

function Layout(...children) {
  return doc(
    E('html', {},
      E('head', {},
        E('link', {rel: 'icon', href: 'data:;base64,='}),
        E('link', {rel: 'stylesheet', href: 'main.css'}),
      ),
      E('body', {class: 'center limit'}, children),
    )
  )
}

const p = e('p', {})
const ul = e('ul', {})
const li = e('li', {})
const code = e('code', {})

await main()

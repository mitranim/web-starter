import * as pt from 'path'
import * as hs from 'http/server'
import * as a from 'afr'
import {E, doc, e} from 'prax'

const afrOpts = {port: 36582}
const srvOpts = {port: 36583, hostname: 'localhost'}
const dirs = [a.dir('target'), a.dir('.', /^browser[.].mjs$/)]


const routes = [
  {path: 'target/index.html', fun: Index},
  {path: 'target/404.html',   fun: NotFound},
]

async function main() {
  if (Deno.args.includes('html')) await html()
  if (Deno.args.includes('srv')) await srv()
}

async function html() {
  for (const {path, fun} of routes) {
    await Deno.mkdir(pt.dirname(path), {recursive: true})
    await Deno.writeTextFile(path, await fun())
  }
  console.log('[html] done')
}

async function srv() {
  const srv = hs.serve(srvOpts)
  console.log(`[srv] listening on http://${srvOpts.hostname}:${srvOpts.port}`)
  watch()
  for await (const req of srv) respond(req)
}

async function respond(req) {
  if (await a.serveSiteWithNotFound(req, dirs)) return
  await req.respond({status: 404, body: 'not found'})
}

async function watch() {
  a.maybeSend(a.change, afrOpts)
  for await (const msg of a.watch('.', dirs, {recursive: true})) {
    await a.send(msg, afrOpts)
  }
}

function Index() {
  return Layout(
    p(`This text was rendered at build time.`),
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
        E('link', {rel: 'stylesheet', href: '/main.css'}),
      ),
      E('body', {class: 'center limit'}, children),
      E('script', {type: 'module', src: '/browser.mjs'}),

      Deno.args.includes(srv.name)
      ? E('script', {type: 'module', src: a.clientPath(afrOpts)})
      : null,
    )
  )
}

export const p = e('p', {})
export const ul = e('ul', {})
export const li = e('li', {})
export const code = e('code', {})

await main()

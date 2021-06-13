import * as pt from 'path'
import * as hs from 'http/server'
import * as a from 'afr'
import {E} from 'prax'
import * as x from 'prax'

const afrOpts = {port: 36582}
const srvOpts = {port: 36583, hostname: 'localhost'}
const dirs = [a.dir('target'), a.dir('static')]

const routes = [
  {url: '/',       path: 'target/index.html', fun: Index},
  {url: undefined, path: 'target/404.html',   fun: NotFound},
]

const notFound = routes.find(route => !route.url)

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

  const route = routes.find(route => route.url === req.url)
  if (route) {
    await req.respond({body: await route.fun(), headers: htmlHeaders})
    return
  }

  await req.respond({status: 404, body: await notFound.fun(), headers: htmlHeaders})
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
  return x.doc(
    E('html', {},
      E('head', {},
        E('link', {rel: 'icon', href: 'data:;base64,='}),
        E('link', {rel: 'stylesheet', href: '/main.css'}),
        swScript(),
      ),
      E('body', {class: 'center limit'}, children),
      E('script', {type: 'module', src: '/browser.mjs'}),

      Deno.args.includes(srv.name)
      ? E('script', {type: 'module', src: a.clientPath(afrOpts)})
      : null,
    )
  )
}

function swScript() {
  return E('script', {}, new x.Raw(`
    navigator.serviceWorker.register('/sw.mjs')
  `.trim()))
}

export const p = x.e('p', {})
export const ul = x.e('ul', {})
export const li = x.e('li', {})
export const code = x.e('code', {})

const htmlHeaders = new Headers({'content-type': 'text/html'})

await main()

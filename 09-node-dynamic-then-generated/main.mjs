import * as fp from 'fs/promises'
import * as pt from 'path'
import * as ht from 'http'
import * as ut from 'util'
import * as a from 'afr'
import {E} from 'prax'
import * as x from 'prax'

const args = process.argv.slice(2)
const afrOpts = {port: 36582}
const srvOpts = {port: 36583}
const dirs = [a.dir('target'), a.dir('static')]

const routes = [
  {url: '/',       path: 'target/index.html', fun: Index},
  {url: undefined, path: 'target/404.html',   fun: NotFound},
]

const notFound = routes.find(route => !route.url)

async function main() {
  if (args.includes('html')) await html()
  if (args.includes('srv')) await srv()
}

async function html() {
  for (const {path, fun} of routes) {
    await fp.mkdir(pt.dirname(path), {recursive: true})
    await fp.writeFile(path, await fun(), 'utf-8')
  }
  console.log('[html] done')
}

async function srv() {
  const srv = new ht.Server()
  srv.on('request', respond)

  await ut.promisify(srv.listen).call(srv, srvOpts.port)
  console.log(`[srv] listening on http://localhost:${srvOpts.port}`)

  watch()
  await ut.promisify(srv.once).call(srv, 'close')
}

async function respond(req, res) {
  if (await a.serveSiteWithNotFound(req, res, dirs)) return

  const route = routes.find(route => route.url === req.url)
  if (route) {
    respondWith(res, {body: await route.fun(), headers: htmlHeaders})
    return
  }

  respondWith(res, {status: 404, body: await notFound.fun(), headers: htmlHeaders})
}

async function watch() {
  a.maybeSend(a.change, afrOpts)
  for await (const msg of a.watch('.', dirs, {recursive: true})) {
    await a.send(msg, afrOpts)
  }
}

function respondWith(res, {status, headers, body}) {
  res.writeHead(status || 200, headers)
  res.end(body)
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

      args.includes(srv.name)
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

const htmlHeaders = {'content-type': 'text/html'}

await main()

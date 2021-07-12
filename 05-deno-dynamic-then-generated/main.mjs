import * as pt from 'path'
import * as a from 'afr'
import {E} from 'prax'
import * as x from 'prax'

const afrOpts = {port: 36582}
const srvOpts = {port: 36583, hostname: 'localhost'}
const dirs = [a.dir('target'), a.dir('static')]

const routes = [
  {pathname: '/',       path: 'target/index.html', fun: Index},
  {pathname: undefined, path: 'target/404.html',   fun: NotFound},
]

const notFound = routes.find(route => !route.pathname)

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
  const lis = Deno.listen(srvOpts)
  console.log(`[srv] listening on http://${srvOpts.hostname || 'localhost'}:${srvOpts.port}`)
  watch()
  for await (const conn of lis) serveHttp(conn)
}

async function serveHttp(conn) {
  for await (const event of Deno.serveHttp(conn)) {
    respond(event)
  }
}

async function respond(event) {
  const {request: req} = event
  try {
    await event.respondWith(response(req))
  }
  catch (err) {
    console.error(`[srv] unexpected error while serving ${req.url}:`, err)
  }
}

async function response(req) {
  try {
    return (
      (await a.resSiteWithNotFound(req, dirs)) ||
      (await routeResponse(req)) ||
      new Response('not found', {status: 404})
    )
  }
  catch (err) {
    // console.error(`[srv] unexpected error while serving ${req.url}:`, err)
    return new Response(err?.stack || err?.message || err, {status: 500})
  }
}

async function routeResponse(req) {
  const {pathname} = new URL(req.url)

  const route = routes.find(route => route.pathname === pathname)
  if (route) {
    return new Response(await route.fun(), {headers: htmlHeaders})
  }
  return new Response(await notFound.fun(), {headers: htmlHeaders, status: 404})
}

async function watch() {
  a.maybeSend(a.change, afrOpts)
  for await (const msg of a.watch('.', dirs, {recursive: true})) {
    await a.maybeSend(msg, afrOpts)
  }
}

function Index() {
  return Layout(
    p(`This text was rendered at build or response time.`),
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

const htmlHeaders = {'content-type': 'text/html'}

await main()

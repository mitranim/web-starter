import * as a from 'https://deno.land/x/afr@0.4.0/afr.mjs'

const srvOpts = {port: 36583, hostname: 'localhost'}
const dirs = [a.dir('.', /[.](?:html|css|mjs)$/)]

const lis = Deno.listen(srvOpts)
console.log(`[srv] listening on http://${srvOpts.hostname || 'localhost'}:${srvOpts.port}`)

for await (const conn of lis) serveHttp(conn)

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
      new Response('not found', {status: 404})
    )
  }
  catch (err) {
    // console.error(`[srv] unexpected error while serving ${req.url}:`, err)
    return new Response(err?.stack || err?.message || err, {status: 500})
  }
}

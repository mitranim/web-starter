import * as hs from 'https://deno.land/std@0.97.0/http/server.ts'
import * as a from 'https://unpkg.com/afr@0.3.2/afr_deno.mjs'

const srvOpts = {port: 36583, hostname: 'localhost'}
const dirs = [a.dir('.', /[.](?:html|css|mjs)$/)]

const srv = hs.serve(srvOpts)
console.log(`[srv] listening on http://${srvOpts.hostname}:${srvOpts.port}`)

for await (const req of srv) respond(req)

async function respond(req) {
  if (await a.serveSiteWithNotFound(req, dirs)) return
  await req.respond({status: 404, body: 'not found'})
}

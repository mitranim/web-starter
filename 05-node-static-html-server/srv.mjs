import * as ht from 'http'
import * as ut from 'util'
import * as a from 'afr'

const srvOpts = {port: 36583}
const dirs = [a.dir('.', /[.]html|css|mjs$/)]

const srv = new ht.Server()
srv.on('request', respond)

async function main() {
  await ut.promisify(srv.listen).call(srv, srvOpts.port)
  console.log(`[srv] listening on http://localhost:${srvOpts.port}`)
  await ut.promisify(srv.once).call(srv, 'close')
}

async function respond(req, res) {
  if (await a.serveSiteWithNotFound(req, res, dirs)) return
  res.writeHead(404)
  res.end('not found')
}

main()

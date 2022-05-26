import * as a from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.23/all.mjs'
import * as hd from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.23/http_deno.mjs'
import * as l from './live.mjs'
import * as s from './site.mjs'

const srv = new class Srv extends hd.Srv {
  async res(req) {
    const rou = new a.ReqRou(req)

    return (
      (await s.dirs.resolveFile(rou.url))?.res() ||
      a.procure(s.site.all(), page => (
        rou.get(page.urlPath()) && page.res(rou)
      )) ||
      s.site.notFound.res(rou)
    )
  }
}()

async function main() {
  liveReload()
  await srv.listen({port: 36583, hostname: `localhost`})
}

/*
Tells each connected "live client" to reload the page.
Requires `make live`, which is invoked by default by `make`.
*/
function liveReload() {
  fetch(l.LIVE_SEND, {method: `post`, body: `{"type":"change"}`}).catch(a.nop)
}

if (import.meta.main) await main()

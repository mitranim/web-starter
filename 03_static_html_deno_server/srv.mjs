import * as a from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.19/all.mjs'
import * as hd from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.19/http_deno.mjs'

const srv = new class Srv extends hd.Srv {
  dirs = hd.Dirs.of(
    hd.dirRel(`.`, /[.](?:html|css|mjs)$/),
  )

  async res(req) {
    const rou = new a.ReqRou(req)

    return (
      (await this.dirs.resolveSiteFileWithNotFound(rou.url))?.res() ||
      rou.notFound()
    )
  }
}()

await srv.listen({port: 36583, hostname: `localhost`})

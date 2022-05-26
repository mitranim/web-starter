/*
Tiny development server for client page reloading and CSS reinjection.
Serves its own client script, watches files, and broadcasts notifications.
The main server also uses this to broadcast a signal about its own restart.
*/

import * as hd from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.23/http_deno.mjs'
import * as ld from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.23/live_deno.mjs'
import * as s from './site.mjs'

export const LIVE_CLIENT = `http://localhost:36582/e8f2dcbe89994b14a1a1c59c2ea6eac7/live_client.mjs`
export const LIVE_SEND = `http://localhost:36582/e8f2dcbe89994b14a1a1c59c2ea6eac7/send`

const srv = new class Srv extends hd.Srv {
  bro = new ld.LiveBroad()

  async res(req) {
    return (
      (await this.bro.res(req)) ||
      new Response(`not found`, {status: 404})
    )
  }

  async watch() {
    for await (const val of s.dirs.watchLive()) {
      await this.bro.writeEventJson(val)
    }
  }

  onListen() {}
}()

async function main() {
  srv.watch()
  await srv.listen({port: 36582, hostname: `localhost`})
}

if (import.meta.main) await main()

/* global Deno */

import * as a from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.19/all.mjs'
import * as hd from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.19/http_deno.mjs'
import * as ld from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.19/live_deno.mjs'
import {paths as p} from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.19/io_deno.mjs'
import {E, ren} from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.19/ren_str.mjs'
import * as l from './live.mjs'

const DEV = Deno.args.includes(`--dev`)

export const dirs = ld.LiveDirs.of(
  hd.dirRel(`target`),
  hd.dirRel(`static`),
)

class Page extends a.Dict {
  urlPath() {return ``}

  fsPath() {
    const path = a.laxStr(this.urlPath())
    return path && a.stripPre(path, `/`) + `.html`
  }

  targetPath() {
    const path = a.laxStr(this.fsPath())
    return path && p.join(`target`, path)
  }

  title() {return ``}

  res() {return a.resBui().html(this.body()).res()}

  body() {return ``}

  async write() {
    const path = this.targetPath()
    if (!path) return

    const body = this.body()
    if (!body) return

    await Deno.mkdir(p.dir(path), {recursive: true})
    await Deno.writeTextFile(path, body)

    console.log(`[html] wrote`, path)
  }
}

class Page404 extends Page {
  fsPath() {return `404.html`}
  title() {return `Page Not Found`}
  res() {return a.resBui().html(this.body()).code(404).res()}

  body() {
    return Layout(
      E(`h1`, {}, this.title()),
      E(`a`, {href: `/`}, `Return home`),
    )
  }
}

class PageIndex extends Page {
  urlPath() {return `/`}
  fsPath() {return `index.html`}
  title() {return `Main Page`}

  body() {
    return Layout(
      E(`h1`, {}, this.title()),
      E(`p`, {}, `This text was pre-rendered in HTML.`),
    )
  }
}

class PageAbout extends Page {
  urlPath() {return `/about`}
  title() {return `About`}

  body() {
    return Layout(
      E(`h1`, {}, this.title()),
      E(`p`, {}, `This text was pre-rendered in HTML.`),
    )
  }
}

class Site extends a.Emp {
  constructor() {
    super()
    this.notFound = new Page404()
    this.index = new PageIndex()
    this.other = [new PageAbout()]
  }

  all() {return [this.index, this.notFound, ...this.other]}
}

export const site = new Site()

function Layout(...chi) {
  return ren.doc(
    E(`html`, {},
      E(`head`, {},
        E(`link`, {rel: `icon`, href: `data:;base64,=`}),
        E(`link`, {rel: `stylesheet`, href: `/main.css`}),
        a.vac(DEV) && E(`script`, {}, `navigator.serviceWorker.register('/sw.mjs')`),
      ),
      E(`body`, {class: `center limit`}, chi),
      E(`script`, {type: `module`, src: `/browser.mjs`}),
      a.vac(DEV) && E(`script`, {type: `module`, src: l.LIVE_CLIENT}),
    )
  )
}

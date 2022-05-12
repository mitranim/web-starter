import * as s from './site.mjs'

async function main() {
  await Promise.all(s.site.all().map(pageWrite))
  console.log(`[html] done`)
}

async function pageWrite(page) {await page.write()}

if (import.meta.main) await main()

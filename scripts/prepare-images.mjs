import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import ogs from 'open-graph-scraper'

const apps = JSON.parse(await fs.readFile('data/apps.json', 'utf8'))
const manifest = {}
for (const app of apps) {
  for (const field of ['logo', 'image']) {
    let source = app[field]
    if (!source) continue
    const exists = source.startsWith('/') && await fs.access(`public${source}`).then(() => true, () => false)
    if (!exists) {
      const candidates = [source.startsWith('http') ? source : app[`${field}Original`]].filter(Boolean)
      try {
        const { result } = await ogs({ url: app.website, timeout: 8 })
        if (field === 'image' && result.ogImage?.[0]?.url) candidates.push(new URL(result.ogImage[0].url, app.website).href)
        if (field === 'logo' && result.favicon) candidates.push(new URL(result.favicon, app.website).href)
      } catch {}
      let recovered = false
      for (const url of [...new Set(candidates)]) {
        try {
          const response = await fetch(url, { signal: AbortSignal.timeout(10000) })
          if (!response.ok) continue
          const buffer = Buffer.from(await response.arrayBuffer())
          await sharp(buffer).metadata()
          const local = `/apps/${app.slug}/${field}-local.webp`
          await fs.mkdir(`public/apps/${app.slug}`, { recursive: true })
          await sharp(buffer).resize({ width: field === 'logo' ? 160 : 1280, withoutEnlargement: true }).webp({ quality: 85 }).toFile(`public${local}`)
          app[`${field}Original`] ||= source
          source = app[field] = local
          recovered = true
          console.log('Recovered', app.slug, field)
          break
        } catch {}
      }
      if (!recovered) {
        app[`${field}Original`] ||= source
        app[field] = ''
        console.log('Using text fallback', app.slug, field)
        continue
      }
    }
    const widths = field === 'logo' ? [80, 160] : [640, 1280]
    const variants = []
    for (const width of widths) {
      const dest = `/apps/${app.slug}/${field}-${width}.webp`
      const info = await sharp(`public${source}`).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public${dest}`)
      if (!variants.some(v => v.width === info.width)) variants.push({ src: dest, width: info.width, height: info.height })
    }
    manifest[source] = variants
  }
}
await fs.writeFile('data/apps.json', JSON.stringify(apps, null, 2) + '\n')
await fs.writeFile('data/image-variants.json', JSON.stringify(manifest, null, 2) + '\n')
console.log('Prepared', Object.keys(manifest).length, 'local image sources')

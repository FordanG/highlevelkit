import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function fetchPageMeta(url) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    })
    clearTimeout(timeout)

    if (!response.ok) return { ogImage: null, favicon: null }

    const html = await response.text()
    const urlObj = new URL(url)
    const baseUrl = `${urlObj.protocol}//${urlObj.host}`

    // Try to find og:image
    let ogImage = null
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i)

    if (ogImageMatch) {
      ogImage = ogImageMatch[1]
      if (ogImage.startsWith('/')) {
        ogImage = `${baseUrl}${ogImage}`
      }
    }

    // Try twitter:image as fallback for og:image
    if (!ogImage) {
      const twitterImageMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i)
        || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i)

      if (twitterImageMatch) {
        ogImage = twitterImageMatch[1]
        if (ogImage.startsWith('/')) {
          ogImage = `${baseUrl}${ogImage}`
        }
      }
    }

    // Try to find favicon/icon
    let favicon = null

    // Look for apple-touch-icon first (usually higher quality)
    const appleTouchMatch = html.match(/<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i)
      || html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']apple-touch-icon["']/i)

    if (appleTouchMatch) {
      favicon = appleTouchMatch[1]
    }

    // Try icon or shortcut icon
    if (!favicon) {
      const iconMatch = html.match(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i)
        || html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["'](?:shortcut )?icon["']/i)

      if (iconMatch) {
        favicon = iconMatch[1]
      }
    }

    // Default to /favicon.ico
    if (!favicon) {
      favicon = '/favicon.ico'
    }

    // Make favicon absolute
    if (favicon.startsWith('/')) {
      favicon = `${baseUrl}${favicon}`
    } else if (!favicon.startsWith('http')) {
      favicon = `${baseUrl}/${favicon}`
    }

    return { ogImage, favicon }
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message)
    return { ogImage: null, favicon: null }
  }
}

async function main() {
  const appsPath = path.join(__dirname, '../data/apps.json')
  const apps = JSON.parse(fs.readFileSync(appsPath, 'utf-8'))

  console.log(`Fetching meta for ${apps.length} apps...\n`)

  let imagesUpdated = 0
  let logosUpdated = 0

  for (const app of apps) {
    const url = app.website
    if (!url) {
      console.log(`⏭️  ${app.name}: No website`)
      continue
    }

    const needsImage = !app.image
    // Check if logo looks like an OG image (large marketing image) rather than an actual icon/favicon
    const looksLikeOgImage = app.logo && (
      app.logo.includes('og-') ||
      app.logo.includes('og_') ||
      app.logo.includes('homepage') ||
      app.logo.includes('banner') ||
      app.logo.includes('opengraph') ||
      app.logo.includes('/og/') ||
      app.logo.includes('1200x') ||
      app.logo.includes('share_image')
    )
    const needsLogo = !app.logo || app.logo.includes('simpleicons.org') || looksLikeOgImage

    if (!needsImage && !needsLogo) {
      console.log(`✓  ${app.name}: Already has image and logo`)
      continue
    }

    console.log(`🔍 ${app.name}: Fetching from ${url}...`)
    const { ogImage, favicon } = await fetchPageMeta(url)

    if (needsImage && ogImage) {
      app.image = ogImage
      imagesUpdated++
      console.log(`   ✅ Found OG image`)
    } else if (needsImage) {
      console.log(`   ❌ No OG image found`)
    }

    if (needsLogo && favicon) {
      app.logo = favicon
      logosUpdated++
      console.log(`   ✅ Found favicon/logo`)
    } else if (needsLogo) {
      console.log(`   ❌ No favicon found`)
    }

    // Small delay to be respectful
    await new Promise(r => setTimeout(r, 500))
  }

  // Write updated apps back
  fs.writeFileSync(appsPath, JSON.stringify(apps, null, 2) + '\n')

  console.log(`\n✅ Done! Updated ${imagesUpdated} images and ${logosUpdated} logos.`)
}

main()

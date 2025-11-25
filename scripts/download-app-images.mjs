import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appsPath = path.join(__dirname, '../data/apps.json')
const publicDir = path.join(__dirname, '../public')
const appsImagesDir = path.join(publicDir, 'apps')

// Create apps images directory if it doesn't exist
if (!fs.existsSync(appsImagesDir)) {
  fs.mkdirSync(appsImagesDir, { recursive: true })
}

async function downloadImage(url, timeout = 15000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      }
    })
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const contentType = response.headers.get('content-type') || ''
    const buffer = Buffer.from(await response.arrayBuffer())

    return { buffer, contentType }
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

function getImageExtension(contentType, url) {
  // Check content type first
  if (contentType.includes('svg')) return 'svg'
  if (contentType.includes('png')) return 'png'
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return 'jpg'
  if (contentType.includes('webp')) return 'webp'
  if (contentType.includes('gif')) return 'gif'
  if (contentType.includes('ico') || contentType.includes('icon')) return 'ico'

  // Fall back to URL extension
  const urlPath = new URL(url).pathname.toLowerCase()
  if (urlPath.endsWith('.svg')) return 'svg'
  if (urlPath.endsWith('.png')) return 'png'
  if (urlPath.endsWith('.jpg') || urlPath.endsWith('.jpeg')) return 'jpg'
  if (urlPath.endsWith('.webp')) return 'webp'
  if (urlPath.endsWith('.gif')) return 'gif'
  if (urlPath.endsWith('.ico')) return 'ico'

  return 'png' // default
}

async function optimizeImage(buffer, contentType, type, outputPath) {
  const isSvg = contentType.includes('svg')
  const isIco = contentType.includes('ico') || contentType.includes('icon')

  try {
    if (type === 'logo') {
      // Optimize logo to 128x128 PNG
      if (isSvg) {
        await sharp(buffer, { density: 300 })
          .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png({ quality: 90, compressionLevel: 9 })
          .toFile(outputPath)
      } else if (isIco) {
        // For ICO files, try to convert, but may need special handling
        await sharp(buffer)
          .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png({ quality: 90, compressionLevel: 9 })
          .toFile(outputPath)
      } else {
        await sharp(buffer)
          .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png({ quality: 90, compressionLevel: 9 })
          .toFile(outputPath)
      }
    } else if (type === 'og') {
      // Optimize OG image to max 1200x630, preserve aspect ratio
      if (isSvg) {
        await sharp(buffer, { density: 150 })
          .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 85, progressive: true })
          .toFile(outputPath)
      } else {
        await sharp(buffer)
          .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 85, progressive: true })
          .toFile(outputPath)
      }
    }
    return true
  } catch (error) {
    console.error(`    Error optimizing: ${error.message}`)
    return false
  }
}

async function processApp(app) {
  const appDir = path.join(appsImagesDir, app.slug)

  // Create app directory if it doesn't exist
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true })
  }

  const results = {
    logo: null,
    image: null
  }

  // Process logo
  if (app.logo && app.logo.startsWith('http')) {
    const logoPath = path.join(appDir, 'logo.png')

    // Skip if already exists
    if (fs.existsSync(logoPath)) {
      results.logo = `/apps/${app.slug}/logo.png`
      console.log(`  ✓ Logo already exists`)
    } else {
      try {
        console.log(`  📥 Downloading logo...`)
        const { buffer, contentType } = await downloadImage(app.logo)

        console.log(`  🔧 Optimizing logo...`)
        const success = await optimizeImage(buffer, contentType, 'logo', logoPath)

        if (success) {
          results.logo = `/apps/${app.slug}/logo.png`
          console.log(`  ✅ Logo saved`)
        }
      } catch (error) {
        console.log(`  ❌ Logo failed: ${error.message}`)
      }
    }
  }

  // Process OG image
  if (app.image && app.image.startsWith('http')) {
    const ogPath = path.join(appDir, 'og.jpg')

    // Skip if already exists
    if (fs.existsSync(ogPath)) {
      results.image = `/apps/${app.slug}/og.jpg`
      console.log(`  ✓ OG image already exists`)
    } else {
      try {
        console.log(`  📥 Downloading OG image...`)
        const { buffer, contentType } = await downloadImage(app.image)

        console.log(`  🔧 Optimizing OG image...`)
        const success = await optimizeImage(buffer, contentType, 'og', ogPath)

        if (success) {
          results.image = `/apps/${app.slug}/og.jpg`
          console.log(`  ✅ OG image saved`)
        }
      } catch (error) {
        console.log(`  ❌ OG image failed: ${error.message}`)
      }
    }
  }

  return results
}

async function main() {
  console.log('🚀 Starting image download and optimization...\n')

  const apps = JSON.parse(fs.readFileSync(appsPath, 'utf-8'))

  let logosDownloaded = 0
  let ogImagesDownloaded = 0
  let logosFailed = 0
  let ogImagesFailed = 0

  for (const app of apps) {
    console.log(`\n📦 Processing: ${app.name}`)

    const results = await processApp(app)

    // Update app with local paths if successful
    if (results.logo) {
      // Store original URL for reference
      if (!app.logoOriginal && app.logo.startsWith('http')) {
        app.logoOriginal = app.logo
      }
      app.logo = results.logo
      logosDownloaded++
    } else if (app.logo && app.logo.startsWith('http')) {
      logosFailed++
    }

    if (results.image) {
      // Store original URL for reference
      if (!app.imageOriginal && app.image.startsWith('http')) {
        app.imageOriginal = app.image
      }
      app.image = results.image
      ogImagesDownloaded++
    } else if (app.image && app.image.startsWith('http')) {
      ogImagesFailed++
    }

    // Small delay between apps to be respectful
    await new Promise(r => setTimeout(r, 300))
  }

  // Save updated apps.json
  fs.writeFileSync(appsPath, JSON.stringify(apps, null, 2) + '\n')

  console.log('\n' + '='.repeat(50))
  console.log('📊 Summary:')
  console.log(`   Logos downloaded: ${logosDownloaded}`)
  console.log(`   Logos failed: ${logosFailed}`)
  console.log(`   OG images downloaded: ${ogImagesDownloaded}`)
  console.log(`   OG images failed: ${ogImagesFailed}`)
  console.log('='.repeat(50))
  console.log('\n✅ Done! Apps.json has been updated with local paths.')
}

main().catch(console.error)

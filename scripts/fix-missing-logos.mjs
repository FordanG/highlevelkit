import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appsPath = path.join(__dirname, '../data/apps.json')
const publicDir = path.join(__dirname, '../public')
const appsImagesDir = path.join(publicDir, 'apps')

async function downloadImage(url, timeout = 15000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
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

async function optimizeLogo(buffer, contentType, outputPath) {
  const isSvg = contentType.includes('svg')

  try {
    if (isSvg) {
      await sharp(buffer, { density: 300 })
        .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ quality: 90, compressionLevel: 9 })
        .toFile(outputPath)
    } else {
      await sharp(buffer)
        .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ quality: 90, compressionLevel: 9 })
        .toFile(outputPath)
    }
    return true
  } catch (error) {
    console.error('    Error optimizing: ' + error.message)
    return false
  }
}

async function optimizeOG(buffer, contentType, outputPath) {
  const isSvg = contentType.includes('svg')

  try {
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
    return true
  } catch (error) {
    console.error('    Error optimizing: ' + error.message)
    return false
  }
}

async function main() {
  console.log('🔧 Fixing missing logos and images...\n')

  const apps = JSON.parse(fs.readFileSync(appsPath, 'utf-8'))
  let fixed = 0
  let failed = 0

  // First pass: identify missing files
  console.log('📋 Checking for missing files...\n')
  for (const app of apps) {
    const logoPath = app.logo ? path.join(publicDir, app.logo.replace(/^\//, '')) : ''
    const imagePath = app.image ? path.join(publicDir, app.image.replace(/^\//, '')) : ''
    const logoExists = app.logo && !app.logo.startsWith('http') && fs.existsSync(logoPath)
    const imageExists = app.image && !app.image.startsWith('http') && fs.existsSync(imagePath)

    if (!logoExists || !imageExists) {
      console.log(app.name + ':')
      if (!logoExists) console.log('  Logo: ' + (app.logo || 'none') + ' | Original: ' + (app.logoOriginal || 'NONE'))
      if (!imageExists) console.log('  Image: ' + (app.image || 'none') + ' | Original: ' + (app.imageOriginal || 'NONE'))
    }
  }
  console.log('\n')

  for (const app of apps) {
    const appDir = path.join(appsImagesDir, app.slug)

    // Ensure directory exists
    if (!fs.existsSync(appDir)) {
      fs.mkdirSync(appDir, { recursive: true })
    }

    // Check if logo file exists (skip if it's an http URL)
    const logoPath = app.logo ? path.join(publicDir, app.logo.replace(/^\//, '')) : ''
    const logoExists = app.logo && !app.logo.startsWith('http') && fs.existsSync(logoPath)

    // Check if image file exists (skip if it's an http URL)
    const imagePath = app.image ? path.join(publicDir, app.image.replace(/^\//, '')) : ''
    const imageExists = app.image && !app.image.startsWith('http') && fs.existsSync(imagePath)

    // Fix missing logo - use logoOriginal or current logo if it's a URL
    const logoUrl = app.logoOriginal || (app.logo && app.logo.startsWith('http') ? app.logo : null)
    if (!logoExists && logoUrl) {
      console.log('📦 ' + app.name + ': Downloading missing logo...')
      try {
        const { buffer, contentType } = await downloadImage(logoUrl)
        const outputPath = path.join(appDir, 'logo.png')
        const success = await optimizeLogo(buffer, contentType, outputPath)
        if (success) {
          if (!app.logoOriginal) app.logoOriginal = logoUrl
          app.logo = '/apps/' + app.slug + '/logo.png'
          console.log('  ✅ Logo fixed')
          fixed++
        }
      } catch (error) {
        console.log('  ❌ Logo failed: ' + error.message)
        failed++
      }
    }

    // Fix missing image - use imageOriginal or current image if it's a URL
    const imageUrl = app.imageOriginal || (app.image && app.image.startsWith('http') ? app.image : null)
    if (!imageExists && imageUrl) {
      console.log('📦 ' + app.name + ': Downloading missing OG image...')
      try {
        const { buffer, contentType } = await downloadImage(imageUrl)
        const outputPath = path.join(appDir, 'og.jpg')
        const success = await optimizeOG(buffer, contentType, outputPath)
        if (success) {
          if (!app.imageOriginal) app.imageOriginal = imageUrl
          app.image = '/apps/' + app.slug + '/og.jpg'
          console.log('  ✅ OG image fixed')
          fixed++
        }
      } catch (error) {
        console.log('  ❌ OG image failed: ' + error.message)
        failed++
      }
    }

    await new Promise(r => setTimeout(r, 200))
  }

  // Save updated apps.json
  fs.writeFileSync(appsPath, JSON.stringify(apps, null, 2) + '\n')

  console.log('\n' + '='.repeat(50))
  console.log('📊 Fixed: ' + fixed + ', Failed: ' + failed)
  console.log('='.repeat(50))
}

main().catch(console.error)

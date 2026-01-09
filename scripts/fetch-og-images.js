#!/usr/bin/env node
/**
 * Script to fetch OG images for all apps using open-graph-scraper
 * Downloads images locally and updates apps.json
 */

import ogs from 'open-graph-scraper'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const APPS_JSON_PATH = path.join(rootDir, 'data', 'apps.json')
const PUBLIC_APPS_DIR = path.join(rootDir, 'public', 'apps')

/**
 * Fetch OG data from a URL
 */
async function fetchOgData(url) {
  try {
    const { result } = await ogs({
      url,
      timeout: 10000,
      fetchOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }
    })
    return {
      image: result.ogImage?.[0]?.url || result.ogImage?.url,
      title: result.ogTitle,
      description: result.ogDescription,
      siteName: result.ogSiteName
    }
  } catch (error) {
    console.error(`  Error fetching OG data: ${error.message}`)
    return null
  }
}

/**
 * Download an image from URL and save locally
 */
async function downloadImage(imageUrl, savePath) {
  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    let extension = '.jpg'

    if (contentType) {
      if (contentType.includes('png')) extension = '.png'
      else if (contentType.includes('webp')) extension = '.webp'
      else if (contentType.includes('gif')) extension = '.gif'
      else if (contentType.includes('svg')) extension = '.svg'
    }

    const buffer = await response.arrayBuffer()
    const finalPath = savePath.replace(/\.[^.]+$/, extension)

    await fs.writeFile(finalPath, Buffer.from(buffer))
    return finalPath
  } catch (error) {
    console.error(`  Error downloading image: ${error.message}`)
    return null
  }
}

/**
 * Ensure directory exists
 */
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true })
  } catch (error) {
    if (error.code !== 'EEXIST') throw error
  }
}

/**
 * Main function to process all apps
 */
async function main() {
  console.log('🔍 Fetching OG images for all apps...\n')

  // Read apps.json
  const appsData = JSON.parse(await fs.readFile(APPS_JSON_PATH, 'utf-8'))
  let updated = 0
  let skipped = 0
  let failed = 0

  for (const app of appsData) {
    console.log(`📦 Processing: ${app.name}`)

    // Skip if already has a local image
    if (app.image && app.image.startsWith('/apps/')) {
      const localPath = path.join(rootDir, 'public', app.image)
      try {
        await fs.access(localPath)
        console.log(`  ✅ Already has local image: ${app.image}`)
        skipped++
        continue
      } catch {
        // File doesn't exist, continue to fetch
      }
    }

    // Get website URL (prefer affiliateLink, fallback to website)
    const websiteUrl = app.website || app.affiliateLink
    if (!websiteUrl) {
      console.log(`  ⚠️ No website URL found, skipping`)
      skipped++
      continue
    }

    // Fetch OG data
    const ogData = await fetchOgData(websiteUrl)
    if (!ogData || !ogData.image) {
      console.log(`  ⚠️ No OG image found`)
      failed++
      continue
    }

    console.log(`  🖼️ Found OG image: ${ogData.image.substring(0, 60)}...`)

    // Create app directory
    const appDir = path.join(PUBLIC_APPS_DIR, app.slug)
    await ensureDir(appDir)

    // Download image
    const savePath = path.join(appDir, 'og.jpg')
    const savedPath = await downloadImage(ogData.image, savePath)

    if (savedPath) {
      // Update app.image to local path
      const relativePath = `/apps/${app.slug}/${path.basename(savedPath)}`
      app.image = relativePath
      console.log(`  ✅ Downloaded to: ${relativePath}`)
      updated++
    } else {
      failed++
    }
  }

  // Save updated apps.json
  await fs.writeFile(APPS_JSON_PATH, JSON.stringify(appsData, null, 2))

  console.log('\n📊 Summary:')
  console.log(`  ✅ Updated: ${updated}`)
  console.log(`  ⏭️ Skipped: ${skipped}`)
  console.log(`  ❌ Failed: ${failed}`)
  console.log('\n✨ Done! apps.json has been updated.')
}

main().catch(console.error)

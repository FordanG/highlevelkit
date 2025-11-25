import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '../public')

// Check if sharp is available
let sharp
try {
  sharp = (await import('sharp')).default
} catch (e) {
  console.log('sharp not installed. Run: npm install sharp --save-dev')
  console.log('\nAlternatively, manually convert the SVG files to PNG:')
  console.log('- public/favicon.svg → public/favicon.ico (32x32)')
  console.log('- public/favicon.svg → public/apple-touch-icon.png (180x180)')
  console.log('- public/og-image.svg → public/og-image.png (1200x630)')
  console.log('\nYou can use tools like:')
  console.log('- Figma (import SVG, export PNG)')
  console.log('- CloudConvert.com')
  console.log('- Inkscape')
  process.exit(0)
}

async function generateImages() {
  console.log('Generating images from SVGs...\n')

  // Generate favicon PNG (32x32)
  const faviconSvg = fs.readFileSync(path.join(publicDir, 'favicon.svg'))
  await sharp(faviconSvg)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'))
  console.log('✅ Generated favicon-32x32.png')

  // Generate apple-touch-icon (180x180)
  await sharp(faviconSvg)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'))
  console.log('✅ Generated apple-touch-icon.png')

  // Generate OG image (1200x630)
  const ogSvg = fs.readFileSync(path.join(publicDir, 'og-image.svg'))
  await sharp(ogSvg)
    .resize(1200, 630)
    .png()
    .toFile(path.join(publicDir, 'og-image.png'))
  console.log('✅ Generated og-image.png')

  console.log('\n✅ All images generated!')
}

generateImages().catch(console.error)

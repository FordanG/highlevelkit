# Claude AI Guidelines for HighLevel Kit

## Project Overview
This is a GoHighLevel app directory built with Nuxt 3, Vue 3, and Tailwind CSS. The site lists apps, integrations, and tools for the GoHighLevel ecosystem.

## Adding New Apps/Tools

### Fetching OG Images
When adding new tools to the directory, **always use `open-graph-scraper`** to fetch the Open Graph image from the tool's website and **download it locally**.

#### Batch Download (All Apps)

Run the batch script to fetch OG images for all apps:

```bash
node scripts/fetch-og-images.js
```

This script will:

- Fetch OG images from each app's website
- Download images locally to `/public/apps/{slug}/`
- Update `apps.json` with local image paths
- Skip apps that already have local images

#### Single App (Manual)

```javascript
import ogs from 'open-graph-scraper'
import fs from 'fs/promises'
import path from 'path'

const fetchAndDownloadOgImage = async (url, slug) => {
  try {
    // Fetch OG data
    const { result } = await ogs({ url })
    const imageUrl = result.ogImage?.[0]?.url || result.ogImage?.url

    if (!imageUrl) return null

    // Download image locally
    const response = await fetch(imageUrl)
    const buffer = await response.arrayBuffer()

    // Determine extension from content type
    const contentType = response.headers.get('content-type')
    let ext = '.jpg'
    if (contentType?.includes('png')) ext = '.png'
    if (contentType?.includes('webp')) ext = '.webp'

    // Save to public/apps/{slug}/
    const appDir = path.join('public', 'apps', slug)
    await fs.mkdir(appDir, { recursive: true })
    const savePath = path.join(appDir, `og${ext}`)
    await fs.writeFile(savePath, Buffer.from(buffer))

    return {
      localPath: `/apps/${slug}/og${ext}`,
      title: result.ogTitle,
      description: result.ogDescription,
      siteName: result.ogSiteName
    }
  } catch (error) {
    console.error('Error fetching OG data:', error)
    return null
  }
}

// Example: Add new app
const ogData = await fetchAndDownloadOgImage('https://example-tool.com', 'example-tool')
// Use ogData.localPath as the image path in apps.json
```

**Important:** Always store images locally in `/public/apps/{slug}/`. Never use external image URLs in production.

### App Data Structure
New apps should be added to `/data/apps.json` with this structure:

```json
{
  "id": "unique-slug",
  "name": "App Name",
  "slug": "url-friendly-slug",
  "tagline": "Short description (max 100 chars)",
  "description": "Full description of the app",
  "logo": "/apps/slug/logo.png",
  "image": "/apps/slug/og.jpg",
  "category": ["category-id"],
  "pricing": {
    "model": "paid|free|freemium",
    "startingPrice": 47,
    "currency": "USD"
  },
  "rating": 4.5,
  "reviewCount": 100,
  "featured": false,
  "trending": false,
  "useCase": ["Use Case 1"],
  "userType": ["Agency Owners"],
  "integrationLevel": "native|api|zapier",
  "setupDifficulty": "easy|medium|hard",
  "features": ["Feature 1", "Feature 2"],
  "website": "https://example.com",
  "affiliateLink": "https://example.com/?ref=code"
}
```

### Image Storage
- Store app images in `/public/apps/{slug}/`
- Required images:
  - `logo.png` - App logo (square, min 128x128)
  - `og.jpg` - Preview image (1200x630 recommended)

## Key Files

- `/data/apps.json` - App database
- `/data/categories.json` - Categories list
- `/composables/useSEO.ts` - SEO utilities and structured data
- `/composables/useSimilarApps.ts` - Similar apps algorithm
- `/composables/useAppSort.ts` - App sorting and prioritization

## SEO Guidelines

### Structured Data
The site uses multiple JSON-LD schemas:
- SoftwareApplication for apps
- Product with AggregateOffer for pricing
- BreadcrumbList for navigation
- Organization and WebSite for site-level data

### International SEO
Hreflang tags are implemented for 5 locales:
- English (default)
- Spanish
- German
- French
- Portuguese

Locale files are in `/i18n/locales/`

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run generate # Static site generation
npm run preview  # Preview production build
```

# Highlevel Kit

A curated directory and affiliate platform specifically for GoHighLevel apps, integrations, tools, and services. Think of it as "Product Hunt meets Toolfolio" for the GHL ecosystem.

## Features

- 🎯 **Curated App Directory** - Browse and discover GoHighLevel apps organized by categories
- 🔍 **Advanced Filtering** - Filter by category, pricing, setup difficulty, and more
- ⭐ **Featured & Trending** - Highlight top-rated and popular apps
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🌙 **Dark Mode** - Full dark mode support
- 🚀 **Fast Performance** - Built with Nuxt 3 and optimized for speed

## Tech Stack

- **Framework**: Nuxt 3
- **Styling**: Tailwind CSS
- **Data**: JSON files (easily replaceable with a database)
- **Type Safety**: TypeScript
- **Icons**: Emoji-based (can be replaced with actual images/icons)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:3000`

## Project Structure

```
highlevelkit-web/
├── assets/
│   └── css/
│       └── main.css          # Global styles and Tailwind config
├── components/
│   ├── app/
│   │   └── AppCard.vue       # App card component
│   ├── home/
│   │   └── HomeNewsletter.vue # Newsletter signup component
│   ├── AppFooter.vue         # Footer component
│   └── AppHeader.vue         # Header/navigation component
├── data/
│   ├── apps.json             # App database
│   ├── apps.ts               # TypeScript interfaces (reference)
│   └── categories.json       # Categories database
├── layouts/
│   └── default.vue           # Default layout
├── pages/
│   ├── apps/
│   │   ├── [slug].vue        # Individual app page
│   │   └── index.vue         # Apps directory/listing page
│   ├── categories.vue        # Categories overview page
│   ├── index.vue             # Homepage
│   └── submit.vue            # Submit app form
├── public/                   # Static assets
├── nuxt.config.ts           # Nuxt configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies
```

## Data Structure

### Apps (data/apps.json)

Each app in the database has the following structure:

```json
{
  "id": "1",
  "name": "App Name",
  "slug": "app-slug",
  "tagline": "Brief description",
  "description": "Full description",
  "logo": "🎯",
  "category": ["crm", "automation"],
  "pricing": {
    "model": "paid",
    "startingPrice": 97,
    "currency": "USD"
  },
  "rating": 4.8,
  "reviewCount": 124,
  "featured": true,
  "trending": true,
  "useCase": ["Lead Generation"],
  "userType": ["Agency Owners"],
  "integrationLevel": "native",
  "setupDifficulty": "medium",
  "features": ["Feature 1", "Feature 2"],
  "website": "https://example.com",
  "affiliateLink": "https://example.com/affiliate"
}
```

### Categories (data/categories.json)

```json
{
  "id": "crm",
  "name": "CRM Tools",
  "icon": "📊"
}
```

## Customization

### Adding New Apps

1. Edit `data/apps.json`
2. Add a new app object with all required fields
3. Ensure the `slug` field is unique and URL-friendly

### Adding New Categories

1. Edit `data/categories.json`
2. Add a new category with a unique ID
3. Use the category ID in app entries

### Styling

- Global styles: `assets/css/main.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Use Tailwind utility classes

### Using Real Images

To replace emoji logos with actual images:

1. Update the `logo` field in `apps.json` to use image URLs or paths
2. Modify `AppCard.vue` and app detail page to display `<img>` instead of emoji
3. Store images in the `public/` folder

Example:
```json
"logo": "/images/apps/my-app-logo.png"
```

## Monetization Features

The platform is designed to support:

- ✅ Affiliate commissions via `affiliateLink` field
- ✅ Sponsored listings via `featured` flag
- ✅ Premium vendor profiles
- ✅ Email newsletter collection

## Roadmap

- [ ] User authentication and accounts
- [ ] User reviews and ratings system
- [ ] App comparison tool
- [ ] "Stacks" feature for sharing tool combinations
- [ ] Advanced search with Algolia/Meilisearch
- [ ] Admin dashboard for managing apps
- [ ] Newsletter integration with email service
- [ ] Analytics tracking
- [ ] SEO optimization enhancements
- [ ] Blog/content section

## License

MIT License - feel free to use this project for your own directory!

---

Built with Nuxt 3 and Tailwind CSS

## Agent access and SEO checks

The deployed directory exposes `/api/search`, `/catalog.json`, `/llms.txt`,
`/llms-full.txt`, `/catalog/{slug}.md` and `/openapi.json`. Usage is documented at
`/for-agents`. The search function is read-only and requires no credentials.

`npm run generate` rebuilds the agent catalog from `data/apps.json` before
prerendering. After changing app images, run `npm run images:prepare`; inspect
any fallback notices and commit the generated local variants and manifest.
Run `npm run test:seo` after generation and `npm run test:agents` to validate
HTML/image/schema/sitemap output and API search behavior respectively.

Deploy through the existing Netlify site so the `/api/search` function is
included. A plain static HTTP server serves the catalog files but does not
execute the search function. See `docs/SEO-AND-AGENT-AUDIT-2026-11-16.md` for
the measured reporting baseline, changes and verification limits.

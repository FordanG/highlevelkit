<template>
  <div v-if="app">
    <!-- Preview Banner -->
    <div class="w-full h-48 sm:h-64 overflow-hidden relative" :style="!app.image ? gradientStyle : {}">
      <NuxtImg
        v-if="app.image"
        :src="app.image"
        :alt="`${app.name} - ${app.tagline} - GoHighLevel integration preview`"
        width="1200"
        height="400"
        format="webp"
        quality="85"
        class="w-full h-full object-cover"
        loading="eager"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <span class="text-3xl sm:text-4xl font-bold text-white/80 text-center drop-shadow-lg px-4">{{ app.name }}</span>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent"></div>
    </div>

    <!-- Breadcrumbs -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 -mt-16 relative z-10">
      <Breadcrumbs :items="breadcrumbItems" />
    </div>

    <!-- Hero Section -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <div v-if="isLogoUrl(app.logo)" class="w-32 h-32 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 flex items-center justify-center p-4">
              <img :src="app.logo" :alt="app.name" class="w-full h-full object-contain" />
            </div>
            <div v-else class="w-32 h-32 rounded-2xl flex items-center justify-center ring-1 ring-white/10" :style="logoGradientStyle">
              <span class="text-4xl font-bold text-white drop-shadow">{{ appInitials }}</span>
            </div>
          </div>

          <!-- Info -->
          <div class="flex-grow">
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-if="app.featured"
                class="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-primary-500/15 border border-primary-500/30 text-primary-200"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Featured
              </span>
              <span
                v-if="app.trending"
                class="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-200"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
                Trending
              </span>
              <span
                v-for="cat in app.category"
                :key="cat"
                class="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300"
              >
                {{ getCategoryName(cat) }}
              </span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3" style="letter-spacing:-0.02em">
              {{ app.name }}
            </h1>
            <p class="text-lg text-slate-400 mb-6">
              {{ app.tagline }}
            </p>

            <!-- Stats -->
            <div class="flex flex-wrap gap-6 mb-6">
              <a
                :href="`https://www.g2.com/search/products?query=${encodeURIComponent(app.name)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-lg font-semibold text-white">{{ app.rating }}</span>
                <span class="text-slate-400">({{ app.reviewCount }} reviews on G2)</span>
              </a>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium">
                  <span v-if="app.pricing.model === 'free'">Free</span>
                  <span v-else-if="app.pricing.model === 'freemium'">
                    From ${{ app.pricing.startingPrice }}/mo
                  </span>
                  <span v-else>
                    ${{ app.pricing.startingPrice }}/mo
                  </span>
                </span>
              </div>
            </div>

            <!-- CTA Button -->
            <div class="flex flex-wrap gap-3">
              <a
                v-if="app.affiliateLink || app.website"
                :href="app.affiliateLink || app.website"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-500 hover:bg-primary-400 rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-400/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Visit Website
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div class="max-w-3xl">
        <h2 class="text-2xl font-semibold tracking-tight text-white mb-4" style="letter-spacing:-0.02em">About</h2>
        <p class="text-slate-300 leading-relaxed text-lg">
          {{ app.description }}
        </p>
      </div>
    </div>

    <!-- Related Apps -->
    <section class="py-10 sm:py-14 border-t border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-8" style="letter-spacing:-0.02em">Related Apps</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <AppCard
            v-for="relatedApp in relatedApps"
            :key="relatedApp.id"
            :app="relatedApp"
          />
        </div>
      </div>
    </section>

    <!-- Explore More Categories - Internal Linking -->
    <section class="py-10 sm:py-14 border-t border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-xl font-semibold text-white mb-4">
          Explore More {{ getCategoryName(app.category[0]) }} Apps
        </h2>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="cat in app.category"
            :key="cat"
            :to="`/apps?category=${cat}`"
            class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Browse all {{ getCategoryName(cat) }} apps
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>

  <!-- 404 State -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-semibold tracking-tight text-white mb-4" style="letter-spacing:-0.02em">App Not Found</h1>
      <p class="text-slate-400 mb-8">The app you're looking for doesn't exist.</p>
      <Button
        as="a"
        href="/apps"
        label="Browse All Apps"
        severity="primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import appsData from '~/data/apps.json'
import categoriesData from '~/data/categories.json'

const { prioritizeApps } = useAppSort()
const { getSimilarApps } = useSimilarApps()

const route = useRoute()
const slug = route.params.slug as string

// Find the app
const app = appsData.find((a: any) => a.slug === slug)

// Get similar apps using improved algorithm with multiple criteria
const relatedApps = app
  ? prioritizeApps(getSimilarApps(app as any, appsData as any[], 4))
  : []

const isLogoUrl = (logo: string) => {
  return logo && (logo.startsWith('http://') || logo.startsWith('https://') || logo.startsWith('/'))
}

const getCategoryName = (id: string) => {
  const category = categoriesData.find(c => c.id === id)
  return category ? category.name : id
}

// Generate a hash number from string for consistent colors
const hashString = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

// Gradient color pairs for aesthetic placeholders
const gradientPairs = [
  ['#667eea', '#764ba2'], // Purple to violet
  ['#f093fb', '#f5576c'], // Pink to coral
  ['#4facfe', '#00f2fe'], // Blue to cyan
  ['#43e97b', '#38f9d7'], // Green to teal
  ['#fa709a', '#fee140'], // Pink to yellow
  ['#a8edea', '#fed6e3'], // Teal to pink
  ['#ff9a9e', '#fecfef'], // Salmon to rose
  ['#ffecd2', '#fcb69f'], // Peach to orange
  ['#667eea', '#764ba2'], // Indigo to purple
  ['#48c6ef', '#6f86d6'], // Sky to periwinkle
  ['#feada6', '#f5efef'], // Peach to cream
  ['#a18cd1', '#fbc2eb'], // Lavender to pink
  ['#fad0c4', '#ffd1ff'], // Blush to lavender
  ['#30cfd0', '#330867'], // Cyan to deep purple
  ['#6a11cb', '#2575fc'], // Purple to blue
]

const gradientStyle = computed(() => {
  if (!app) return {}
  const hash = hashString(app.name)
  const pair = gradientPairs[hash % gradientPairs.length]
  const angle = (hash % 360)
  return {
    background: `linear-gradient(${angle}deg, ${pair[0]}, ${pair[1]})`
  }
})

const logoGradientStyle = computed(() => {
  if (!app) return {}
  const hash = hashString(app.name + 'logo')
  const pair = gradientPairs[hash % gradientPairs.length]
  return {
    background: `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`
  }
})

const appInitials = computed(() => {
  if (!app) return ''
  const words = app.name.split(/[\s-]+/)
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  return words.slice(0, 2).map(w => w[0]).join('').toUpperCase()
})

// Breadcrumb items
const breadcrumbItems = app ? [
  { name: 'Home', url: '/' },
  { name: 'Apps', url: '/apps' },
  { name: app.name, url: `/apps/${app.slug}` },
] : []

// SEO Configuration
const {
  setPageMetaWithHreflang,
  setPageMeta,
  generateAppSchema,
  generateProductSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
  setMultipleSchemas,
  siteUrl
} = useSEO()

if (app) {
  // Generate category names for SEO tags
  const categoryNames = app.category.map((catId: string) => getCategoryName(catId))

  // Enhanced page title with long-tail keywords for better rankings
  const pageTitle = `${app.name} for GoHighLevel - ${app.tagline} | Best GHL Integration`
  const pageDescription = `${app.description} Compare ${app.name} with other GoHighLevel apps. Rating: ${app.rating}/5 from ${app.reviewCount} reviews. ${app.pricing.model === 'free' ? 'Free to use.' : `Starting at $${app.pricing.startingPrice}/mo.`} Perfect for agencies and SaaS businesses.`

  // Set page meta tags with Open Graph and hreflang
  setPageMetaWithHreflang({
    title: pageTitle,
    description: pageDescription,
    image: app.image || `${siteUrl}/og-image.png`,
    url: `${siteUrl}/apps/${app.slug}`,
    type: 'product',
    tags: [
      app.name,
      'GoHighLevel',
      'GHL apps',
      'GoHighLevel integration',
      'GHL integration',
      ...categoryNames,
      app.pricing.model,
      'agency tools',
      'SaaS tools'
    ],
  }, true) // Enable hreflang

  // Related apps for structured data
  const relatedAppsItems = relatedApps.map((relApp: any, index: number) => ({
    name: relApp.name,
    url: `/apps/${relApp.slug}`,
    description: relApp.tagline,
    position: index + 1,
  }))

  // App SEO data for schema generation
  const appSeoData = {
    name: app.name,
    description: app.description,
    image: app.image,
    logo: app.logo,
    rating: app.rating,
    reviewCount: app.reviewCount,
    pricing: app.pricing,
    category: app.category,
    slug: app.slug,
    features: app.features,
    website: app.website,
  }

  // Add structured data - include both SoftwareApplication and Product schemas
  const schemas = [
    generateAppSchema(appSeoData),
    generateProductSchema(appSeoData),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Apps', url: '/apps' },
      { name: app.name, url: `/apps/${app.slug}` },
    ]),
  ]

  // Add related apps schema if there are related apps
  if (relatedAppsItems.length > 0) {
    schemas.push(generateItemListSchema(relatedAppsItems, `Related to ${app.name}`))
  }

  setMultipleSchemas(schemas)
} else {
  // 404 page
  setPageMeta({
    title: 'App Not Found | Highlevel Kit',
    description: 'The app you are looking for could not be found.',
    url: `${siteUrl}/apps/${slug}`,
    noindex: true,
  })
}
</script>

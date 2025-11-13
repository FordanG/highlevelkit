<template>
  <div v-if="app">
    <!-- Hero Section -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <div v-if="app.image || isLogoUrl(app.logo)" class="w-32 h-32 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 flex items-center justify-center p-4">
              <img :src="app.image || app.logo" :alt="app.name" class="w-full h-full object-contain" />
            </div>
            <div v-else class="w-32 h-32 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl flex items-center justify-center ring-1 ring-white/10">
              <span class="text-6xl">{{ app.logo }}</span>
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
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-lg font-semibold text-white">{{ app.rating }}</span>
                <span class="text-slate-400">({{ app.reviewCount }} reviews)</span>
              </div>
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

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-3">
              <Button
                v-if="app.website"
                as="a"
                :href="app.website"
                target="_blank"
                rel="noopener noreferrer"
                class="p-button-primary"
              >
                <template #default>
                  <span>Visit Website</span>
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </template>
              </Button>
              <Button
                v-if="app.affiliateLink"
                as="a"
                :href="app.affiliateLink"
                target="_blank"
                rel="noopener noreferrer"
                label="Get Special Offer"
                class="p-button-secondary"
              />
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
        class="p-button-primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import appsData from '~/data/apps.json'
import categoriesData from '~/data/categories.json'

const route = useRoute()
const slug = route.params.slug as string

// Find the app
const app = appsData.find((a: any) => a.slug === slug)

// Get related apps (same category)
const relatedApps = app
  ? appsData
      .filter((a: any) =>
        a.id !== app.id &&
        a.category.some((c: string) => app.category.includes(c))
      )
      .slice(0, 3)
  : []

const isLogoUrl = (logo: string) => {
  return logo && (logo.startsWith('http://') || logo.startsWith('https://'))
}

const getCategoryName = (id: string) => {
  const category = categoriesData.find(c => c.id === id)
  return category ? category.name : id
}

// SEO
useHead({
  title: app ? `${app.name} - ${app.tagline} | Highlevel Kit` : 'App Not Found',
  meta: [
    {
      name: 'description',
      content: app?.description || 'App not found'
    }
  ]
})
</script>

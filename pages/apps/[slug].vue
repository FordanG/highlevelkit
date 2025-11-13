<template>
  <div v-if="app" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <div class="w-32 h-32 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 rounded-2xl flex items-center justify-center text-6xl">
              {{ app.logo }}
            </div>
          </div>

          <!-- Info -->
          <div class="flex-grow">
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-if="app.featured"
                class="px-3 py-1 text-sm font-semibold bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 rounded-full"
              >
                ⭐ Featured
              </span>
              <span
                v-if="app.trending"
                class="px-3 py-1 text-sm font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full"
              >
                🔥 Trending
              </span>
              <span
                v-for="cat in app.category"
                :key="cat"
                class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {{ getCategoryName(cat) }}
              </span>
            </div>

            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {{ app.name }}
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-4">
              {{ app.tagline }}
            </p>

            <!-- Stats -->
            <div class="flex flex-wrap gap-6 mb-6">
              <div class="flex items-center gap-2">
                <span class="text-yellow-500 text-xl">⭐</span>
                <span class="text-lg font-bold text-gray-900 dark:text-white">{{ app.rating }}</span>
                <span class="text-gray-500 dark:text-gray-400">({{ app.reviewCount }} reviews)</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xl">💰</span>
                <span class="text-lg font-bold text-gray-900 dark:text-white">
                  <span v-if="app.pricing.model === 'free'" class="text-green-600 dark:text-green-400">Free</span>
                  <span v-else-if="app.pricing.model === 'freemium'">
                    From ${{ app.pricing.startingPrice }}/mo
                  </span>
                  <span v-else>
                    ${{ app.pricing.startingPrice }}/mo
                  </span>
                </span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xl">🔧</span>
                <span class="text-gray-900 dark:text-white capitalize">{{ app.setupDifficulty }} Setup</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-4">
              <a
                v-if="app.website"
                :href="app.website"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary"
              >
                Visit Website →
              </a>
              <a
                v-if="app.affiliateLink"
                :href="app.affiliateLink"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary"
              >
                Get Special Offer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="lg:grid lg:grid-cols-3 lg:gap-8">
        <!-- Main Column -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Description -->
          <section class="card p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              {{ app.description }}
            </p>
          </section>

          <!-- Features -->
          <section class="card p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li
                v-for="(feature, index) in app.features"
                :key="index"
                class="flex items-start gap-3"
              >
                <span class="text-primary-600 dark:text-primary-400 text-xl">✓</span>
                <span class="text-gray-700 dark:text-gray-300">{{ feature }}</span>
              </li>
            </ul>
          </section>

          <!-- Use Cases -->
          <section class="card p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Perfect For</h2>
            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Use Cases</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="useCase in app.useCase"
                    :key="useCase"
                    class="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-lg text-sm"
                  >
                    {{ useCase }}
                  </span>
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2">User Types</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="userType in app.userType"
                    :key="userType"
                    class="px-3 py-1 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 rounded-lg text-sm"
                  >
                    {{ userType }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- Reviews Section -->
          <section class="card p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Reviews</h2>
            <div class="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Reviews coming soon...</p>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 mt-8 lg:mt-0">
          <div class="space-y-6 sticky top-20">
            <!-- Pricing Card -->
            <div class="card p-6">
              <h3 class="font-bold text-gray-900 dark:text-white mb-4">Pricing</h3>
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                <span v-if="app.pricing.model === 'free'">Free</span>
                <span v-else-if="app.pricing.model === 'freemium'">
                  ${{ app.pricing.startingPrice }}
                </span>
                <span v-else>
                  ${{ app.pricing.startingPrice }}
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {{ app.pricing.model === 'free' ? 'Forever free' : 'per month' }}
              </p>
              <a
                v-if="app.affiliateLink"
                :href="app.affiliateLink"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary w-full text-center block"
              >
                Get Started →
              </a>
            </div>

            <!-- Details Card -->
            <div class="card p-6">
              <h3 class="font-bold text-gray-900 dark:text-white mb-4">Details</h3>
              <dl class="space-y-3">
                <div>
                  <dt class="text-sm text-gray-500 dark:text-gray-400">Integration</dt>
                  <dd class="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {{ app.integrationLevel }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm text-gray-500 dark:text-gray-400">Setup Difficulty</dt>
                  <dd class="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {{ app.setupDifficulty }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm text-gray-500 dark:text-gray-400">Categories</dt>
                  <dd class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ app.category.map(c => getCategoryName(c)).join(', ') }}
                  </dd>
                </div>
              </dl>
            </div>

            <!-- Share Card -->
            <div class="card p-6">
              <h3 class="font-bold text-gray-900 dark:text-white mb-4">Share</h3>
              <div class="flex gap-2">
                <button class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Twitter
                </button>
                <button class="flex-1 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors">
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Apps -->
    <section class="bg-white dark:bg-gray-800 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Apps</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">App Not Found</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">The app you're looking for doesn't exist.</p>
      <NuxtLink to="/apps" class="btn-primary">
        Browse All Apps
      </NuxtLink>
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

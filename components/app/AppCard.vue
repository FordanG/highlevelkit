<template>
  <NuxtLink
    :to="`/apps/${app.slug}`"
    class="card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group"
  >
    <!-- Logo and Badge -->
    <div class="flex items-start justify-between mb-4">
      <div class="text-5xl">{{ app.logo }}</div>
      <div class="flex gap-2">
        <span
          v-if="app.featured"
          class="px-2 py-1 text-xs font-semibold bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 rounded"
        >
          Featured
        </span>
        <span
          v-if="app.trending"
          class="px-2 py-1 text-xs font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded"
        >
          🔥 Trending
        </span>
      </div>
    </div>

    <!-- App Info -->
    <div>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {{ app.name }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {{ app.tagline }}
      </p>

      <!-- Categories -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="cat in app.category.slice(0, 2)"
          :key="cat"
          class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
        >
          {{ getCategoryName(cat) }}
        </span>
      </div>

      <!-- Rating and Pricing -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          <span class="text-yellow-500">⭐</span>
          <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ app.rating }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">({{ app.reviewCount }})</span>
        </div>
        <div class="text-sm font-semibold text-gray-900 dark:text-white">
          <span v-if="app.pricing.model === 'free'" class="text-green-600 dark:text-green-400">Free</span>
          <span v-else-if="app.pricing.model === 'freemium'" class="text-primary-600 dark:text-primary-400">
            From ${{ app.pricing.startingPrice }}/mo
          </span>
          <span v-else>
            ${{ app.pricing.startingPrice }}/mo
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import categoriesData from '~/data/categories.json'

interface App {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  logo: string
  category: string[]
  pricing: {
    model: string
    startingPrice?: number
    currency: string
  }
  rating: number
  reviewCount: number
  featured: boolean
  trending: boolean
  useCase: string[]
  userType: string[]
  integrationLevel: string
  setupDifficulty: string
  features: string[]
  website?: string
  affiliateLink?: string
}

const props = defineProps<{
  app: App
}>()

const getCategoryName = (id: string) => {
  const category = categoriesData.find(c => c.id === id)
  return category ? category.name : id
}
</script>

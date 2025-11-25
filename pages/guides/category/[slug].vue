<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs :items="breadcrumbs" class="mb-6" />

        <div class="flex items-center gap-3 mb-4">
          <span class="text-5xl">{{ categoryData?.icon }}</span>
          <h1 class="text-4xl font-bold text-white">
            Best {{ categoryData?.name }} for GoHighLevel in 2025
          </h1>
        </div>

        <p class="text-xl text-slate-300">
          {{ categoryData?.description }} Discover the top {{ categoryTools.length }} tools to enhance your GoHighLevel experience.
        </p>

        <!-- Meta info -->
        <div class="flex items-center gap-4 mt-6 text-sm text-slate-400">
          <span>📅 Updated: {{ currentDate }}</span>
          <span>•</span>
          <span>{{ categoryTools.length }} tools reviewed</span>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Introduction -->
      <div class="prose prose-invert max-w-none mb-12">
        <div class="card p-8 bg-gradient-to-br from-primary-500/10 to-purple-500/10 border border-primary-500/20">
          <h2 class="text-2xl font-bold text-white mb-4">Why You Need {{ categoryData?.name }}</h2>
          <p class="text-slate-300 leading-relaxed">
            {{ getCategoryIntro() }}
          </p>
        </div>
      </div>

      <!-- Quick Comparison Table -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-white mb-6">Quick Comparison</h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-white/10">
            <thead>
              <tr class="bg-slate-800/50">
                <th class="text-left p-4 border-r border-white/10 text-slate-200">Tool</th>
                <th class="text-left p-4 border-r border-white/10 text-slate-200">Best For</th>
                <th class="text-left p-4 border-r border-white/10 text-slate-200">Pricing</th>
                <th class="text-left p-4 text-slate-200">Integration</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(app, index) in topTools"
                :key="app.id"
                class="border-b border-white/5 hover:bg-white/5"
              >
                <td class="p-4 border-r border-white/10">
                  <div class="flex items-center gap-3">
                    <div v-if="isLogoUrl(app.logo)" class="w-10 h-10 rounded-lg overflow-hidden ring-1 ring-white/10 bg-white/5 flex items-center justify-center p-1.5 flex-shrink-0">
                      <img :src="app.logo" :alt="app.name" class="w-full h-full object-contain" />
                    </div>
                    <div v-else class="w-10 h-10 rounded-lg flex items-center justify-center ring-1 ring-white/10 flex-shrink-0" :style="getLogoGradient(app.name)">
                      <span class="text-sm font-bold text-white drop-shadow">{{ getAppInitials(app.name) }}</span>
                    </div>
                    <div>
                      <div class="font-bold text-white">{{ app.name }}</div>
                      <div class="text-sm text-slate-400">{{ app.rating }} ⭐ ({{ app.reviewCount }})</div>
                    </div>
                  </div>
                </td>
                <td class="p-4 border-r border-white/10 text-slate-300 text-sm">
                  {{ app.useCase[0] }}
                </td>
                <td class="p-4 border-r border-white/10 text-slate-300">
                  <span v-if="app.pricing.model === 'free'" class="text-green-400 font-bold">Free</span>
                  <span v-else-if="app.pricing.startingPrice" class="font-bold text-white">
                    ${{ app.pricing.startingPrice }}/mo
                  </span>
                  <span v-else class="capitalize text-slate-400">{{ app.pricing.model }}</span>
                </td>
                <td class="p-4">
                  <span class="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm capitalize">
                    {{ app.integrationLevel }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Detailed Reviews -->
      <div class="space-y-8 mb-12">
        <h2 class="text-2xl font-bold text-white mb-6">Detailed Reviews</h2>

        <div
          v-for="(app, index) in categoryTools"
          :key="app.id"
          class="card p-8"
        >
          <!-- Tool Header -->
          <div class="flex items-start justify-between mb-6">
            <div class="flex items-center gap-4">
              <div v-if="isLogoUrl(app.logo)" class="w-16 h-16 rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5 flex items-center justify-center p-2 flex-shrink-0">
                <img :src="app.logo" :alt="app.name" class="w-full h-full object-contain" />
              </div>
              <div v-else class="w-16 h-16 rounded-xl flex items-center justify-center ring-1 ring-white/10 flex-shrink-0" :style="getLogoGradient(app.name)">
                <span class="text-xl font-bold text-white drop-shadow">{{ getAppInitials(app.name) }}</span>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-2xl font-bold text-white">{{ index + 1 }}. {{ app.name }}</h3>
                  <span
                    v-if="app.featured"
                    class="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-bold"
                  >
                    FEATURED
                  </span>
                </div>
                <p class="text-slate-300 text-lg">{{ app.tagline }}</p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-yellow-400 font-bold text-lg">{{ app.rating }} ⭐</div>
              <div class="text-slate-400 text-sm">{{ app.reviewCount }} reviews</div>
            </div>
          </div>

          <!-- Description -->
          <p class="text-slate-300 mb-6 leading-relaxed">{{ app.description }}</p>

          <!-- Key Features -->
          <div class="mb-6">
            <h4 class="font-bold text-white mb-3">Key Features:</h4>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li
                v-for="feature in app.features"
                :key="feature"
                class="flex items-start gap-2 text-slate-300 text-sm"
              >
                <span class="text-green-400 mt-0.5">✓</span>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <!-- GHL Compatibility (if available) -->
          <div v-if="app.ghlCompatibility" class="mb-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
            <div class="flex items-start gap-3">
              <span class="text-2xl">🔗</span>
              <div>
                <div class="font-bold text-white mb-1">
                  GoHighLevel Compatibility: {{ '⭐'.repeat(app.ghlCompatibility.rating) }}
                </div>
                <p class="text-slate-300 text-sm">{{ app.ghlCompatibility.description }}</p>
                <p v-if="app.ghlCompatibility.integrationMethod" class="text-slate-400 text-xs mt-2">
                  Integration: {{ app.ghlCompatibility.integrationMethod }}
                </p>
              </div>
            </div>
          </div>

          <!-- Pricing & CTA -->
          <div class="flex items-center justify-between pt-6 border-t border-white/10">
            <div>
              <div class="text-sm text-slate-400 mb-1">Pricing</div>
              <div class="text-xl font-bold text-white">
                <span v-if="app.pricing.model === 'free'" class="text-green-400">Free</span>
                <span v-else-if="app.pricing.startingPrice">
                  ${{ app.pricing.startingPrice }}/mo
                </span>
                <span v-else class="capitalize">{{ app.pricing.model }}</span>
              </div>
            </div>
            <div class="flex gap-3">
              <NuxtLink
                :to="`/apps/${app.slug}`"
                class="btn-secondary"
              >
                View Details
              </NuxtLink>
              <a
                v-if="app.website"
                :href="app.affiliateLink || app.website"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary"
              >
                Visit Website →
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="card p-8 bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30 text-center">
        <h3 class="text-2xl font-bold text-white mb-4">Ready to Enhance Your GoHighLevel Setup?</h3>
        <p class="text-slate-300 mb-6 max-w-2xl mx-auto">
          Browse our complete directory of {{ categoryTools.length }}+ {{ categoryData?.name }} and find the perfect tools for your business.
        </p>
        <div class="flex gap-4 justify-center">
          <NuxtLink to="/apps" class="btn-primary">
            Browse All Tools
          </NuxtLink>
          <NuxtLink to="/compare" class="btn-secondary">
            Compare Tools
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import appsData from '~/data/apps.json'
import { categories } from '~/data/apps'

const route = useRoute()
const categorySlug = computed(() => route.params.slug as string)

const categoryData = computed(() => {
  return categories.find(cat => cat.id === categorySlug.value)
})

const categoryTools = computed(() => {
  return appsData
    .filter(app => app.category.includes(categorySlug.value))
    .sort((a, b) => {
      // Sort by featured, then rating
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return b.rating - a.rating
    })
})

const topTools = computed(() => categoryTools.value.slice(0, 10))

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
})

const breadcrumbs = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'Guides', to: '/guides' },
  { label: categoryData.value?.name || 'Category', to: '#' },
])

const getCategoryIntro = () => {
  // This would ideally be customized per category
  return `${categoryData.value?.description || ''} In this comprehensive guide, we'll review the best ${categoryData.value?.name} that integrate with GoHighLevel, helping you choose the right solution for your agency or business. We've analyzed pricing, features, integration methods, and real user reviews to bring you this curated list.`
}

const isLogoUrl = (logo: string) => {
  return logo && (logo.startsWith('http://') || logo.startsWith('https://') || logo.startsWith('/'))
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

const gradientPairs = [
  ['#667eea', '#764ba2'],
  ['#f093fb', '#f5576c'],
  ['#4facfe', '#00f2fe'],
  ['#43e97b', '#38f9d7'],
  ['#fa709a', '#fee140'],
  ['#a8edea', '#fed6e3'],
  ['#ff9a9e', '#fecfef'],
  ['#ffecd2', '#fcb69f'],
]

const getLogoGradient = (name: string) => {
  const hash = hashString(name + 'logo')
  const pair = gradientPairs[hash % gradientPairs.length]
  return {
    background: `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`
  }
}

const getAppInitials = (name: string) => {
  const words = name.split(/[\s-]+/)
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  return words.slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

useSEO({
  title: `Best ${categoryData.value?.name} for GoHighLevel in 2025 | HighLevelKit`,
  description: `Discover the top ${categoryData.value?.name} that integrate with GoHighLevel. Compare features, pricing, and reviews to find the perfect tools for your business.`,
})
</script>

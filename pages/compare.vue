<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          Compare Tools
        </h1>
        <p class="text-xl text-slate-300 max-w-3xl">
          Compare GoHighLevel tools side-by-side to find the best solution for your needs. Analyze features, pricing, integrations, and more.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Tool Selection -->
      <div class="card p-6 mb-8">
        <h2 class="text-xl font-bold text-white mb-4">Select Tools to Compare</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div v-for="(tool, index) in selectedTools" :key="index">
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Tool {{ index + 1 }}
            </label>
            <Select
              v-model="selectedTools[index]"
              :options="availableApps"
              optionLabel="name"
              optionValue="id"
              :placeholder="`Select tool ${index + 1}...`"
              filter
            />
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="addComparisonSlot"
            v-if="selectedTools.length < 4"
            class="btn-secondary"
          >
            + Add Another Tool
          </button>
          <button
            @click="removeComparisonSlot"
            v-if="selectedTools.length > 2"
            class="btn-secondary"
          >
            - Remove Tool
          </button>
          <button
            @click="clearComparison"
            class="btn-secondary ml-auto"
          >
            Clear All
          </button>
        </div>
      </div>

      <!-- Comparison Table -->
      <div v-if="comparisonApps.length >= 2" class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b border-white/10">
              <th class="text-left p-4 bg-slate-800/50 sticky left-0 z-10 min-w-[200px]">
                <span class="text-slate-400 text-sm font-medium">Comparison</span>
              </th>
              <th v-for="app in comparisonApps" :key="app.id" class="p-4 bg-slate-800/50">
                <div class="text-center">
                  <div class="flex justify-center mb-2">
                    <div v-if="isLogoUrl(app.logo)" class="w-16 h-16 rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5 flex items-center justify-center p-2">
                      <img :src="app.logo" :alt="app.name" class="w-full h-full object-contain" />
                    </div>
                    <div v-else class="w-16 h-16 rounded-xl flex items-center justify-center ring-1 ring-white/10" :style="getLogoGradient(app.name)">
                      <span class="text-xl font-bold text-white drop-shadow">{{ getAppInitials(app.name) }}</span>
                    </div>
                  </div>
                  <div class="text-lg font-bold text-white">{{ app.name }}</div>
                  <div class="text-sm text-slate-400">{{ app.tagline }}</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Rating -->
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="p-4 font-medium text-slate-200 sticky left-0 bg-slate-900 z-10">Rating</td>
              <td v-for="app in comparisonApps" :key="app.id" class="p-4 text-center">
                <div class="text-yellow-400 font-bold">{{ app.rating }}</div>
                <div class="text-xs text-slate-400">{{ app.reviewCount }} reviews</div>
              </td>
            </tr>

            <!-- Pricing -->
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="p-4 font-medium text-slate-200 sticky left-0 bg-slate-900 z-10">Pricing</td>
              <td v-for="app in comparisonApps" :key="app.id" class="p-4 text-center">
                <div class="text-white font-bold">
                  <span v-if="app.pricing.model === 'free'" class="text-green-400">Free</span>
                  <span v-else-if="app.pricing.startingPrice">
                    ${{ app.pricing.startingPrice }}/mo
                  </span>
                  <span v-else class="capitalize">{{ app.pricing.model }}</span>
                </div>
                <div class="text-xs text-slate-400 capitalize">{{ app.pricing.model }}</div>
              </td>
            </tr>

            <!-- Categories -->
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="p-4 font-medium text-slate-200 sticky left-0 bg-slate-900 z-10">Categories</td>
              <td v-for="app in comparisonApps" :key="app.id" class="p-4">
                <div class="flex flex-wrap gap-1 justify-center">
                  <span
                    v-for="cat in app.category.slice(0, 3)"
                    :key="cat"
                    class="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs"
                  >
                    {{ getCategoryName(cat) }}
                  </span>
                  <span
                    v-if="app.category.length > 3"
                    class="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs"
                  >
                    +{{ app.category.length - 3 }}
                  </span>
                </div>
              </td>
            </tr>

            <!-- Integration Level -->
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="p-4 font-medium text-slate-200 sticky left-0 bg-slate-900 z-10">Integration</td>
              <td v-for="app in comparisonApps" :key="app.id" class="p-4 text-center">
                <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm capitalize">
                  {{ app.integrationLevel }}
                </span>
              </td>
            </tr>

            <!-- Setup Difficulty -->
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="p-4 font-medium text-slate-200 sticky left-0 bg-slate-900 z-10">Setup Difficulty</td>
              <td v-for="app in comparisonApps" :key="app.id" class="p-4 text-center">
                <span
                  class="px-3 py-1 rounded-full text-sm capitalize"
                  :class="{
                    'bg-green-500/20 text-green-300': app.setupDifficulty === 'easy',
                    'bg-yellow-500/20 text-yellow-300': app.setupDifficulty === 'medium',
                    'bg-red-500/20 text-red-300': app.setupDifficulty === 'advanced'
                  }"
                >
                  {{ app.setupDifficulty }}
                </span>
              </td>
            </tr>

            <!-- GHL Compatibility (if available) -->
            <tr v-if="comparisonApps.some(app => app.ghlCompatibility)" class="border-b border-white/5 hover:bg-white/5">
              <td class="p-4 font-medium text-slate-200 sticky left-0 bg-slate-900 z-10">GHL Compatibility</td>
              <td v-for="app in comparisonApps" :key="app.id" class="p-4 text-center">
                <div v-if="app.ghlCompatibility">
                  <div class="text-yellow-400 mb-1">
                    {{ '⭐'.repeat(app.ghlCompatibility.rating) }}
                  </div>
                  <div class="text-xs text-slate-400">{{ app.ghlCompatibility.description }}</div>
                </div>
                <div v-else class="text-slate-500 text-sm">Not rated</div>
              </td>
            </tr>

            <!-- Features -->
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="p-4 font-medium text-slate-200 sticky left-0 bg-slate-900 z-10">Key Features</td>
              <td v-for="app in comparisonApps" :key="app.id" class="p-4">
                <ul class="text-sm text-slate-300 space-y-1 text-left">
                  <li v-for="feature in app.features.slice(0, 5)" :key="feature" class="flex items-start gap-2">
                    <span class="text-green-400 mt-0.5">✓</span>
                    <span>{{ feature }}</span>
                  </li>
                  <li v-if="app.features.length > 5" class="text-slate-500 text-xs">
                    +{{ app.features.length - 5 }} more features
                  </li>
                </ul>
              </td>
            </tr>

            <!-- Use Cases -->
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="p-4 font-medium text-slate-200 sticky left-0 bg-slate-900 z-10">Best For</td>
              <td v-for="app in comparisonApps" :key="app.id" class="p-4">
                <div class="text-sm text-slate-300 text-left space-y-1">
                  <div v-for="useCase in app.useCase.slice(0, 3)" :key="useCase">
                    • {{ useCase }}
                  </div>
                </div>
              </td>
            </tr>

            <!-- Action Row -->
            <tr class="bg-slate-800/30">
              <td class="p-4 sticky left-0 bg-slate-800/30 z-10"></td>
              <td v-for="app in comparisonApps" :key="app.id" class="p-4 text-center">
                <div class="space-y-2">
                  <NuxtLink
                    :to="`/apps/${app.slug}`"
                    class="block btn-primary text-sm"
                  >
                    View Details
                  </NuxtLink>
                  <a
                    v-if="app.website"
                    :href="app.affiliateLink || app.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block btn-secondary text-sm"
                  >
                    Visit Website →
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-bold text-white mb-2">Select Tools to Compare</h3>
        <p class="text-slate-400">Choose at least 2 tools from the dropdowns above to see a detailed comparison</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import appsData from '~/data/apps.json'
import { categories } from '~/data/apps'

// SEO Configuration
const { setPageMeta, generateWebPageSchema, generateBreadcrumbSchema, setMultipleSchemas, siteUrl } = useSEO()

setPageMeta({
  title: 'Compare GoHighLevel Tools Side-by-Side | Highlevel Kit',
  description: 'Compare GoHighLevel tools side-by-side. Analyze features, pricing, integrations, and setup difficulty to find the best solution for your agency or SaaS business.',
  url: `${siteUrl}/compare`,
  tags: ['GoHighLevel comparison', 'GHL tools compare', 'app comparison', 'software comparison'],
})

setMultipleSchemas([
  generateWebPageSchema(
    'Compare GoHighLevel Tools',
    'Compare GoHighLevel tools side-by-side. Analyze features, pricing, integrations, and more.',
    '/compare'
  ),
  generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Compare Tools', url: '/compare' },
  ]),
])

const selectedTools = ref<(string | null)[]>([null, null])

const availableApps = computed(() => {
  return appsData.map(app => ({
    id: app.id,
    name: app.name,
    ...app
  }))
})

const comparisonApps = computed(() => {
  return selectedTools.value
    .filter(id => id !== null)
    .map(id => appsData.find(app => app.id === id))
    .filter(app => app !== undefined)
})

const getCategoryName = (categoryId: string) => {
  const category = categories.find(cat => cat.id === categoryId)
  return category ? category.name : categoryId
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

const addComparisonSlot = () => {
  if (selectedTools.value.length < 4) {
    selectedTools.value.push(null)
  }
}

const removeComparisonSlot = () => {
  if (selectedTools.value.length > 2) {
    selectedTools.value.pop()
  }
}

const clearComparison = () => {
  selectedTools.value = [null, null]
}
</script>

<style scoped>
table {
  @apply border border-white/10;
}

th, td {
  @apply border-r border-white/5;
}

th:last-child, td:last-child {
  @apply border-r-0;
}
</style>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-5xl">🤖</span>
          <h1 class="text-4xl font-bold text-white">
            AI Tools for GoHighLevel
          </h1>
        </div>
        <p class="text-xl text-slate-300 max-w-3xl">
          Discover {{ filteredApps.length }}+ AI-powered tools to automate your workflows, enhance sales processes, and scale your GoHighLevel business with artificial intelligence.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="lg:grid lg:grid-cols-4 lg:gap-8">
        <!-- Filters Sidebar -->
        <aside class="lg:col-span-1 mb-8 lg:mb-0">
          <div class="card p-6 sticky top-20">
            <h3 class="text-lg font-bold text-white mb-4">Filters</h3>

            <!-- Search -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-200 mb-2">
                Search
              </label>
              <InputText
                v-model="searchQuery"
                type="text"
                placeholder="Search AI tools..."
              />
            </div>

            <!-- AI Category Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-200 mb-2">
                AI Category
              </label>
              <Select
                v-model="selectedCategory"
                :options="aiCategoryOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="All AI Categories"
              />
            </div>

            <!-- Pricing Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-200 mb-2">
                Pricing
              </label>
              <div class="space-y-2">
                <label class="flex items-center" v-for="pricing in pricingOptions" :key="pricing">
                  <input
                    type="checkbox"
                    :value="pricing"
                    v-model="selectedPricing"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300 capitalize">{{ pricing }}</span>
                </label>
              </div>
            </div>

            <!-- GHL Compatibility -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-200 mb-2">
                GHL Compatibility
              </label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="5"
                    v-model="selectedCompatibility"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300">⭐⭐⭐⭐⭐ Excellent</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="4"
                    v-model="selectedCompatibility"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300">⭐⭐⭐⭐ Good</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="3"
                    v-model="selectedCompatibility"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300">⭐⭐⭐ Fair</span>
                </label>
              </div>
            </div>

            <!-- Clear Filters -->
            <button
              @click="clearFilters"
              class="w-full btn-secondary text-sm"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        <!-- Apps Grid -->
        <div class="lg:col-span-3">
          <div v-if="filteredApps.length === 0" class="text-center py-12">
            <p class="text-slate-400">No AI tools found matching your filters.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AppCard
              v-for="app in filteredApps"
              :key="app.id"
              :app="app"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import appsData from '~/data/apps.json'

// SEO Configuration
const { setPageMeta, generateCollectionPageSchema, generateBreadcrumbSchema, setMultipleSchemas, siteUrl } = useSEO()

setPageMeta({
  title: 'AI Tools for GoHighLevel - AI Automation & Assistants | Highlevel Kit',
  description: 'Discover the best AI-powered tools to automate workflows, enhance sales, and scale your GoHighLevel business. Find AI assistants, chatbots, AI copywriting, and automation tools.',
  url: `${siteUrl}/ai-tools`,
  tags: ['AI tools', 'GoHighLevel AI', 'AI automation', 'AI assistants', 'chatbots', 'AI copywriting'],
})

setMultipleSchemas([
  generateCollectionPageSchema(
    'AI Tools for GoHighLevel',
    'Discover AI-powered tools to automate workflows and scale your GoHighLevel business.',
    '/ai-tools'
  ),
  generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'AI Tools', url: '/ai-tools' },
  ]),
])

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPricing = ref<string[]>([])
const selectedCompatibility = ref<string[]>([])

const pricingOptions = ['free', 'freemium', 'paid', 'usage-based', 'credit-based']

// Filter AI categories
const aiCategoryOptions = computed(() => {
  const aiCategories = [
    { label: 'All AI Categories', value: '' },
    { label: '🤖 AI Automation', value: 'ai-automation' },
    { label: '🧙 AI Assistants', value: 'ai-assistant' },
    { label: '🎓 AI BDR', value: 'ai-bdr' },
    { label: '✍️ AI Copywriting', value: 'ai-copywriting' },
    { label: '💭 Chatbots', value: 'chatbots' },
  ]
  return aiCategories
})

// Filter apps to only show AI-powered tools
const aiApps = computed(() => {
  return appsData.filter(app => {
    // Check if app has AI-related categories or is marked as aiPowered
    const aiCategories = ['ai-automation', 'ai-assistant', 'ai-bdr', 'ai-copywriting', 'chatbots']
    const hasAiCategory = app.category.some((cat: string) => aiCategories.includes(cat))
    const isAiPowered = (app as any).aiPowered === true

    return hasAiCategory || isAiPowered || app.name.toLowerCase().includes('ai')
  })
})

const filteredApps = computed(() => {
  let filtered = aiApps.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(app =>
      app.name.toLowerCase().includes(query) ||
      app.tagline.toLowerCase().includes(query) ||
      app.description.toLowerCase().includes(query)
    )
  }

  // Category filter
  if (selectedCategory.value) {
    filtered = filtered.filter(app =>
      app.category.includes(selectedCategory.value)
    )
  }

  // Pricing filter
  if (selectedPricing.value.length > 0) {
    filtered = filtered.filter(app =>
      selectedPricing.value.includes(app.pricing.model)
    )
  }

  // Compatibility filter
  if (selectedCompatibility.value.length > 0) {
    filtered = filtered.filter(app => {
      const compatibility = (app as any).ghlCompatibility?.rating
      return compatibility && selectedCompatibility.value.includes(compatibility.toString())
    })
  }

  return filtered
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedPricing.value = []
  selectedCompatibility.value = []
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-5xl">🔗</span>
          <h1 class="text-4xl font-bold text-white">
            Integration Platforms & Tools
          </h1>
        </div>
        <p class="text-xl text-slate-300 max-w-3xl">
          Discover {{ filteredApps.length }}+ integration platforms and tools to connect GoHighLevel with thousands of apps, automate workflows, and build custom integrations.
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
                placeholder="Search integrations..."
              />
            </div>

            <!-- Integration Type Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-200 mb-2">
                Integration Type
              </label>
              <Select
                v-model="selectedCategory"
                :options="integrationTypeOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="All Integration Types"
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

            <!-- Setup Difficulty -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-200 mb-2">
                Setup Difficulty
              </label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="easy"
                    v-model="selectedDifficulty"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300">Easy</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="medium"
                    v-model="selectedDifficulty"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300">Medium</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="advanced"
                    v-model="selectedDifficulty"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300">Advanced</span>
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
          <!-- Info Banner -->
          <div class="card p-6 mb-8 bg-gradient-to-r from-primary-500/10 to-blue-500/10 border border-primary-500/20">
            <h3 class="text-lg font-bold text-white mb-2">🔧 About Integration Platforms</h3>
            <p class="text-slate-300 text-sm">
              These platforms help you connect GoHighLevel with other tools and services. Whether you need no-code automation (Zapier, Make), workflow builders (n8n), or API integration tools, find the right solution for your needs.
            </p>
          </div>

          <div v-if="filteredApps.length === 0" class="text-center py-12">
            <p class="text-slate-400">No integration platforms found matching your filters.</p>
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

const { prioritizeApps } = useAppSort()

// SEO Configuration
const { setPageMeta, generateCollectionPageSchema, generateBreadcrumbSchema, setMultipleSchemas, siteUrl } = useSEO()

setPageMeta({
  title: 'Integration Platforms & Tools for GoHighLevel | Highlevel Kit',
  description: 'Find the best integration platforms to connect GoHighLevel with thousands of apps. Compare Zapier, Make, n8n, Pabbly, and more workflow automation tools.',
  url: `${siteUrl}/integrations`,
  tags: ['GoHighLevel integrations', 'Zapier', 'Make', 'n8n', 'workflow automation', 'API integration'],
})

setMultipleSchemas([
  generateCollectionPageSchema(
    'Integration Platforms & Tools for GoHighLevel',
    'Find the best integration platforms to connect GoHighLevel with thousands of apps.',
    '/integrations'
  ),
  generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Integration Platforms', url: '/integrations' },
  ]),
])

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPricing = ref<string[]>([])
const selectedDifficulty = ref<string[]>([])

const pricingOptions = ['free', 'freemium', 'paid', 'usage-based']

// Integration type options
const integrationTypeOptions = computed(() => {
  return [
    { label: 'All Integration Types', value: '' },
    { label: '🔗 Integration Platforms', value: 'integration' },
    { label: '⚡ Workflow Automation', value: 'automation' },
    { label: '🤖 AI Automation', value: 'ai-automation' },
  ]
})

// Filter apps to only show integration platforms
const integrationApps = computed(() => {
  return appsData.filter(app => {
    // Check if app is an integration platform
    const integrationCategories = [
      'integration',
      'automation',
      'ai-automation'
    ]
    const hasIntegrationCategory = app.category.some((cat: string) => integrationCategories.includes(cat))

    // Also include tools that are specifically known integration platforms
    const integrationKeywords = ['zapier', 'integration', 'automation', 'workflow', 'n8n', 'make', 'pabbly']
    const hasIntegrationKeyword = integrationKeywords.some(keyword =>
      app.name.toLowerCase().includes(keyword) ||
      app.description.toLowerCase().includes(keyword)
    )

    return hasIntegrationCategory || hasIntegrationKeyword
  })
})

const filteredApps = computed(() => {
  let filtered = integrationApps.value

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

  // Difficulty filter
  if (selectedDifficulty.value.length > 0) {
    filtered = filtered.filter(app =>
      selectedDifficulty.value.includes(app.setupDifficulty)
    )
  }

  // Prioritize apps with affiliate links
  return prioritizeApps(filtered)
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedPricing.value = []
  selectedDifficulty.value = []
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-5xl">💎</span>
          <h1 class="text-4xl font-bold text-white">
            B2B Data Sources & Lead Generation
          </h1>
        </div>
        <p class="text-xl text-slate-300 max-w-3xl">
          Discover {{ filteredApps.length }}+ verified B2B data providers, sales intelligence platforms, and lead generation tools to supercharge your GoHighLevel CRM with quality prospects.
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
                placeholder="Search data sources..."
              />
            </div>

            <!-- Data Type Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-200 mb-2">
                Data Type
              </label>
              <Select
                v-model="selectedCategory"
                :options="dataTypeOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="All Data Types"
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

            <!-- Integration Level -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-200 mb-2">
                Integration
              </label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="native"
                    v-model="selectedIntegration"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300">Native</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="api"
                    v-model="selectedIntegration"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300">API</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="zapier"
                    v-model="selectedIntegration"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300">Zapier</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="csv"
                    v-model="selectedIntegration"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300">CSV Import</span>
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
          <div class="card p-6 mb-8 bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20">
            <h3 class="text-lg font-bold text-white mb-2">💡 About Data Sources</h3>
            <p class="text-slate-300 text-sm">
              These tools help you find, enrich, and import quality B2B leads into GoHighLevel. Use them to fill your CRM with verified contacts, company data, and sales intelligence.
            </p>
          </div>

          <div v-if="filteredApps.length === 0" class="text-center py-12">
            <p class="text-slate-400">No data sources found matching your filters.</p>
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

useSEO({
  title: 'B2B Data Sources & Lead Generation Tools | HighLevelKit',
  description: 'Find the best B2B data providers, sales intelligence platforms, and lead generation tools to fill your GoHighLevel CRM with quality prospects.',
})

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPricing = ref<string[]>([])
const selectedIntegration = ref<string[]>([])

const pricingOptions = ['free', 'freemium', 'paid', 'usage-based', 'credit-based']

// Data source categories
const dataTypeOptions = computed(() => {
  return [
    { label: 'All Data Types', value: '' },
    { label: '🎯 Lead Prospecting', value: 'prospecting' },
    { label: '🔍 Lead Generation', value: 'lead-generation' },
    { label: '💎 Data Enrichment', value: 'data-enrichment' },
    { label: '🧠 Sales Intelligence', value: 'sales-intelligence' },
    { label: '👁️ Visitor Identification', value: 'visitor-identification' },
    { label: '📡 Intent Data', value: 'intent-data' },
  ]
})

// Filter apps to only show data sources
const dataSourceApps = computed(() => {
  return appsData.filter(app => {
    // Check if app is a data source
    const dataCategories = [
      'prospecting',
      'lead-generation',
      'data-enrichment',
      'sales-intelligence',
      'visitor-identification',
      'intent-data'
    ]
    const hasDataCategory = app.category.some((cat: string) => dataCategories.includes(cat))
    const isDataSource = (app as any).dataSource === true

    return hasDataCategory || isDataSource
  })
})

const filteredApps = computed(() => {
  let filtered = dataSourceApps.value

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

  // Integration filter
  if (selectedIntegration.value.length > 0) {
    filtered = filtered.filter(app =>
      selectedIntegration.value.includes(app.integrationLevel)
    )
  }

  return filtered
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedPricing.value = []
  selectedIntegration.value = []
}
</script>

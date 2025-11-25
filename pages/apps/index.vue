<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-4xl font-bold text-white mb-4">
          Browse Apps
        </h1>
        <p class="text-slate-300">
          Discover {{ filteredApps.length }} apps to enhance your GoHighLevel experience
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="lg:grid lg:grid-cols-4 lg:gap-8">
        <!-- Filters Sidebar -->
        <aside class="lg:col-span-1 mb-6 lg:mb-0">
          <div class="card p-4 sticky top-20">
            <h3 class="text-base font-semibold text-white mb-3">Filters</h3>

            <!-- Search -->
            <div class="mb-4">
              <label class="block text-xs font-medium text-slate-300 mb-1.5">
                Search
              </label>
              <InputText
                v-model="searchQuery"
                type="text"
                placeholder="Search apps..."
                class="!py-2 !text-sm"
              />
            </div>

            <!-- Category Filter -->
            <div class="mb-4">
              <label class="block text-xs font-medium text-slate-300 mb-1.5">
                Category
              </label>
              <Select
                v-model="selectedCategory"
                :options="categoryOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="All Categories"
                class="!text-sm"
              />
            </div>

            <!-- Pricing Filter -->
            <div class="mb-4">
              <label class="block text-xs font-medium text-slate-300 mb-1.5">
                Pricing
              </label>
              <div class="flex flex-wrap gap-x-4 gap-y-1.5">
                <label class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="free"
                    v-model="selectedPricing"
                    class="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-1.5 text-xs text-slate-300">Free</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="freemium"
                    v-model="selectedPricing"
                    class="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-1.5 text-xs text-slate-300">Freemium</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="paid"
                    v-model="selectedPricing"
                    class="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-1.5 text-xs text-slate-300">Paid</span>
                </label>
              </div>
            </div>

            <!-- Setup Difficulty -->
            <div class="mb-4">
              <label class="block text-xs font-medium text-slate-300 mb-1.5">
                Setup Difficulty
              </label>
              <Select
                v-model="selectedDifficulty"
                :options="difficultyOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="All Levels"
                class="!text-sm"
              />
            </div>

            <!-- Quick Filters -->
            <div class="mb-4">
              <label class="block text-xs font-medium text-slate-300 mb-1.5">
                Quick Filters
              </label>
              <div class="flex flex-wrap gap-1.5">
                <button
                  @click="toggleFeatured"
                  :class="[
                    'px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200',
                    showFeatured
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                      : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                  ]"
                >
                  <i class="pi pi-star-fill mr-1 text-[10px]"></i>Featured
                </button>
                <button
                  @click="toggleTrending"
                  :class="[
                    'px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200',
                    showTrending
                      ? 'bg-primary-500/20 text-primary-300 border border-primary-500/40 hover:bg-primary-500/30'
                      : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                  ]"
                >
                  <i class="pi pi-bolt mr-1 text-[10px]"></i>Trending
                </button>
              </div>
            </div>

            <!-- Clear Filters -->
            <button
              @click="clearFilters"
              class="w-full py-1.5 text-xs font-medium text-primary-400 hover:text-primary-300 hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        <!-- Apps Grid -->
        <div class="lg:col-span-3">
          <!-- Sort -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-slate-400">
              Showing {{ filteredApps.length }} apps
            </p>
            <Select
              v-model="sortBy"
              :options="sortOptions"
              optionLabel="label"
              optionValue="value"
              style="width: auto; min-width: 180px;"
            />
          </div>

          <!-- Apps List -->
          <div v-if="filteredApps.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AppCard
              v-for="app in sortedApps"
              :key="app.id"
              :app="app"
            />
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-16">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-bold text-white mb-2">
              No apps found
            </h3>
            <p class="text-slate-300 mb-6">
              Try adjusting your filters to see more results
            </p>
            <button
              @click="clearFilters"
              class="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 rounded-lg shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import appsData from '~/data/apps.json'
import categoriesData from '~/data/categories.json'

const apps = appsData
const categories = categoriesData

// Options for Select components
const categoryOptions = [
  { label: 'All Categories', value: '' },
  ...categories.map(cat => ({
    label: cat.name,
    value: cat.id
  }))
]

const difficultyOptions = [
  { label: 'All Levels', value: '' },
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Advanced', value: 'advanced' }
]

const sortOptions = [
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
  { label: 'Name (A-Z)', value: 'name' },
  { label: 'Price (Low to High)', value: 'price-low' },
  { label: 'Price (High to Low)', value: 'price-high' }
]

// Filters
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPricing = ref<string[]>([])
const selectedDifficulty = ref('')
const showFeatured = ref(false)
const showTrending = ref(false)
const sortBy = ref('rating')

// Check URL params
const route = useRoute()
if (route.query.category) {
  selectedCategory.value = route.query.category as string
}
if (route.query.featured) {
  showFeatured.value = true
}
if (route.query.trending) {
  showTrending.value = true
}
if (route.query.search) {
  searchQuery.value = route.query.search as string
}

// Computed filtered apps
const filteredApps = computed(() => {
  let filtered = [...apps]

  // Search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (app: any) =>
        app.name.toLowerCase().includes(query) ||
        app.tagline.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query)
    )
  }

  // Category
  if (selectedCategory.value) {
    filtered = filtered.filter((app: any) =>
      app.category.includes(selectedCategory.value)
    )
  }

  // Pricing
  if (selectedPricing.value.length > 0) {
    filtered = filtered.filter((app: any) =>
      selectedPricing.value.includes(app.pricing.model)
    )
  }

  // Difficulty
  if (selectedDifficulty.value) {
    filtered = filtered.filter(
      (app: any) => app.setupDifficulty === selectedDifficulty.value
    )
  }

  // Featured
  if (showFeatured.value) {
    filtered = filtered.filter((app: any) => app.featured)
  }

  // Trending
  if (showTrending.value) {
    filtered = filtered.filter((app: any) => app.trending)
  }

  return filtered
})

// Computed sorted apps
const sortedApps = computed(() => {
  const sorted = [...filteredApps.value]

  switch (sortBy.value) {
    case 'rating':
      return sorted.sort((a: any, b: any) => b.rating - a.rating)
    case 'reviews':
      return sorted.sort((a: any, b: any) => b.reviewCount - a.reviewCount)
    case 'name':
      return sorted.sort((a: any, b: any) => a.name.localeCompare(b.name))
    case 'price-low':
      return sorted.sort((a: any, b: any) => {
        const priceA = a.pricing.startingPrice || 0
        const priceB = b.pricing.startingPrice || 0
        return priceA - priceB
      })
    case 'price-high':
      return sorted.sort((a: any, b: any) => {
        const priceA = a.pricing.startingPrice || 0
        const priceB = b.pricing.startingPrice || 0
        return priceB - priceA
      })
    default:
      return sorted
  }
})

const toggleFeatured = () => {
  showFeatured.value = !showFeatured.value
}

const toggleTrending = () => {
  showTrending.value = !showTrending.value
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedPricing.value = []
  selectedDifficulty.value = ''
  showFeatured.value = false
  showTrending.value = false
}

// SEO Configuration
const { setPageMeta, generateCollectionPageSchema, generateBreadcrumbSchema, generateItemListSchema, setMultipleSchemas, siteUrl } = useSEO()

setPageMeta({
  title: 'Browse GoHighLevel Apps & Integrations | Highlevel Kit',
  description: 'Discover 100+ curated GoHighLevel apps, integrations, and tools. Filter by category, pricing, and setup difficulty. Find the perfect solution for your agency or SaaS business.',
  image: `${siteUrl}/og-apps.png`,
  url: `${siteUrl}/apps`,
  type: 'website',
  tags: ['GoHighLevel apps', 'GHL integrations', 'agency software', 'CRM tools', 'automation apps'],
})

// Generate top apps list for structured data
const topAppsItems = apps
  .sort((a: any, b: any) => b.rating - a.rating)
  .slice(0, 10)
  .map((app: any, index: number) => ({
    name: app.name,
    url: `/apps/${app.slug}`,
    description: app.tagline,
    position: index + 1,
  }))

setMultipleSchemas([
  generateCollectionPageSchema(
    'GoHighLevel Apps & Integrations',
    'Browse 100+ curated GoHighLevel apps, integrations, and tools for agencies and SaaS businesses.',
    '/apps',
    topAppsItems
  ),
  generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Apps', url: '/apps' },
  ]),
  generateItemListSchema(topAppsItems, 'Top Rated GoHighLevel Apps'),
])
</script>

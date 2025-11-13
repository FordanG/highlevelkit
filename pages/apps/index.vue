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
        <aside class="lg:col-span-1 mb-8 lg:mb-0">
          <div class="card p-6 sticky top-20">
            <h3 class="text-lg font-bold text-white mb-4">Filters</h3>

            <!-- Search -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-200 mb-2">
                Search
              </label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search apps..."
                class="input-field"
              />
            </div>

            <!-- Category Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-200 mb-2">
                Category
              </label>
              <select v-model="selectedCategory" class="input-field">
                <option value="">All Categories</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.icon }} {{ cat.name }}
                </option>
              </select>
            </div>

            <!-- Pricing Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-200 mb-2">
                Pricing
              </label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="free"
                    v-model="selectedPricing"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300">Free</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="freemium"
                    v-model="selectedPricing"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300">Freemium</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="paid"
                    v-model="selectedPricing"
                    class="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-slate-300">Paid</span>
                </label>
              </div>
            </div>

            <!-- Setup Difficulty -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-200 mb-2">
                Setup Difficulty
              </label>
              <select v-model="selectedDifficulty" class="input-field">
                <option value="">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <!-- Tags -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-medium text-slate-200">
                  Quick Filters
                </label>
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  @click="toggleFeatured"
                  :class="[
                    'px-3 py-1 text-sm rounded-full transition-colors',
                    showFeatured
                      ? 'bg-accent-600 text-white'
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                  ]"
                >
                  ⭐ Featured
                </button>
                <button
                  @click="toggleTrending"
                  :class="[
                    'px-3 py-1 text-sm rounded-full transition-colors',
                    showTrending
                      ? 'bg-primary-600 text-white'
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                  ]"
                >
                  🔥 Trending
                </button>
              </div>
            </div>

            <!-- Clear Filters -->
            <button
              @click="clearFilters"
              class="w-full text-sm text-primary-400 hover:text-primary-300 hover:underline"
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
            <select v-model="sortBy" class="input-field w-auto">
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
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
            <button @click="clearFilters" class="btn-primary">
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

useHead({
  title: 'Browse Apps - Highlevel Kit',
  meta: [
    {
      name: 'description',
      content: 'Browse and discover GoHighLevel apps, integrations, and tools. Filter by category, pricing, and difficulty level.'
    }
  ]
})
</script>

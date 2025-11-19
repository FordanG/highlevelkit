<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          Blog
        </h1>
        <p class="text-slate-300 text-lg">
          Expert insights, tool comparisons, and strategies for GoHighLevel agencies
        </p>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <!-- Category Filter -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-slate-300 mb-2">Category</label>
          <Dropdown
            v-model="selectedCategory"
            :options="categoryOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="All Categories"
            class="w-full"
          />
        </div>

        <!-- Search -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-slate-300 mb-2">Search</label>
          <IconField iconPosition="left" class="w-full">
            <InputIcon class="pi pi-search" />
            <InputText
              v-model="searchQuery"
              placeholder="Search articles..."
              class="w-full"
            />
          </IconField>
        </div>

        <!-- Sort -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-slate-300 mb-2">Sort By</label>
          <Dropdown
            v-model="sortBy"
            :options="sortOptions"
            optionLabel="label"
            optionValue="value"
            class="w-full"
          />
        </div>
      </div>

      <!-- Results Count -->
      <div class="text-slate-400 text-sm mb-6">
        Showing {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'article' : 'articles' }}
      </div>

      <!-- Featured Posts (if no filters applied) -->
      <div v-if="!selectedCategory && !searchQuery && featuredPosts.length > 0" class="mb-12">
        <h2 class="text-2xl font-bold text-white mb-6">Featured Articles</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <NuxtLink
            v-for="post in featuredPosts"
            :key="post.id"
            :to="`/blog/${post.slug}`"
            class="group"
          >
            <Card class="h-full hover:shadow-xl transition-shadow">
              <template #header>
                <div class="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-6xl">
                  📰
                </div>
              </template>
              <template #title>
                <div class="flex items-start justify-between gap-2">
                  <span class="group-hover:text-purple-400 transition-colors">{{ post.title }}</span>
                  <Badge value="Featured" severity="warning" />
                </div>
              </template>
              <template #subtitle>
                <div class="flex items-center gap-4 text-sm text-slate-400 mt-2">
                  <span>{{ formatDate(post.publishedAt) }}</span>
                  <span>•</span>
                  <span>{{ post.readTime }} min read</span>
                  <span>•</span>
                  <Tag :value="getBlogCategoryName(post.category)" severity="secondary" />
                </div>
              </template>
              <template #content>
                <p class="text-slate-300">{{ post.excerpt }}</p>
                <div class="flex flex-wrap gap-2 mt-4">
                  <Tag v-for="tag in post.tags.slice(0, 3)" :key="tag" :value="tag" severity="info" />
                </div>
              </template>
            </Card>
          </NuxtLink>
        </div>
      </div>

      <!-- All Posts -->
      <div>
        <h2 v-if="!selectedCategory && !searchQuery" class="text-2xl font-bold text-white mb-6">
          Latest Articles
        </h2>
        <h2 v-else class="text-2xl font-bold text-white mb-6">
          {{ selectedCategory ? getBlogCategoryName(selectedCategory as any) : 'Search Results' }}
        </h2>

        <!-- Blog Posts Grid -->
        <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="post in paginatedPosts"
            :key="post.id"
            :to="`/blog/${post.slug}`"
            class="group"
          >
            <Card class="h-full hover:shadow-xl transition-shadow">
              <template #header>
                <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-5xl">
                  {{ getCategoryIcon(post.category) }}
                </div>
              </template>
              <template #title>
                <span class="group-hover:text-purple-400 transition-colors line-clamp-2">
                  {{ post.title }}
                </span>
              </template>
              <template #subtitle>
                <div class="flex items-center gap-2 text-sm text-slate-400 mt-2">
                  <span>{{ formatDate(post.publishedAt) }}</span>
                  <span>•</span>
                  <span>{{ post.readTime }} min read</span>
                </div>
                <Tag :value="getBlogCategoryName(post.category)" severity="secondary" class="mt-2" />
              </template>
              <template #content>
                <p class="text-slate-300 line-clamp-3">{{ post.excerpt }}</p>
              </template>
            </Card>
          </NuxtLink>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-white mb-2">No articles found</h3>
          <p class="text-slate-400 mb-6">Try adjusting your filters or search terms</p>
          <Button
            label="Clear Filters"
            @click="clearFilters"
            severity="secondary"
          />
        </div>

        <!-- Pagination -->
        <div v-if="filteredPosts.length > postsPerPage" class="mt-8 flex justify-center">
          <Paginator
            v-model:first="first"
            :rows="postsPerPage"
            :totalRecords="filteredPosts.length"
          />
        </div>
      </div>
    </div>

    <!-- Newsletter CTA -->
    <div class="bg-gradient-to-r from-purple-600 to-pink-600 mt-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Get the latest articles in your inbox
        </h2>
        <p class="text-purple-100 mb-6">
          Subscribe to our newsletter for weekly insights, tool reviews, and agency growth tips.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <InputText
            v-model="email"
            placeholder="Enter your email"
            class="flex-1"
          />
          <Button
            label="Subscribe"
            severity="secondary"
            @click="subscribe"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost, BlogCategory } from '~/data/blog'
import { blogCategories, getBlogCategoryName } from '~/data/blog'
import blogPostsData from '~/data/blog-posts.json'

// Type assertion for imported JSON
const blogPosts = blogPostsData as BlogPost[]

// SEO
useHead({
  title: 'Blog - Expert Insights & Guides for GoHighLevel | HighLevelKit',
  meta: [
    {
      name: 'description',
      content: 'Expert articles, tool comparisons, and strategies for GoHighLevel agencies. Learn how to scale your agency with the right tools and automation.'
    },
    {
      name: 'keywords',
      content: 'gohighlevel blog, ghl tips, agency growth, automation guides, tool comparisons, ghl tutorials'
    }
  ]
})

// State
const selectedCategory = ref<BlogCategory | ''>('')
const searchQuery = ref('')
const sortBy = ref('date-desc')
const first = ref(0)
const postsPerPage = 9
const email = ref('')

// Category options
const categoryOptions = computed(() => [
  { name: 'All Categories', value: '' },
  ...blogCategories.map(cat => ({
    name: cat.name,
    value: cat.id
  }))
])

// Sort options
const sortOptions = [
  { label: 'Newest First', value: 'date-desc' },
  { label: 'Oldest First', value: 'date-asc' },
  { label: 'Most Reading Time', value: 'readtime-desc' },
  { label: 'Least Reading Time', value: 'readtime-asc' }
]

// Featured posts
const featuredPosts = computed(() => {
  return blogPosts.filter(post => post.featured)
})

// Filtered posts
const filteredPosts = computed(() => {
  let posts = blogPosts.filter(post => !post.featured || selectedCategory.value || searchQuery.value)

  // Filter by category
  if (selectedCategory.value) {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query)) ||
      post.seoKeywords.some(keyword => keyword.toLowerCase().includes(query))
    )
  }

  // Sort
  if (sortBy.value === 'date-desc') {
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  } else if (sortBy.value === 'date-asc') {
    posts.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
  } else if (sortBy.value === 'readtime-desc') {
    posts.sort((a, b) => b.readTime - a.readTime)
  } else if (sortBy.value === 'readtime-asc') {
    posts.sort((a, b) => a.readTime - b.readTime)
  }

  return posts
})

// Paginated posts
const paginatedPosts = computed(() => {
  const start = first.value
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

// Methods
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getCategoryIcon = (category: BlogCategory) => {
  const icons: Record<BlogCategory, string> = {
    'best-tools': '⭐',
    'comparisons': '⚖️',
    'guides': '📚',
    'case-studies': '📊',
    'integration-tutorials': '🔧',
    'industry-news': '📰',
    'ghl-tips': '💡',
    'automation': '🤖',
    'agency-growth': '📈'
  }
  return icons[category] || '📝'
}

const clearFilters = () => {
  selectedCategory.value = ''
  searchQuery.value = ''
  sortBy.value = 'date-desc'
}

const subscribe = () => {
  if (email.value) {
    // TODO: Implement newsletter subscription
    alert('Newsletter subscription coming soon!')
    email.value = ''
  }
}

// Reset pagination when filters change
watch([selectedCategory, searchQuery, sortBy], () => {
  first.value = 0
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

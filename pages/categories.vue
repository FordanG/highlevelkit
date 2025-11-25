<template>
  <div class="min-h-screen">
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          Categories
        </h1>
        <p class="text-slate-300">
          Browse apps by category
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="category in categoriesWithCounts"
          :key="category.id"
          :to="`/apps?category=${category.id}`"
          class="card p-6 hover:scale-[1.02] transition-all cursor-pointer group"
        >
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/30 transition-colors">
              <i :class="['pi', category.icon, 'text-xl text-primary-400']"></i>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                {{ category.name }}
              </h3>
              <p class="text-sm text-slate-400 mb-2 line-clamp-2">
                {{ category.description }}
              </p>
              <span class="text-xs text-primary-400 font-medium">
                {{ category.count }} {{ category.count === 1 ? 'app' : 'apps' }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import appsData from '~/data/apps.json'
import categoriesData from '~/data/categories.json'

const categoriesWithCounts = categoriesData.map(category => ({
  ...category,
  count: appsData.filter((app: any) =>
    app.category.includes(category.id)
  ).length
})).filter(category => category.count > 0)

// SEO Configuration
const { setPageMeta, generateCollectionPageSchema, generateBreadcrumbSchema, generateItemListSchema, setMultipleSchemas, siteUrl } = useSEO()

setPageMeta({
  title: 'Browse GoHighLevel Apps by Category | Highlevel Kit',
  description: 'Explore GoHighLevel apps organized by category. Find CRM tools, automation software, AI integrations, payment processors, analytics, and more for your agency.',
  image: `${siteUrl}/og-categories.png`,
  url: `${siteUrl}/categories`,
  type: 'website',
  tags: ['GoHighLevel categories', 'app categories', 'CRM tools', 'automation', 'AI tools', 'analytics'],
})

// Generate category list for structured data
const categoryItems = categoriesWithCounts.map((cat, index) => ({
  name: cat.name,
  url: `/apps?category=${cat.id}`,
  description: cat.description,
  position: index + 1,
}))

setMultipleSchemas([
  generateCollectionPageSchema(
    'GoHighLevel App Categories',
    'Browse GoHighLevel apps organized by category - CRM, automation, AI, payments, and more.',
    '/categories',
    categoryItems
  ),
  generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/categories' },
  ]),
  generateItemListSchema(categoryItems, 'GoHighLevel App Categories'),
])
</script>

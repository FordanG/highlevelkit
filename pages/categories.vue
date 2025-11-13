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
          class="card p-8 hover:scale-105 transition-all cursor-pointer"
        >
          <div class="text-5xl mb-4">{{ category.icon }}</div>
          <h3 class="text-xl font-bold text-white mb-2">
            {{ category.name }}
          </h3>
          <p class="text-slate-300">
            {{ category.count }} apps
          </p>
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
}))

useHead({
  title: 'Categories - Highlevel Kit',
  meta: [
    {
      name: 'description',
      content: 'Browse GoHighLevel apps by category. Find CRM tools, automation, AI integrations, and more.'
    }
  ]
})
</script>

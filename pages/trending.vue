<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex items-center gap-3 mb-4">
          <div class="text-4xl">🔥</div>
          <h1 class="text-4xl font-bold text-white">
            Trending Apps
          </h1>
        </div>
        <p class="text-slate-300">
          Most popular apps in the GoHighLevel community
        </p>
      </div>
    </div>

    <!-- Apps Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="trendingApps.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AppCard
          v-for="app in trendingApps"
          :key="app.id"
          :app="app"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4">📈</div>
        <h3 class="text-xl font-bold text-white mb-2">
          No trending apps yet
        </h3>
        <p class="text-slate-300 mb-6">
          Check back soon to see what's popular
        </p>
        <NuxtLink to="/apps" class="btn-primary">
          Browse All Apps
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import appsData from '~/data/apps.json'

// Filter trending apps
const trendingApps = appsData.filter((app: any) => app.trending)

useHead({
  title: 'Trending Apps - Highlevel Kit',
  meta: [
    {
      name: 'description',
      content: 'Explore the most popular GoHighLevel apps and integrations trending right now in the community.'
    }
  ]
})
</script>

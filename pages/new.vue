<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex items-center gap-3 mb-4">
          <div class="text-4xl">✨</div>
          <h1 class="text-4xl font-bold text-white">
            New Releases
          </h1>
        </div>
        <p class="text-slate-300">
          Discover the latest apps added to Highlevel Kit
        </p>
      </div>
    </div>

    <!-- Apps Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="newApps.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AppCard
          v-for="app in newApps"
          :key="app.id"
          :app="app"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4">🎉</div>
        <h3 class="text-xl font-bold text-white mb-2">
          No new apps yet
        </h3>
        <p class="text-slate-300 mb-6">
          Check back soon for new additions to our directory
        </p>
        <Button
          as="a"
          href="/apps"
          label="Browse All Apps"
          class="p-button-primary"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import appsData from '~/data/apps.json'

// Sort apps by ID (newest first) and take the first 12
const newApps = appsData
  .sort((a: any, b: any) => b.id - a.id)
  .slice(0, 12)

useHead({
  title: 'New Releases - Highlevel Kit',
  meta: [
    {
      name: 'description',
      content: 'Discover the latest apps and integrations added to Highlevel Kit. Stay up to date with new GoHighLevel tools.'
    }
  ]
})
</script>

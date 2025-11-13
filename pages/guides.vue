<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          Integration Guides
        </h1>
        <p class="text-slate-300">
          Step-by-step guides to integrate apps with GoHighLevel
        </p>
      </div>
    </div>

    <!-- Coming Soon -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="text-6xl mb-4">📚</div>
      <h2 class="text-2xl font-semibold text-white mb-4">
        Coming Soon
      </h2>
      <p class="text-slate-300 mb-8">
        We're working on comprehensive integration guides. Stay tuned!
      </p>
      <NuxtLink to="/apps" class="btn-primary">
        Browse Apps
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Integration Guides - Highlevel Kit',
  meta: [
    {
      name: 'description',
      content: 'Learn how to integrate various apps and tools with GoHighLevel using our step-by-step guides.'
    }
  ]
})
</script>

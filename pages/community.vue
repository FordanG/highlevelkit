<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          Community
        </h1>
        <p class="text-slate-300">
          Connect with other GoHighLevel users and developers
        </p>
      </div>
    </div>

    <!-- Coming Soon -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="text-6xl mb-4">👥</div>
      <h2 class="text-2xl font-semibold text-white mb-4">
        Coming Soon
      </h2>
      <p class="text-slate-300 mb-8">
        We're building a community space for GoHighLevel users. Stay tuned!
      </p>
      <NuxtLink to="/apps" class="btn-primary">
        Browse Apps
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Community - Highlevel Kit',
  meta: [
    {
      name: 'description',
      content: 'Join the Highlevel Kit community to connect with other GoHighLevel users and developers.'
    }
  ]
})
</script>

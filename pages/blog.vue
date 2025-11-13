<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          Blog
        </h1>
        <p class="text-slate-300">
          Latest news, tips, and insights about GoHighLevel
        </p>
      </div>
    </div>

    <!-- Coming Soon -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="text-6xl mb-4">📝</div>
      <h2 class="text-2xl font-semibold text-white mb-4">
        Coming Soon
      </h2>
      <p class="text-slate-300 mb-8">
        Our blog is currently under development. Check back soon for articles, guides, and tips!
      </p>
      <Button
        as="a"
        href="/apps"
        label="Browse Apps"
        severity="primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Blog - Highlevel Kit',
  meta: [
    {
      name: 'description',
      content: 'Read the latest articles, tips, and insights about GoHighLevel apps and integrations.'
    }
  ]
})
</script>

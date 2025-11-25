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
// SEO Configuration - noindex since coming soon
const { setPageMeta, generateBreadcrumbSchema, setStructuredData, siteUrl } = useSEO()

setPageMeta({
  title: 'Integration Guides - Highlevel Kit | GoHighLevel Tutorials',
  description: 'Learn how to integrate various apps and tools with GoHighLevel using our step-by-step guides. Master Zapier, API integrations, and more.',
  url: `${siteUrl}/guides`,
  noindex: true, // Coming soon page - don't index
  tags: ['GoHighLevel guides', 'integration tutorials', 'GHL setup', 'how to integrate'],
})

setStructuredData(
  generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
  ])
)
</script>

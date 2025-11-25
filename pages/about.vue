<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          About Highlevel Kit
        </h1>
        <p class="text-lg text-slate-300 max-w-3xl">
          Your trusted directory for discovering the best GoHighLevel apps and integrations
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="space-y-8">
        <!-- Mission -->
        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p class="text-slate-300 leading-relaxed">
            Highlevel Kit was created to help agencies, SaaS providers, and freelancers discover the perfect tools to enhance their GoHighLevel experience. We curate and showcase the best apps, integrations, and solutions available in the ecosystem.
          </p>
        </section>

        <!-- What We Do -->
        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">What We Do</h2>
          <div class="space-y-4">
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-white mb-2">🎯 Curated Directory</h3>
              <p class="text-slate-300">
                We handpick and review every app in our directory to ensure quality and reliability.
              </p>
            </div>
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-white mb-2">📊 Detailed Reviews</h3>
              <p class="text-slate-300">
                Get insights from real users and our expert team to make informed decisions.
              </p>
            </div>
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-white mb-2">🚀 Stay Updated</h3>
              <p class="text-slate-300">
                Discover new releases and trending apps as the GoHighLevel ecosystem grows.
              </p>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section class="card p-8 text-center">
          <h2 class="text-2xl font-semibold text-white mb-4">Join Our Community</h2>
          <p class="text-slate-300 mb-6">
            Have an app you'd like to feature? Submit it today!
          </p>
          <Button
            as="a"
            href="/submit"
            label="Submit Your App"
            severity="primary"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO Configuration
const { setPageMeta, generateAboutPageSchema, generateBreadcrumbSchema, setMultipleSchemas, siteUrl } = useSEO()

setPageMeta({
  title: 'About Us - Highlevel Kit | GoHighLevel App Directory',
  description: 'Learn about Highlevel Kit, your trusted directory for discovering the best GoHighLevel apps and integrations. Our mission is to help agencies and SaaS providers find the perfect tools.',
  url: `${siteUrl}/about`,
  tags: ['about Highlevel Kit', 'GoHighLevel directory', 'app directory', 'agency tools'],
})

setMultipleSchemas([
  generateAboutPageSchema(),
  generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]),
])
</script>

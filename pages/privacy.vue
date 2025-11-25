<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          Privacy Policy
        </h1>
        <p class="text-slate-300">
          Last updated: {{ currentDate }}
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">Introduction</h2>
          <p class="text-slate-300 leading-relaxed">
            At Highlevel Kit, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
          <p class="text-slate-300 leading-relaxed mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul class="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li>Name and email address when you submit an app or contact us</li>
            <li>Information about your app when you submit it to our directory</li>
            <li>Usage data and analytics to improve our service</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
          <p class="text-slate-300 leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul class="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li>Process your app submissions</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Improve and optimize our website and services</li>
            <li>Send you updates and newsletters (with your consent)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">Data Security</h2>
          <p class="text-slate-300 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">Your Rights</h2>
          <p class="text-slate-300 leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul class="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">Contact Us</h2>
          <p class="text-slate-300 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us through our
            <NuxtLink to="/contact" class="text-primary-400 hover:text-primary-300 underline">contact page</NuxtLink>.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

// SEO Configuration
const { setPageMeta, generateWebPageSchema, generateBreadcrumbSchema, setMultipleSchemas, siteUrl } = useSEO()

setPageMeta({
  title: 'Privacy Policy - Highlevel Kit',
  description: 'Read Highlevel Kit\'s privacy policy to understand how we collect, use, and protect your personal information when using our GoHighLevel app directory.',
  url: `${siteUrl}/privacy`,
  tags: ['privacy policy', 'data protection', 'privacy', 'Highlevel Kit'],
})

setMultipleSchemas([
  generateWebPageSchema(
    'Privacy Policy',
    'Highlevel Kit\'s privacy policy explaining how we collect, use, and protect your information.',
    '/privacy',
    '2024-01-01',
    currentDate
  ),
  generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy' },
  ]),
])
</script>

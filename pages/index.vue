<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[1100px] bg-primary-500/10 blur-3xl rounded-full"></div>
        <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
        <div class="text-center max-w-4xl mx-auto relative">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 text-xs text-slate-400 border border-white/10 rounded-full px-2.5 py-1 bg-white/5 mb-5">
            <svg class="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>Curated directory for the GoHighLevel ecosystem</span>
          </div>

          <!-- Heading -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white mb-4 animate-fade-in" style="letter-spacing:-0.02em">
            Discover the Best
            <span class="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              GoHighLevel
            </span>
            Apps & Integrations
          </h1>

          <p class="text-base sm:text-lg text-slate-400 mb-8 animate-slide-up">
            Curated directory of apps, integrations, and tools to supercharge your GoHighLevel experience.
            Find solutions for agencies, SaaS providers, and freelancers.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up mb-8">
            <Button as="a" href="/apps" label="Browse All Apps" severity="primary" severity="primary" />
            <Button as="a" href="/submit" label="Submit Your App" severity="secondary" severity="secondary" />
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-3 gap-3 max-w-2xl mx-auto mt-12">
            <div class="rounded-lg border border-white/10 bg-white/5 p-3">
              <p class="text-xs text-slate-400">Apps curated</p>
              <p class="text-xl font-semibold tracking-tight text-white" style="letter-spacing:-0.02em">{{ apps.length }}+</p>
            </div>
            <div class="rounded-lg border border-white/10 bg-white/5 p-3">
              <p class="text-xs text-slate-400">Categories</p>
              <p class="text-xl font-semibold tracking-tight text-white" style="letter-spacing:-0.02em">{{ categories.length }}</p>
            </div>
            <div class="rounded-lg border border-white/10 bg-white/5 p-3">
              <p class="text-xs text-slate-400">Happy users</p>
              <p class="text-xl font-semibold tracking-tight text-white" style="letter-spacing:-0.02em">1000+</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-10 sm:py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2" style="letter-spacing:-0.02em">Browse by Category</h2>
          <p class="text-slate-400">Find the perfect tools for your needs</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/apps?category=${category.id}`"
            class="group rounded-xl border border-white/10 bg-white/5 hover:bg-white/7 transition p-6 text-center cursor-pointer"
          >
            <div class="text-4xl mb-3">{{ category.icon }}</div>
            <div class="font-medium text-white text-sm">{{ category.name }}</div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Apps -->
    <section class="py-10 sm:py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2" style="letter-spacing:-0.02em">Featured Apps</h2>
            <p class="text-slate-400">Hand-picked by our team</p>
          </div>
          <NuxtLink to="/apps?featured=true" class="text-sm text-slate-300 hover:text-white inline-flex items-center gap-1">
            Browse all
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AppCard
            v-for="app in featuredApps"
            :key="app.id"
            :app="app"
          />
        </div>
      </div>
    </section>

    <!-- Trending Apps -->
    <section class="py-10 sm:py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2" style="letter-spacing:-0.02em">Trending Now</h2>
            <p class="text-slate-400">Most popular this week</p>
          </div>
          <NuxtLink to="/apps?trending=true" class="text-sm text-slate-300 hover:text-white inline-flex items-center gap-1">
            View all
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <AppCard
            v-for="app in trendingApps"
            :key="app.id"
            :app="app"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-10 sm:py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="rounded-2xl border border-white/10 bg-gradient-to-br from-primary-500/10 via-white/5 to-accent-500/10 p-8 sm:p-12 text-center relative overflow-hidden">
          <!-- Background decoration -->
          <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-0 left-1/4 h-48 w-48 bg-primary-500/10 blur-3xl rounded-full"></div>
            <div class="absolute bottom-0 right-1/4 h-48 w-48 bg-accent-500/10 blur-3xl rounded-full"></div>
          </div>

          <div class="relative">
            <h2 class="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4" style="letter-spacing:-0.02em">
              Ready to Supercharge Your GoHighLevel?
            </h2>
            <p class="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of agencies and entrepreneurs who have found their perfect tools
            </p>
            <Button
              as="a"
              href="/apps"
              severity="primary"
              size="large"
            >
              <template #default>
                <span>Explore All Apps</span>
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </template>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <HomeNewsletter />
  </div>
</template>

<script setup lang="ts">
import appsData from '~/data/apps.json'
import categoriesData from '~/data/categories.json'

const apps = appsData
const categories = categoriesData
const featuredApps = apps.filter((app: any) => app.featured).slice(0, 6)
const trendingApps = apps.filter((app: any) => app.trending).slice(0, 4)

useHead({
  title: 'Highlevel Kit - Discover the Best GoHighLevel Apps & Integrations',
  meta: [
    {
      name: 'description',
      content: 'The ultimate directory for GoHighLevel apps, integrations, and tools. Find curated solutions for agencies, SaaS providers, and freelancers.'
    }
  ]
})
</script>

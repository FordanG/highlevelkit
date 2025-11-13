<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Discover the Best
            <span class="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              GoHighLevel
            </span>
            Apps
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-slide-up">
            Curated directory of apps, integrations, and tools to supercharge your GoHighLevel experience.
            Find solutions for agencies, SaaS providers, and freelancers.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <NuxtLink to="/apps" class="btn-primary">
              Browse All Apps
            </NuxtLink>
            <NuxtLink to="/submit" class="btn-secondary">
              Submit Your App
            </NuxtLink>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ apps.length }}+</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Apps Listed</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ categories.length }}+</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Categories</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">1000+</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Happy Users</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Browse by Category</h2>
          <p class="text-gray-600 dark:text-gray-400">Find the perfect tools for your needs</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/apps?category=${category.id}`"
            class="card p-6 text-center hover:scale-105 transition-transform cursor-pointer"
          >
            <div class="text-4xl mb-3">{{ category.icon }}</div>
            <div class="font-semibold text-gray-900 dark:text-white">{{ category.name }}</div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Apps -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Apps</h2>
            <p class="text-gray-600 dark:text-gray-400">Hand-picked by our team</p>
          </div>
          <NuxtLink to="/apps?featured=true" class="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
            View All →
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AppCard
            v-for="app in featuredApps"
            :key="app.id"
            :app="app"
          />
        </div>
      </div>
    </section>

    <!-- Trending Apps -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Trending Now</h2>
            <p class="text-gray-600 dark:text-gray-400">Most popular this week</p>
          </div>
          <NuxtLink to="/apps?trending=true" class="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
            View All →
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AppCard
            v-for="app in trendingApps"
            :key="app.id"
            :app="app"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold text-white mb-6">
          Ready to Supercharge Your GoHighLevel?
        </h2>
        <p class="text-xl text-primary-100 mb-8">
          Join thousands of agencies and entrepreneurs who have found their perfect tools
        </p>
        <NuxtLink
          to="/apps"
          class="inline-block px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
        >
          Explore All Apps
        </NuxtLink>
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

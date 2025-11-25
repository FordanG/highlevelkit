<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[1100px] bg-primary-500/10 blur-3xl rounded-full animate-pulse-slow"></div>
        <div class="absolute -top-20 left-1/4 h-48 w-48 bg-accent-500/20 blur-3xl rounded-full animate-float"></div>
        <div class="absolute top-40 right-1/4 h-64 w-64 bg-primary-600/15 blur-3xl rounded-full animate-float-delay"></div>
        <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
        <div class="text-center max-w-4xl mx-auto relative">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 text-xs text-slate-400 border border-white/10 rounded-full px-2.5 py-1 bg-white/5 mb-5 animate-scale-in hover:border-primary-500/30 transition-all duration-300">
            <svg class="w-4 h-4 text-primary-400 animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>Curated directory for the GoHighLevel ecosystem</span>
          </div>

          <!-- Heading -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white mb-4" style="letter-spacing:-0.02em">
            <span class="inline-block animate-fade-in">Discover the Best</span>
            <span class="block animate-slide-up-delay-1">
              <span class="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent inline-block animate-gradient-shift" style="background-size: 200% 200%">
                GoHighLevel
              </span>
            </span>
            <span class="inline-block animate-slide-up-delay-2">Apps & Integrations</span>
          </h1>

          <p class="text-base sm:text-lg text-slate-400 mb-8 animate-slide-up-delay-2 max-w-2xl mx-auto">
            Curated directory of apps, integrations, and tools to supercharge your GoHighLevel experience.
            Find solutions for agencies, SaaS providers, and freelancers.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-3 mb-8">
            <NuxtLink
              to="/apps"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 rounded-lg shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Browse All Apps
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/submit"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Submit Your App
            </NuxtLink>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-3 gap-3 max-w-2xl mx-auto mt-12">
            <div class="rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-primary-500/20 transition-all duration-300 group animate-scale-in">
              <p class="text-xs text-slate-400 mb-1">Apps curated</p>
              <p class="text-xl font-semibold tracking-tight text-white group-hover:text-primary-400 transition-colors" style="letter-spacing:-0.02em">
                <span ref="appsCounter">0</span>+
              </p>
            </div>
            <div class="rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-primary-500/20 transition-all duration-300 group animate-scale-in" style="animation-delay: 0.1s">
              <p class="text-xs text-slate-400 mb-1">Categories</p>
              <p class="text-xl font-semibold tracking-tight text-white group-hover:text-primary-400 transition-colors" style="letter-spacing:-0.02em">
                <span ref="categoriesCounter">0</span>
              </p>
            </div>
            <div class="rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-primary-500/20 transition-all duration-300 group animate-scale-in" style="animation-delay: 0.2s">
              <p class="text-xs text-slate-400 mb-1">Happy users</p>
              <p class="text-xl font-semibold tracking-tight text-white group-hover:text-primary-400 transition-colors" style="letter-spacing:-0.02em">
                <span ref="usersCounter">0</span>+
              </p>
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
            class="group rounded-xl border border-white/10 bg-white/5 hover:bg-white/7 hover:border-primary-500/30 transition-all duration-300 p-6 text-center cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-primary-500/10 active:scale-95"
          >
            <div class="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{{ category.icon }}</div>
            <div class="font-medium text-slate-300 group-hover:text-white text-sm transition-colors">{{ category.name }}</div>
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
            <NuxtLink
              to="/apps"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore All Apps
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
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
const categories = categoriesData.filter(category =>
  appsData.some((app: any) => app.category.includes(category.id))
)
const featuredApps = apps.filter((app: any) => app.featured).slice(0, 6)

// Counter animation refs
const appsCounter = ref<HTMLElement | null>(null)
const categoriesCounter = ref<HTMLElement | null>(null)
const usersCounter = ref<HTMLElement | null>(null)

// Animate counter from 0 to target value
const animateCounter = (element: HTMLElement | null, target: number, duration: number = 2000) => {
  if (!element) return

  const start = 0
  const startTime = performance.now()

  const updateCounter = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const current = Math.floor(start + (target - start) * easeOutQuart)

    element.textContent = current.toString()

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target.toString()
    }
  }

  requestAnimationFrame(updateCounter)
}

// Start animations when component mounts
onMounted(() => {
  // Delay counters slightly to start after hero animations
  setTimeout(() => {
    animateCounter(appsCounter.value, apps.length, 2000)
    animateCounter(categoriesCounter.value, categories.length, 1500)
    animateCounter(usersCounter.value, 1000, 2500)
  }, 500)
})

// SEO Configuration
const { setPageMeta, generateOrganizationSchema, generateWebsiteSchema, setMultipleSchemas, siteUrl } = useSEO()

setPageMeta({
  title: 'Highlevel Kit - Discover the Best GoHighLevel Apps & Integrations',
  description: 'The ultimate directory for GoHighLevel apps, integrations, and tools. Find curated solutions for agencies, SaaS providers, and freelancers.',
  image: `${siteUrl}/og-home.png`,
  url: siteUrl,
  type: 'website',
})

// Add structured data
setMultipleSchemas([
  generateOrganizationSchema(),
  generateWebsiteSchema(),
])
</script>

<template>
  <NuxtLink
    :to="`/apps/${app.slug}`"
    class="group rounded-xl border border-white/10 bg-white/5 hover:bg-white/7 transition p-4 cursor-pointer"
  >
    <!-- Logo and Badges -->
    <div class="flex items-start justify-between mb-3">
      <div class="text-5xl">{{ app.logo }}</div>
      <div class="flex flex-col gap-1.5">
        <span
          v-if="app.featured"
          class="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-primary-500/15 border border-primary-500/30 text-primary-200"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span>Featured</span>
        </span>
        <span
          v-if="app.trending"
          class="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-200"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
          <span>Trending</span>
        </span>
      </div>
    </div>

    <!-- App Info -->
    <div>
      <h3 class="text-[17px] font-semibold tracking-tight text-white mb-2 group-hover:text-primary-400 transition-colors" style="letter-spacing:-0.02em">
        {{ app.name }}
      </h3>
      <p class="text-sm text-slate-400 mb-3 line-clamp-2">
        {{ app.tagline }}
      </p>

      <!-- Categories -->
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="cat in app.category.slice(0, 2)"
          :key="cat"
          class="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300"
        >
          {{ getCategoryName(cat) }}
        </span>
      </div>

      <!-- Rating and Pricing -->
      <div class="flex items-center justify-between pt-3 border-t border-white/5">
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-sm font-semibold text-white">{{ app.rating }}</span>
          <span class="text-xs text-slate-400">({{ app.reviewCount }})</span>
        </div>
        <div class="text-sm font-semibold">
          <span v-if="app.pricing.model === 'free'" class="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">Free</span>
          <span v-else-if="app.pricing.model === 'freemium'" class="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
            From ${{ app.pricing.startingPrice }}/mo
          </span>
          <span v-else class="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
            ${{ app.pricing.startingPrice }}/mo
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import categoriesData from '~/data/categories.json'

interface App {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  logo: string
  category: string[]
  pricing: {
    model: string
    startingPrice?: number
    currency: string
  }
  rating: number
  reviewCount: number
  featured: boolean
  trending: boolean
  useCase: string[]
  userType: string[]
  integrationLevel: string
  setupDifficulty: string
  features: string[]
  website?: string
  affiliateLink?: string
}

const props = defineProps<{
  app: App
}>()

const getCategoryName = (id: string) => {
  const category = categoriesData.find(c => c.id === id)
  return category ? category.name : id
}
</script>

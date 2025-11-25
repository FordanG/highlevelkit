<template>
  <NuxtLink
    :to="`/apps/${app.slug}`"
    class="group block rounded-xl border border-white/10 bg-white/5 hover:bg-white/7 transition-all duration-300 overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/10 hover:border-white/20 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
    :aria-label="`View details for ${app.name}`"
  >
    <!-- Preview Image with 16:9 aspect ratio -->
    <div class="relative w-full aspect-video overflow-hidden" :style="showPlaceholder ? gradientStyle : {}">
      <!-- Real image -->
      <img
        v-if="app.image && !imageError"
        :src="app.image"
        :alt="`${app.name} preview`"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        @error="handleImageError"
      />
      <!-- Placeholder with gradient and app name -->
      <div v-else class="w-full h-full flex items-center justify-center p-4">
        <span class="text-xl font-bold text-white/90 text-center drop-shadow-lg">{{ app.name }}</span>
      </div>
      <!-- Badges overlay -->
      <div class="absolute top-2 right-2 flex flex-col gap-1.5">
        <span
          v-if="app.featured"
          class="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-primary-500/90 border border-primary-500/30 text-white"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span>Featured</span>
        </span>
        <span
          v-if="app.trending"
          class="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-amber-500/90 border border-amber-500/30 text-white"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
          <span>Trending</span>
        </span>
      </div>
    </div>

    <div class="p-4">
      <!-- App Header: Logo + Name + Badges (when no preview image, show badges here) -->
      <div class="flex items-start gap-3 mb-3">
        <!-- Logo as profile photo -->
        <div v-if="isLogoUrl" class="w-10 h-10 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-primary-500/30 flex-shrink-0 bg-white/5 group-hover:bg-white/10 flex items-center justify-center p-1.5 transition-all duration-300">
          <img :src="app.logo" :alt="`${app.name} logo`" class="w-full h-full object-contain" loading="lazy" />
        </div>
        <div v-else class="w-10 h-10 rounded-lg ring-1 ring-white/10 group-hover:ring-primary-500/30 flex items-center justify-center flex-shrink-0 transition-all duration-300" :style="logoGradientStyle">
          <span class="text-sm font-bold text-white drop-shadow">{{ appInitials }}</span>
        </div>

        <div class="flex-grow min-w-0">
          <h3 class="text-[17px] font-semibold tracking-tight text-white group-hover:text-primary-400 transition-colors truncate" style="letter-spacing:-0.02em">
            {{ app.name }}
          </h3>
        </div>
      </div>

      <!-- Tagline -->
      <p class="text-sm text-slate-400 mb-3 line-clamp-2">
        {{ app.tagline }}
      </p>

      <!-- Categories -->
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="cat in app.category.slice(0, 2)"
          :key="cat"
          class="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:text-white transition-all duration-300"
        >
          {{ getCategoryName(cat) }}
        </span>
      </div>

      <!-- Rating and Pricing -->
      <div class="flex items-center justify-between pt-3 border-t border-white/5">
        <a
          :href="`https://www.g2.com/search/products?query=${encodeURIComponent(app.name)}`"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 hover:opacity-80 transition-opacity"
          :aria-label="`Rating: ${app.rating} out of 5 stars, ${app.reviewCount} reviews on G2`"
          @click.stop
        >
          <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-sm font-semibold text-white">{{ app.rating }}</span>
          <span class="text-xs text-slate-400">({{ app.reviewCount }})</span>
        </a>
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
  image?: string
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

const imageError = ref(false)

const showPlaceholder = computed(() => !props.app.image || imageError.value)

const isLogoUrl = computed(() => {
  return props.app.logo && (props.app.logo.startsWith('http://') || props.app.logo.startsWith('https://') || props.app.logo.startsWith('/'))
})

// Generate a hash number from string for consistent colors
const hashString = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

// Gradient color pairs for aesthetic placeholders
const gradientPairs = [
  ['#667eea', '#764ba2'], // Purple to violet
  ['#f093fb', '#f5576c'], // Pink to coral
  ['#4facfe', '#00f2fe'], // Blue to cyan
  ['#43e97b', '#38f9d7'], // Green to teal
  ['#fa709a', '#fee140'], // Pink to yellow
  ['#a8edea', '#fed6e3'], // Teal to pink
  ['#ff9a9e', '#fecfef'], // Salmon to rose
  ['#ffecd2', '#fcb69f'], // Peach to orange
  ['#667eea', '#764ba2'], // Indigo to purple
  ['#48c6ef', '#6f86d6'], // Sky to periwinkle
  ['#feada6', '#f5efef'], // Peach to cream
  ['#a18cd1', '#fbc2eb'], // Lavender to pink
  ['#fad0c4', '#ffd1ff'], // Blush to lavender
  ['#30cfd0', '#330867'], // Cyan to deep purple
  ['#6a11cb', '#2575fc'], // Purple to blue
]

const gradientStyle = computed(() => {
  const hash = hashString(props.app.name)
  const pair = gradientPairs[hash % gradientPairs.length]
  const angle = (hash % 360)
  return {
    background: `linear-gradient(${angle}deg, ${pair[0]}, ${pair[1]})`
  }
})

const logoGradientStyle = computed(() => {
  const hash = hashString(props.app.name + 'logo')
  const pair = gradientPairs[hash % gradientPairs.length]
  return {
    background: `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`
  }
})

const appInitials = computed(() => {
  const words = props.app.name.split(/[\s-]+/)
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  return words.slice(0, 2).map(w => w[0]).join('').toUpperCase()
})

const getCategoryName = (id: string) => {
  const category = categoriesData.find(c => c.id === id)
  return category ? category.name : id
}

const handleImageError = () => {
  imageError.value = true
}
</script>

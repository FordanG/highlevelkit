<template>
  <Teleport to="body">
    <Transition name="search-modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-navy-950/90 backdrop-blur-sm" @click="close"></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-xl mx-4 bg-navy-900 border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
          <!-- Search Input -->
          <div class="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <svg class="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="text"
              placeholder="Search apps..."
              class="flex-1 bg-transparent text-white text-base placeholder-slate-400 outline-none"
              @keydown.down.prevent="navigateDown"
              @keydown.up.prevent="navigateUp"
              @keydown.enter.prevent="selectResult"
              @keydown.escape="close"
            />
            <kbd class="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs text-slate-400 bg-white/5 border border-white/10 rounded">ESC</kbd>
          </div>

          <!-- Results -->
          <div class="max-h-[400px] overflow-y-auto">
            <!-- Loading State -->
            <div v-if="isLoading" class="p-4 text-center text-slate-400">
              Loading...
            </div>

            <!-- No Results -->
            <div v-else-if="searchQuery && filteredApps.length === 0" class="p-8 text-center">
              <div class="text-4xl mb-3">🔍</div>
              <p class="text-slate-300 font-medium">No apps found</p>
              <p class="text-sm text-slate-400 mt-1">Try a different search term</p>
            </div>

            <!-- Results List -->
            <div v-else-if="searchQuery" class="py-2">
              <p class="px-4 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                Apps ({{ filteredApps.length }})
              </p>
              <NuxtLink
                v-for="(app, index) in filteredApps.slice(0, 8)"
                :key="app.id"
                :to="`/apps/${app.slug}`"
                class="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer"
                :class="{ 'bg-white/5': selectedIndex === index }"
                @click="close"
                @mouseenter="selectedIndex = index"
              >
                <img
                  :src="app.logo"
                  :alt="app.name"
                  class="w-10 h-10 rounded-lg object-cover bg-white/10"
                  @error="handleImageError"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-white font-medium truncate">{{ app.name }}</p>
                  <p class="text-sm text-slate-400 truncate">{{ app.tagline }}</p>
                </div>
                <div class="flex items-center gap-1 text-amber-400 text-sm">
                  <i class="pi pi-star-fill text-xs"></i>
                  <span>{{ app.rating }}</span>
                </div>
              </NuxtLink>
              <div v-if="filteredApps.length > 8" class="px-4 py-2 text-center">
                <NuxtLink
                  to="/apps"
                  class="text-sm text-primary-400 hover:text-primary-300"
                  @click="navigateToAppsWithSearch"
                >
                  View all {{ filteredApps.length }} results
                </NuxtLink>
              </div>
            </div>

            <!-- Default State -->
            <div v-else class="py-4">
              <p class="px-4 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                Quick Links
              </p>
              <NuxtLink
                to="/apps"
                class="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                @click="close"
              >
                <div class="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <i class="pi pi-th-large text-primary-400"></i>
                </div>
                <div>
                  <p class="text-white font-medium">Browse All Apps</p>
                  <p class="text-sm text-slate-400">Explore our full directory</p>
                </div>
              </NuxtLink>
              <NuxtLink
                to="/categories"
                class="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                @click="close"
              >
                <div class="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center">
                  <i class="pi pi-folder text-accent-400"></i>
                </div>
                <div>
                  <p class="text-white font-medium">Categories</p>
                  <p class="text-sm text-slate-400">Browse by category</p>
                </div>
              </NuxtLink>
              <NuxtLink
                to="/new"
                class="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                @click="close"
              >
                <div class="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <i class="pi pi-sparkles text-emerald-400"></i>
                </div>
                <div>
                  <p class="text-white font-medium">New Releases</p>
                  <p class="text-sm text-slate-400">Recently added apps</p>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-white/[0.02]">
            <div class="flex items-center gap-4 text-xs text-slate-400">
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↑</kbd>
                <kbd class="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↓</kbd>
                to navigate
              </span>
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↵</kbd>
                to select
              </span>
            </div>
            <span class="text-xs text-slate-500">Highlevel Kit</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import appsData from '~/data/apps.json'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const router = useRouter()
const searchInputRef = ref<HTMLInputElement | null>(null)
const searchQuery = ref('')
const selectedIndex = ref(0)
const isLoading = ref(false)

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const apps = appsData as any[]

const filteredApps = computed(() => {
  if (!searchQuery.value) return []

  const query = searchQuery.value.toLowerCase()
  return apps.filter(app =>
    app.name.toLowerCase().includes(query) ||
    app.tagline.toLowerCase().includes(query) ||
    app.description.toLowerCase().includes(query) ||
    app.category.some((cat: string) => cat.toLowerCase().includes(query))
  )
})

// Reset state when modal opens
watch(isOpen, (newValue) => {
  if (newValue) {
    searchQuery.value = ''
    selectedIndex.value = 0
    // Focus input on next tick
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  }
})

// Reset selected index when results change
watch(filteredApps, () => {
  selectedIndex.value = 0
})

const close = () => {
  isOpen.value = false
}

const navigateDown = () => {
  const maxIndex = Math.min(filteredApps.value.length - 1, 7)
  if (selectedIndex.value < maxIndex) {
    selectedIndex.value++
  }
}

const navigateUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

const selectResult = () => {
  if (filteredApps.value.length > 0 && selectedIndex.value < filteredApps.value.length) {
    const app = filteredApps.value[selectedIndex.value]
    router.push(`/apps/${app.slug}`)
    close()
  }
}

const navigateToAppsWithSearch = () => {
  router.push({ path: '/apps', query: { search: searchQuery.value } })
  close()
}

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = '/placeholder-app.png'
}
</script>

<style>
.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 0.2s ease;
}

.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}

.search-modal-enter-active .relative,
.search-modal-leave-active .relative {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.search-modal-enter-from .relative,
.search-modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>

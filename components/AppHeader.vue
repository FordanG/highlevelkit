<template>
  <header class="sticky top-0 z-50 backdrop-blur-xl bg-navy-950/80 border-b border-white/5">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="inline-flex items-center gap-2 group">
          <div class="h-7 w-7 rounded-md bg-primary-500/10 ring-1 ring-primary-500/30 grid place-items-center">
            <span class="text-primary-400 text-[11px] font-semibold tracking-tight" style="letter-spacing:-0.02em">HK</span>
          </div>
          <span class="text-slate-100 text-base sm:text-[17px] font-semibold tracking-tight group-hover:text-white transition-colors" style="letter-spacing:-0.02em">Highlevel Kit</span>
          <span class="hidden sm:inline-flex text-[11px] text-slate-400/80 px-2 py-0.5 rounded border border-white/10">Beta</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink
            to="/apps"
            class="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Apps
          </NuxtLink>
          <NuxtLink
            to="/categories"
            class="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Categories
          </NuxtLink>
          <NuxtLink
            to="/new"
            class="text-sm text-slate-300 hover:text-white transition-colors"
          >
            New Releases
          </NuxtLink>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-2">
          <!-- Search Button -->
          <button
            @click="openSearch"
            class="hidden sm:flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors px-3 py-2 rounded-md border border-white/10 hover:border-white/20 hover:bg-white/5"
            aria-label="Search"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
          </button>

          <!-- Submit Button -->
          <NuxtLink
            to="/submit"
            class="inline-flex items-center gap-2 text-sm px-3.5 py-2 rounded-md bg-primary-500/90 hover:bg-primary-400 text-white transition-colors ring-1 ring-primary-400/30"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span class="hidden sm:inline">Submit App</span>
          </NuxtLink>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMenu"
            class="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden py-4 space-y-3 border-t border-white/5">
        <NuxtLink
          to="/apps"
          class="block py-2 text-sm text-slate-300 hover:text-white transition-colors"
          @click="closeMenu"
        >
          Apps
        </NuxtLink>
        <NuxtLink
          to="/categories"
          class="block py-2 text-sm text-slate-300 hover:text-white transition-colors"
          @click="closeMenu"
        >
          Categories
        </NuxtLink>
        <NuxtLink
          to="/new"
          class="block py-2 text-sm text-slate-300 hover:text-white transition-colors"
          @click="closeMenu"
        >
          New Releases
        </NuxtLink>
        <NuxtLink
          to="/submit"
          class="block py-2 text-sm text-slate-300 hover:text-white transition-colors"
          @click="closeMenu"
        >
          Submit App
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const openSearch = () => {
  // TODO: Implement search modal
  console.log('Search clicked')
}
</script>

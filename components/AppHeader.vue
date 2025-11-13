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
          <Button
            @click="openSearch"
            severity="secondary"
            size="small"
            text
            class="hidden sm:flex p-button-text"
            aria-label="Search"
            style="padding: 0.5rem 0.75rem;"
          >
            <template #default>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span class="ml-2">Search</span>
            </template>
          </Button>

          <!-- Submit Button -->
          <Button
            as="a"
            href="/submit"
            size="small"
            style="padding: 0.5rem 0.875rem;"
          >
            <template #default>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span class="hidden sm:inline ml-2">Submit App</span>
            </template>
          </Button>

          <!-- Mobile Menu Button -->
          <Button
            @click="toggleMenu"
            severity="secondary"
            text
            icon-only
            class="md:inline-flex md:!hidden p-button-text"
            aria-label="Toggle menu"
            style="height: 2.25rem; width: 2.25rem; padding: 0;"
          >
            <template #default>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </template>
          </Button>
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

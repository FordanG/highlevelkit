<template>
  <div class="rounded-xl border border-white/10 bg-white/5 p-4 animate-pulse">
    <!-- Logo and Badges -->
    <div class="flex items-start justify-between mb-3">
      <!-- Logo skeleton -->
      <div class="w-16 h-16 rounded-lg bg-white/10"></div>

      <!-- Badges skeleton -->
      <div class="flex flex-col gap-1.5">
        <div class="w-20 h-5 rounded bg-white/10"></div>
      </div>
    </div>

    <!-- App Info -->
    <div>
      <!-- Title skeleton -->
      <div class="h-5 bg-white/10 rounded mb-2 w-3/4"></div>

      <!-- Description skeleton -->
      <div class="space-y-2 mb-3">
        <div class="h-4 bg-white/10 rounded w-full"></div>
        <div class="h-4 bg-white/10 rounded w-2/3"></div>
      </div>

      <!-- Categories skeleton -->
      <div class="flex gap-2 mb-3">
        <div class="h-6 w-20 rounded-full bg-white/10"></div>
        <div class="h-6 w-24 rounded-full bg-white/10"></div>
      </div>

      <!-- Rating and Pricing skeleton -->
      <div class="flex items-center justify-between pt-3 border-t border-white/5">
        <div class="h-4 w-16 rounded bg-white/10"></div>
        <div class="h-6 w-20 rounded bg-white/10"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed for skeleton
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>

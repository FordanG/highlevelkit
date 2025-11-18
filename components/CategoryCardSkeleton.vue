<template>
  <div class="rounded-xl border border-white/10 bg-white/5 p-6 text-center animate-pulse">
    <!-- Icon skeleton -->
    <div class="w-12 h-12 rounded-full bg-white/10 mx-auto mb-3"></div>

    <!-- Name skeleton -->
    <div class="h-4 bg-white/10 rounded w-24 mx-auto"></div>
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

<template>
  <div class="bg-navy-950 min-h-screen p-dark">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Enable PrimeVue dark mode via useHead - no direct DOM manipulation needed
useHead({
  htmlAttrs: {
    lang: 'en',
    class: 'p-dark'
  }
})
</script>

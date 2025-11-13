<template>
  <div class="bg-navy-950 min-h-screen p-dark">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Enable PrimeVue dark mode
onMounted(() => {
  if (process.client) {
    document.documentElement.classList.add('p-dark')
  }
})

useHead({
  htmlAttrs: {
    lang: 'en',
    class: 'p-dark'
  }
})
</script>

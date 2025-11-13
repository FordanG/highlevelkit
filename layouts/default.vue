<template>
  <div class="min-h-screen flex flex-col bg-navy-950">
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
</script>

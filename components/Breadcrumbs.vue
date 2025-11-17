<template>
  <nav aria-label="Breadcrumb" class="mb-6">
    <ol class="flex items-center gap-2 text-sm" role="list">
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-2">
        <NuxtLink
          v-if="index < items.length - 1"
          :to="item.url"
          class="text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 rounded px-1"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
        >
          {{ item.name }}
        </NuxtLink>
        <span
          v-else
          class="text-white font-medium"
          aria-current="page"
        >
          {{ item.name }}
        </span>

        <svg
          v-if="index < items.length - 1"
          class="w-4 h-4 text-slate-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  name: string
  url: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

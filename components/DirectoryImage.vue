<template>
  <img v-if="source && !failed" :src="source" :srcset="srcset" :sizes="sizes" :alt="alt"
    :width="width" :height="height" :loading="loading" decoding="async" @error="failed = true" />
  <span v-else role="img" :aria-label="alt" class="inline-flex items-center justify-center bg-slate-800 text-slate-200 text-center p-2">
    {{ fallbackText }}
  </span>
</template>

<script setup lang="ts">
import imageVariants from '~/data/image-variants.json'
const props = withDefaults(defineProps<{
  src?: string
  alt: string
  width?: string | number
  height?: string | number
  sizes?: string
  loading?: 'lazy' | 'eager'
}>(), { sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px', loading: 'lazy' })
const failed = ref(false)
watch(() => props.src, () => { failed.value = false })
const variants = computed(() => (imageVariants as Record<string, Array<{src: string; width: number}>>)[props.src || ''] || [])
const source = computed(() => variants.value[0]?.src || props.src)
const srcset = computed(() => variants.value.map(v => `${v.src} ${v.width}w`).join(', ') || undefined)
const fallbackText = computed(() => props.alt.split(/\s+/).slice(0, 3).join(' '))
</script>

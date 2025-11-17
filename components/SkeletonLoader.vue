<template>
  <div class="animate-pulse">
    <!-- Generic skeleton wrapper -->
    <div
      :class="[
        'bg-white/10 rounded',
        heightClass,
        widthClass
      ]"
      :style="{ height: height, width: width }"
    ></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  height?: string
  width?: string
  heightClass?: string
  widthClass?: string
}

withDefaults(defineProps<Props>(), {
  height: 'auto',
  width: 'auto',
  heightClass: 'h-4',
  widthClass: 'w-full'
})
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

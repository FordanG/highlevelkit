<template>
  <section class="py-10 sm:py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12 text-center">
        <div class="inline-flex items-center gap-2 text-xs text-slate-400 border border-white/10 rounded-full px-2.5 py-1 bg-white/5 mb-4">
          <svg class="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Newsletter</span>
        </div>

        <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-4" style="letter-spacing:-0.02em">
          Stay Updated with New Apps
        </h2>
        <p class="text-slate-400 mb-8 max-w-2xl mx-auto">
          Get weekly updates on new GoHighLevel apps, integration guides, and exclusive deals delivered to your inbox.
        </p>

        <form @submit.prevent="handleSubmit" class="max-w-md mx-auto">
          <div class="flex flex-col sm:flex-row gap-2">
            <input
              v-model="email"
              type="email"
              placeholder="you@agency.com"
              required
              class="input-field flex-1 h-10"
            />
            <button
              type="submit"
              class="h-10 px-6 rounded-md bg-primary-500/90 hover:bg-primary-400 text-white transition ring-1 ring-primary-400/30 font-medium whitespace-nowrap"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
            </button>
          </div>
          <p v-if="submitted" class="mt-3 text-sm text-emerald-300 inline-flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Thanks for subscribing!
          </p>
          <p class="mt-2 text-xs text-slate-500">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const email = ref('')
const isSubmitting = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  submitted.value = true
  email.value = ''
  isSubmitting.value = false

  setTimeout(() => {
    submitted.value = false
  }, 5000)
}
</script>

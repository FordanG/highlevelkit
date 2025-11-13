<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          Newsletter
        </h1>
        <p class="text-slate-300">
          Get weekly updates on new apps and GoHighLevel tips
        </p>
      </div>
    </div>

    <!-- Newsletter Form -->
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="card p-8">
        <div class="text-center mb-8">
          <div class="text-5xl mb-4">📧</div>
          <h2 class="text-2xl font-semibold text-white mb-2">
            Stay in the Loop
          </h2>
          <p class="text-slate-300">
            Join our newsletter to receive updates on new apps, features, and GoHighLevel tips.
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Email Address *
            </label>
            <input
              v-model="email"
              type="email"
              required
              class="input-field"
              placeholder="your@email.com"
            />
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn-primary w-full"
            >
              {{ isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter' }}
            </button>
          </div>

          <p v-if="submitted" class="text-center text-green-400">
            ✓ Thank you for subscribing! Check your email for confirmation.
          </p>
        </form>

        <p class="text-xs text-slate-400 text-center mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const isSubmitting = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  submitted.value = true
  isSubmitting.value = false
  email.value = ''

  setTimeout(() => {
    submitted.value = false
  }, 5000)
}

useHead({
  title: 'Newsletter - Highlevel Kit',
  meta: [
    {
      name: 'description',
      content: 'Subscribe to the Highlevel Kit newsletter for weekly updates on new apps, features, and GoHighLevel tips.'
    }
  ]
})
</script>

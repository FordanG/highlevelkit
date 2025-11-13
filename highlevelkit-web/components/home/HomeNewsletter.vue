<template>
  <section class="py-16 bg-white dark:bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="card p-8 md:p-12 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Stay Updated with New Apps
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Get weekly updates on new GoHighLevel apps, integration guides, and exclusive deals delivered to your inbox.
        </p>
        <form @submit.prevent="handleSubmit" class="max-w-md mx-auto">
          <div class="flex flex-col sm:flex-row gap-3">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
              class="input-field flex-1"
            />
            <button
              type="submit"
              class="btn-primary whitespace-nowrap"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
            </button>
          </div>
          <p v-if="submitted" class="mt-3 text-sm text-green-600 dark:text-green-400">
            ✓ Thanks for subscribing!
          </p>
          <p class="mt-3 text-xs text-gray-500 dark:text-gray-400">
            We respect your privacy. Unsubscribe at any time.
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

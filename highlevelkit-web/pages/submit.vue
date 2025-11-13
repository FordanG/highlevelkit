<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Submit Your App
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Get your GoHighLevel app featured on Highlevel Kit
        </p>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="card p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- App Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              App Name *
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="input-field"
              placeholder="Your awesome app"
            />
          </div>

          <!-- Tagline -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tagline *
            </label>
            <input
              v-model="form.tagline"
              type="text"
              required
              class="input-field"
              placeholder="A brief description of what your app does"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              v-model="form.description"
              required
              rows="4"
              class="input-field"
              placeholder="Detailed description of your app's features and benefits"
            ></textarea>
          </div>

          <!-- Website URL -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website URL *
            </label>
            <input
              v-model="form.website"
              type="url"
              required
              class="input-field"
              placeholder="https://yourapp.com"
            />
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Category *
            </label>
            <select v-model="form.category" required class="input-field">
              <option value="">Select a category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.icon }} {{ cat.name }}
              </option>
            </select>
          </div>

          <!-- Pricing -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pricing Model *
            </label>
            <select v-model="form.pricingModel" required class="input-field">
              <option value="">Select pricing model</option>
              <option value="free">Free</option>
              <option value="freemium">Freemium</option>
              <option value="paid">Paid</option>
              <option value="one-time">One-time Payment</option>
            </select>
          </div>

          <!-- Contact Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contact Email *
            </label>
            <input
              v-model="form.email"
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
              {{ isSubmitting ? 'Submitting...' : 'Submit App for Review' }}
            </button>
          </div>

          <p v-if="submitted" class="text-center text-green-600 dark:text-green-400">
            ✓ Thank you! We'll review your submission and get back to you soon.
          </p>
        </form>
      </div>

      <!-- Why Submit Section -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="text-4xl mb-3">🎯</div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-2">Targeted Exposure</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Reach thousands of GoHighLevel users actively looking for solutions
          </p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-3">📈</div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-2">Increase Signups</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Get qualified leads from agencies and entrepreneurs
          </p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-3">⭐</div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-2">Build Credibility</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Collect reviews and testimonials from real users
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import categoriesData from '~/data/categories.json'

const categories = categoriesData

const form = reactive({
  name: '',
  tagline: '',
  description: '',
  website: '',
  category: '',
  pricingModel: '',
  email: ''
})

const isSubmitting = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  submitted.value = true
  isSubmitting.value = false

  // Reset form
  Object.keys(form).forEach(key => {
    form[key as keyof typeof form] = ''
  })

  setTimeout(() => {
    submitted.value = false
  }, 5000)
}

useHead({
  title: 'Submit Your App - Highlevel Kit',
  meta: [
    {
      name: 'description',
      content: 'Submit your GoHighLevel app to be featured on Highlevel Kit and reach thousands of potential users.'
    }
  ]
})
</script>

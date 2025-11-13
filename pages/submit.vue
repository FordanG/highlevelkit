<template>
  <div class="min-h-screen">
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          Submit Your App
        </h1>
        <p class="text-slate-300">
          Get your GoHighLevel app featured on Highlevel Kit
        </p>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="card p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- App Name -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              App Name *
            </label>
            <InputText
              v-model="form.name"
              type="text"
              required
              placeholder="Your awesome app"
            />
          </div>

          <!-- Tagline -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Tagline *
            </label>
            <InputText
              v-model="form.tagline"
              type="text"
              required
              placeholder="A brief description of what your app does"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Description *
            </label>
            <Textarea
              v-model="form.description"
              required
              rows="4"
              placeholder="Detailed description of your app's features and benefits"
            />
          </div>

          <!-- Website URL -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Website URL *
            </label>
            <InputText
              v-model="form.website"
              type="url"
              required
              placeholder="https://yourapp.com"
            />
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Primary Category *
            </label>
            <Select
              v-model="form.category"
              :options="categoryOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select a category"
              required
            />
          </div>

          <!-- Pricing -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Pricing Model *
            </label>
            <Select
              v-model="form.pricingModel"
              :options="pricingOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select pricing model"
              required
            />
          </div>

          <!-- Contact Email -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Contact Email *
            </label>
            <InputText
              v-model="form.email"
              type="email"
              required
              placeholder="your@email.com"
            />
          </div>

          <!-- Submit Button -->
          <div>
            <Button
              type="submit"
              :disabled="isSubmitting"
              :label="isSubmitting ? 'Submitting...' : 'Submit App for Review'"
              class="w-full"
            />
          </div>

          <p v-if="submitted" class="text-center text-green-400">
            ✓ Thank you! We'll review your submission and get back to you soon.
          </p>
        </form>
      </div>

      <!-- Why Submit Section -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="text-4xl mb-3">🎯</div>
          <h3 class="font-bold text-white mb-2">Targeted Exposure</h3>
          <p class="text-sm text-slate-300">
            Reach thousands of GoHighLevel users actively looking for solutions
          </p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-3">📈</div>
          <h3 class="font-bold text-white mb-2">Increase Signups</h3>
          <p class="text-sm text-slate-300">
            Get qualified leads from agencies and entrepreneurs
          </p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-3">⭐</div>
          <h3 class="font-bold text-white mb-2">Build Credibility</h3>
          <p class="text-sm text-slate-300">
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

const categoryOptions = categories.map(cat => ({
  label: `${cat.icon} ${cat.name}`,
  value: cat.id
}))

const pricingOptions = [
  { label: 'Free', value: 'free' },
  { label: 'Freemium', value: 'freemium' },
  { label: 'Paid', value: 'paid' },
  { label: 'One-time Payment', value: 'one-time' }
]

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

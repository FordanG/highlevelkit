<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          Contact Us
        </h1>
        <p class="text-slate-300">
          Have questions? We'd love to hear from you
        </p>
      </div>
    </div>

    <!-- Contact Form -->
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="card p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Name *
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="input-field"
              placeholder="Your name"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Email *
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="input-field"
              placeholder="your@email.com"
            />
          </div>

          <!-- Subject -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Subject *
            </label>
            <input
              v-model="form.subject"
              type="text"
              required
              class="input-field"
              placeholder="What's this about?"
            />
          </div>

          <!-- Message -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Message *
            </label>
            <textarea
              v-model="form.message"
              required
              rows="6"
              class="input-field"
              placeholder="Tell us what you're thinking..."
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn-primary w-full"
            >
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </div>

          <p v-if="submitted" class="text-center text-green-400">
            ✓ Thank you! We'll get back to you soon.
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
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
  title: 'Contact Us - Highlevel Kit',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with the Highlevel Kit team. We\'re here to help with questions, feedback, and support.'
    }
  ]
})
</script>

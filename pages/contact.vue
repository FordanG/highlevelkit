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
            <InputText
              v-model="form.name"
              type="text"
              required
              placeholder="Your name"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Email *
            </label>
            <InputText
              v-model="form.email"
              type="email"
              required
              placeholder="your@email.com"
            />
          </div>

          <!-- Subject -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Subject *
            </label>
            <InputText
              v-model="form.subject"
              type="text"
              required
              placeholder="What's this about?"
            />
          </div>

          <!-- Message -->
          <div>
            <label class="block text-sm font-medium text-slate-200 mb-2">
              Message *
            </label>
            <Textarea
              v-model="form.message"
              required
              rows="6"
              placeholder="Tell us what you're thinking..."
            />
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 disabled:from-primary-700 disabled:to-primary-600 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-200"
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

// SEO Configuration
const { setPageMeta, generateContactPageSchema, generateBreadcrumbSchema, setMultipleSchemas, siteUrl } = useSEO()

setPageMeta({
  title: 'Contact Us - Highlevel Kit | Get Support & Help',
  description: 'Get in touch with the Highlevel Kit team. We\'re here to help with questions, feedback, app submissions, and support for GoHighLevel users.',
  url: `${siteUrl}/contact`,
  tags: ['contact', 'support', 'help', 'GoHighLevel', 'Highlevel Kit'],
})

setMultipleSchemas([
  generateContactPageSchema(),
  generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]),
])
</script>

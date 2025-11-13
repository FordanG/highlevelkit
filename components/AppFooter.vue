<template>
  <footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1">
          <div class="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-4">
            Highlevel Kit
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            The ultimate directory for GoHighLevel apps, integrations, and tools.
          </p>
        </div>

        <!-- Product -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Product</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/apps" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Browse Apps
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/categories" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Categories
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/new" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                New Releases
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/trending" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Trending
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Resources</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/blog" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/guides" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Integration Guides
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/newsletter" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Newsletter
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/community" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Community
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Company</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/about" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                About
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/submit" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Submit an App
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p class="text-center text-gray-600 dark:text-gray-400 text-sm">
          © {{ currentYear }} Highlevel Kit. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

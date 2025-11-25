<template>
  <footer class="border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1">
          <div class="inline-flex items-center gap-2 mb-4">
            <div class="h-7 w-7 rounded-md bg-primary-500/10 ring-1 ring-primary-500/30 grid place-items-center">
              <span class="text-primary-400 text-[11px] font-semibold tracking-tight" style="letter-spacing:-0.02em">HK</span>
            </div>
            <span class="text-lg font-semibold tracking-tight text-white" style="letter-spacing:-0.02em">Highlevel Kit</span>
          </div>
          <p class="text-slate-400 text-sm">
            The ultimate directory for GoHighLevel apps, integrations, and tools.
          </p>
        </div>

        <!-- Product -->
        <div>
          <h3 class="font-semibold text-white mb-4 text-sm">Product</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/apps" class="text-slate-400 hover:text-white text-sm transition-colors">
                Browse Apps
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/categories" class="text-slate-400 hover:text-white text-sm transition-colors">
                Categories
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/new" class="text-slate-400 hover:text-white text-sm transition-colors">
                New Releases
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/trending" class="text-slate-400 hover:text-white text-sm transition-colors">
                Trending
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="font-semibold text-white mb-4 text-sm">Resources</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/blog" class="text-slate-400 hover:text-white text-sm transition-colors">
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/guides" class="text-slate-400 hover:text-white text-sm transition-colors">
                Integration Guides
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/newsletter" class="text-slate-400 hover:text-white text-sm transition-colors">
                Newsletter
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/community" class="text-slate-400 hover:text-white text-sm transition-colors">
                Community
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="font-semibold text-white mb-4 text-sm">Company</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/about" class="text-slate-400 hover:text-white text-sm transition-colors">
                About
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/submit" class="text-slate-400 hover:text-white text-sm transition-colors">
                Submit an App
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-slate-400 hover:text-white text-sm transition-colors">
                Contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy" class="text-slate-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </NuxtLink>
            </li>
            <li>
              <a href="https://flowkit.directory" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1">
                FlowKit.Directory
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://ghlutils.com" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1">
                GHLUtils.com
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-white/5">
        <p class="text-center text-slate-400 text-sm">
          © {{ currentYear }} Highlevel Kit. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

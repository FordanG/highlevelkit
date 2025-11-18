// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    hostname: 'https://highlevelkit.com',
    gzip: true,
    routes: async () => {
      // Import apps data to generate dynamic routes
      const apps = await import('./data/apps.json').then(m => m.default)
      return apps.map((app: any) => ({
        url: `/apps/${app.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString()
      }))
    },
    defaults: {
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }
  },

  primevue: {
    options: {
      theme: {
        preset: {
          semantic: {
            primary: {
              50: '{blue.50}',
              100: '{blue.100}',
              200: '{blue.200}',
              300: '{blue.300}',
              400: '{blue.400}',
              500: '{blue.500}',
              600: '{blue.600}',
              700: '{blue.700}',
              800: '{blue.800}',
              900: '{blue.900}',
              950: '{blue.950}'
            },
            colorScheme: {
              dark: {
                primary: {
                  color: '{blue.400}',
                  inverseColor: '#ffffff',
                  hoverColor: '{blue.300}',
                  activeColor: '{blue.500}'
                },
                surface: {
                  0: '#ffffff',
                  50: '{slate.50}',
                  100: '{slate.100}',
                  200: '{slate.200}',
                  300: '{slate.300}',
                  400: '{slate.400}',
                  500: '{slate.500}',
                  600: '{slate.600}',
                  700: '{slate.700}',
                  800: '{slate.800}',
                  900: '{slate.900}',
                  950: '{slate.950}'
                }
              }
            }
          }
        }
      },
      ripple: true
    }
  },

  nitro: {
    prerender: {
      failOnError: false
    }
  },

  app: {
    head: {
      title: 'Highlevel Kit - Discover the Best GoHighLevel Apps & Integrations',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'The ultimate directory for GoHighLevel apps, integrations, and tools. Find curated solutions for agencies, SaaS providers, and freelancers.'
        },
        // Theme color for mobile browsers
        { name: 'theme-color', content: '#0a1628' },
        // MS Application tiles
        { name: 'msapplication-TileColor', content: '#0a1628' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Preconnect to Google Fonts for better performance
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        // DNS prefetch for external domains
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }
      ],
      // Preload critical fonts
      __dangerouslyDisableSanitizersByTagID: {
        'font-inter': ['innerHTML']
      }
    }
  }
})

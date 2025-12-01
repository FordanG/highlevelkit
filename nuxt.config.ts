import Aura from '@primevue/themes/aura'

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
    autoImport: true,
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.p-dark',
          cssLayer: false
        }
      },
      ripple: true
    }
  },

  css: [
    'primeicons/primeicons.css',
    '~/assets/css/main.css'
  ],

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
        { name: 'msapplication-TileColor', content: '#0a1628' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'HighLevel Kit' },
        { property: 'og:image', content: 'https://highlevelkit.com/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://highlevelkit.com/og-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // Preconnect to Google Fonts for better performance
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        // DNS prefetch for external domains
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }
      ],
      script: [
        // Google Analytics
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-M2B2K2THNQ',
          async: true
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-M2B2K2THNQ');`
        }
      ],
      // Preload critical fonts
      __dangerouslyDisableSanitizersByTagID: {
        'font-inter': ['innerHTML'],
        'gtag-inline': ['innerHTML']
      }
    }
  }
})

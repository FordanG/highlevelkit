import Aura from '@primevue/themes/aura'
import apps from './data/apps.json'
import categories from './data/categories.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/sitemap',
    '@nuxt/image'
  ],

  site: { url: 'https://highlevelkit.com', name: 'HighLevelKit' },

  image: {
    format: ['webp', 'png', 'jpg'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    presets: {
      appCard: {
        modifiers: {
          format: 'webp',
          width: 640,
          height: 360,
          quality: 80,
        },
      },
      appLogo: {
        modifiers: {
          format: 'webp',
          width: 128,
          height: 128,
          quality: 90,
        },
      },
      appLogoSmall: {
        modifiers: {
          format: 'webp',
          width: 48,
          height: 48,
          quality: 90,
        },
      },
    },
  },

  sitemap: {
    autoI18n: false,
    discoverImages: false,
    exclude: ['/404', '/200', '/compare', '/newsletter', '/submit', '/community', '/blog'],
    urls: apps.map(app => ({
      loc: `/apps/${app.slug}`,
      images: app.image ? [{ loc: `https://highlevelkit.com${app.image}` }] : [],
    })),
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
      failOnError: true,
      ignore: ['/api/search'],
      routes: ['/sitemap.xml', ...apps.map(app => `/apps/${app.slug}`), ...categories.filter(cat => apps.some(app => app.category.includes(cat.id))).map(cat => `/guides/category/${cat.id}`)]
    }
  },

  app: {
    head: {
      title: 'Highlevel Kit - Discover the Best GoHighLevel Apps & Integrations',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'format-detection', content: 'telephone=no' },
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
        { rel: 'alternate', type: 'application/json', title: 'HighLevelKit catalog', href: '/catalog.json' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // Preconnect to Google Fonts for better performance
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        // DNS prefetch for external domains
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
        { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
        // Preload critical Inter font weight (400 - most used)
        {
          rel: 'preload',
          href: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        // Non-blocking font stylesheet load
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
          media: 'print',
          onload: "this.media='all'"
        },
        // Prefetch likely navigation targets
        { rel: 'prefetch', href: '/apps' }
      ],
      // Fallback for no-JS browsers
      noscript: [
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap">'
      ],
      script: [
        // Google Analytics - deferred for better performance
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-M2B2K2THNQ',
          async: true,
          defer: true,
          tagPosition: 'bodyClose'
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-M2B2K2THNQ');`,
          tagPosition: 'bodyClose'
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

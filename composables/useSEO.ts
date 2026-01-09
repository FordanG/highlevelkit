/**
 * SEO Composable for managing meta tags, Open Graph, and structured data
 * Provides comprehensive SEO functionality including:
 * - Meta tags and Open Graph
 * - JSON-LD structured data (Organization, WebSite, SoftwareApplication, etc.)
 * - Breadcrumbs, FAQs, ItemLists, and more
 */

interface SEOConfig {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  noindex?: boolean
}

interface AppSEO {
  name: string
  description: string
  image?: string
  logo?: string
  rating?: number
  reviewCount?: number
  pricing?: {
    model: string
    startingPrice?: number
    currency: string
  }
  category?: string[]
  slug: string
  features?: string[]
  website?: string
}

interface FAQItem {
  question: string
  answer: string
}

interface ItemListItem {
  name: string
  url: string
  image?: string
  description?: string
  position?: number
}

interface VideoSEO {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string
  contentUrl?: string
  embedUrl?: string
}

// Supported locales for international SEO
const SUPPORTED_LOCALES = [
  { code: 'en', iso: 'en-US', name: 'English' },
  { code: 'es', iso: 'es-ES', name: 'Español' },
  { code: 'de', iso: 'de-DE', name: 'Deutsch' },
  { code: 'fr', iso: 'fr-FR', name: 'Français' },
  { code: 'pt', iso: 'pt-BR', name: 'Português' },
]

export const useSEO = () => {
  const route = useRoute()

  // Base site URL
  const siteUrl = 'https://highlevelkit.com'
  const siteName = 'Highlevel Kit'
  const defaultImage = `${siteUrl}/og-image.png`

  /**
   * Generate comprehensive meta tags for a page
   */
  const setPageMeta = (seo: SEOConfig) => {
    const canonicalUrl = seo.url || `${siteUrl}${route.path}`
    const ogImage = seo.image || defaultImage
    const pageType = seo.type || 'website'

    const metaTags: any[] = [
      // Basic meta tags
      { name: 'description', content: seo.description },
      { name: 'author', content: seo.author || 'Highlevel Kit' },

      // Open Graph
      { property: 'og:site_name', content: siteName },
      { property: 'og:type', content: pageType },
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:locale', content: 'en_US' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seo.title },
      { name: 'twitter:description', content: seo.description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:site', content: '@highlevelkit' },

      // Additional meta tags
      ...(seo.tags ? [{ name: 'keywords', content: seo.tags.join(', ') }] : []),
      ...(seo.publishedTime ? [{ property: 'article:published_time', content: seo.publishedTime }] : []),
      ...(seo.modifiedTime ? [{ property: 'article:modified_time', content: seo.modifiedTime }] : []),
    ]

    // Add noindex if specified
    if (seo.noindex) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' })
    }

    useHead({
      title: seo.title,
      meta: metaTags,
      link: [
        { rel: 'canonical', href: canonicalUrl },
      ],
    })
  }

  /**
   * Generate structured data (JSON-LD) for organization
   */
  const generateOrganizationSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      description: 'The ultimate directory for GoHighLevel apps, integrations, and tools. Find curated solutions for agencies, SaaS providers, and freelancers.',
      sameAs: [
        'https://twitter.com/highlevelkit',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        email: 'support@highlevelkit.com',
      },
    }
  }

  /**
   * Generate structured data for an app/software application
   */
  const generateAppSchema = (app: AppSEO) => {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: app.name,
      description: app.description,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: app.pricing?.model === 'free' ? '0' : app.pricing?.startingPrice?.toString() || '0',
        priceCurrency: app.pricing?.currency || 'USD',
        availability: 'https://schema.org/InStock',
      },
      url: `${siteUrl}/apps/${app.slug}`,
    }

    // Add logo if available
    if (app.image || app.logo) {
      schema.image = app.image || app.logo
    }

    // Add aggregate rating if available
    if (app.rating && app.reviewCount) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: app.rating.toString(),
        reviewCount: app.reviewCount.toString(),
        bestRating: '5',
        worstRating: '1',
      }
    }

    // Add features if available
    if (app.features && app.features.length > 0) {
      schema.featureList = app.features.join(', ')
    }

    return schema
  }

  /**
   * Generate breadcrumb structured data
   */
  const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
      })),
    }
  }

  /**
   * Generate WebSite schema with search action
   */
  const generateWebsiteSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      description: 'The ultimate directory for GoHighLevel apps, integrations, and tools.',
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/apps?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }
  }

  /**
   * Generate FAQ Page structured data
   */
  const generateFAQSchema = (faqs: FAQItem[]) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }
  }

  /**
   * Generate ItemList structured data (for product collections, listings)
   */
  const generateItemListSchema = (items: ItemListItem[], listName: string) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: listName,
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: item.position || index + 1,
        name: item.name,
        url: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
        ...(item.image && { image: item.image }),
        ...(item.description && { description: item.description }),
      })),
    }
  }

  /**
   * Generate CollectionPage structured data (for category/collection pages)
   */
  const generateCollectionPageSchema = (
    name: string,
    description: string,
    url: string,
    items?: ItemListItem[]
  ) => {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name,
      description,
      url: url.startsWith('http') ? url : `${siteUrl}${url}`,
      isPartOf: {
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
      },
    }

    if (items && items.length > 0) {
      schema.mainEntity = {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
          name: item.name,
        })),
      }
    }

    return schema
  }

  /**
   * Generate WebPage structured data
   */
  const generateWebPageSchema = (
    name: string,
    description: string,
    url: string,
    datePublished?: string,
    dateModified?: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name,
      description,
      url: url.startsWith('http') ? url : `${siteUrl}${url}`,
      isPartOf: {
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
      },
      ...(datePublished && { datePublished }),
      ...(dateModified && { dateModified }),
    }
  }

  /**
   * Generate AboutPage structured data
   */
  const generateAboutPageSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: `About ${siteName}`,
      description: 'Learn about Highlevel Kit, your trusted directory for discovering the best GoHighLevel apps and integrations.',
      url: `${siteUrl}/about`,
      isPartOf: {
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
      },
      mainEntity: {
        '@type': 'Organization',
        name: siteName,
        url: siteUrl,
        description: 'The ultimate directory for GoHighLevel apps, integrations, and tools.',
      },
    }
  }

  /**
   * Generate ContactPage structured data
   */
  const generateContactPageSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: `Contact ${siteName}`,
      description: 'Get in touch with the Highlevel Kit team for questions, feedback, and support.',
      url: `${siteUrl}/contact`,
      isPartOf: {
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
      },
      mainEntity: {
        '@type': 'Organization',
        name: siteName,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          email: 'support@highlevelkit.com',
        },
      },
    }
  }

  /**
   * Generate Article structured data (for blog posts, guides)
   */
  const generateArticleSchema = (
    headline: string,
    description: string,
    url: string,
    image: string,
    datePublished: string,
    dateModified?: string,
    author?: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline,
      description,
      url: url.startsWith('http') ? url : `${siteUrl}${url}`,
      image,
      datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Organization',
        name: author || siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
      },
    }
  }

  /**
   * Generate HowTo structured data (for guides)
   */
  const generateHowToSchema = (
    name: string,
    description: string,
    steps: Array<{ name: string; text: string; url?: string; image?: string }>
  ) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name,
      description,
      step: steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        ...(step.url && { url: step.url.startsWith('http') ? step.url : `${siteUrl}${step.url}` }),
        ...(step.image && { image: step.image }),
      })),
    }
  }

  /**
   * Generate Product schema with AggregateOffer (better for ecommerce/marketplace SEO)
   */
  const generateProductSchema = (app: AppSEO) => {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: app.name,
      description: app.description,
      image: app.image || app.logo,
      brand: {
        '@type': 'Brand',
        name: app.name,
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: app.pricing?.currency || 'USD',
        lowPrice: app.pricing?.model === 'free' ? '0' : app.pricing?.startingPrice?.toString() || '0',
        offerCount: 1,
        availability: 'https://schema.org/InStock',
      },
      url: `${siteUrl}/apps/${app.slug}`,
    }

    // Add aggregate rating if available
    if (app.rating && app.reviewCount) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: app.rating.toString(),
        reviewCount: app.reviewCount.toString(),
        bestRating: '5',
        worstRating: '1',
      }
    }

    // Add category if available
    if (app.category && app.category.length > 0) {
      schema.category = app.category.join(', ')
    }

    return schema
  }

  /**
   * Generate VideoObject schema for app demos and tutorials
   */
  const generateVideoSchema = (video: VideoSEO) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.name,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      uploadDate: video.uploadDate,
      duration: video.duration || 'PT2M',
      ...(video.contentUrl && { contentUrl: video.contentUrl }),
      ...(video.embedUrl && { embedUrl: video.embedUrl }),
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
      },
    }
  }

  /**
   * Generate enhanced WebSite schema with sitelinks search box
   */
  const generateEnhancedWebsiteSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      description: 'The ultimate directory for GoHighLevel apps, integrations, and tools. Find curated solutions for agencies, SaaS providers, and freelancers.',
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
          width: 512,
          height: 512,
        },
      },
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/apps?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      ],
      // Sitelinks for better search appearance
      hasPart: [
        { '@type': 'WebPage', name: 'Apps', url: `${siteUrl}/apps` },
        { '@type': 'WebPage', name: 'Categories', url: `${siteUrl}/categories` },
        { '@type': 'WebPage', name: 'New Releases', url: `${siteUrl}/new` },
        { '@type': 'WebPage', name: 'Trending', url: `${siteUrl}/trending` },
        { '@type': 'WebPage', name: 'AI Tools', url: `${siteUrl}/ai-tools` },
      ],
    }
  }

  /**
   * Generate hreflang tags for international pages
   */
  const generateHreflangTags = (path: string) => {
    const links = SUPPORTED_LOCALES.map(locale => ({
      rel: 'alternate',
      hreflang: locale.iso,
      href: locale.code === 'en'
        ? `${siteUrl}${path}`
        : `${siteUrl}/${locale.code}${path}`,
    }))

    // Add x-default for search engines
    links.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${siteUrl}${path}`,
    })

    return links
  }

  /**
   * Set page meta with hreflang support for international SEO
   */
  const setPageMetaWithHreflang = (seo: SEOConfig, enableHreflang = false) => {
    const canonicalUrl = seo.url || `${siteUrl}${route.path}`
    const ogImage = seo.image || defaultImage
    const pageType = seo.type || 'website'

    const metaTags: any[] = [
      // Basic meta tags
      { name: 'description', content: seo.description },
      { name: 'author', content: seo.author || 'Highlevel Kit' },

      // Open Graph
      { property: 'og:site_name', content: siteName },
      { property: 'og:type', content: pageType },
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: seo.title },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:locale', content: 'en_US' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seo.title },
      { name: 'twitter:description', content: seo.description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:site', content: '@highlevelkit' },

      // Additional meta tags for social/sharing
      { name: 'pinterest-rich-pin', content: 'true' },

      // Additional meta tags
      ...(seo.tags ? [{ name: 'keywords', content: seo.tags.join(', ') }] : []),
      ...(seo.publishedTime ? [{ property: 'article:published_time', content: seo.publishedTime }] : []),
      ...(seo.modifiedTime ? [{ property: 'article:modified_time', content: seo.modifiedTime }] : []),
    ]

    // Add noindex if specified
    if (seo.noindex) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' })
    }

    // Build link tags
    const linkTags: any[] = [
      { rel: 'canonical', href: canonicalUrl },
    ]

    // Add hreflang tags if enabled
    if (enableHreflang) {
      const hreflangLinks = generateHreflangTags(route.path)
      linkTags.push(...hreflangLinks)
    }

    useHead({
      title: seo.title,
      meta: metaTags,
      link: linkTags,
    })
  }

  /**
   * Insert structured data into the page
   */
  const setStructuredData = (schema: any) => {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(schema),
        },
      ],
    })
  }

  /**
   * Insert multiple structured data schemas
   */
  const setMultipleSchemas = (schemas: any[]) => {
    useHead({
      script: schemas.map(schema => ({
        type: 'application/ld+json',
        children: JSON.stringify(schema),
      })),
    })
  }

  return {
    setPageMeta,
    setPageMetaWithHreflang,
    generateOrganizationSchema,
    generateAppSchema,
    generateProductSchema,
    generateVideoSchema,
    generateBreadcrumbSchema,
    generateWebsiteSchema,
    generateEnhancedWebsiteSchema,
    generateFAQSchema,
    generateItemListSchema,
    generateCollectionPageSchema,
    generateWebPageSchema,
    generateAboutPageSchema,
    generateContactPageSchema,
    generateArticleSchema,
    generateHowToSchema,
    generateHreflangTags,
    setStructuredData,
    setMultipleSchemas,
    siteUrl,
    siteName,
    SUPPORTED_LOCALES,
  }
}

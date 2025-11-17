/**
 * SEO Composable for managing meta tags, Open Graph, and structured data
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
}

export const useSEO = () => {
  const config = useRuntimeConfig()
  const route = useRoute()

  // Base site URL
  const siteUrl = 'https://highlevelkit.com' // TODO: Move to env variable
  const siteName = 'Highlevel Kit'
  const defaultImage = `${siteUrl}/og-default.png`

  /**
   * Generate comprehensive meta tags for a page
   */
  const setPageMeta = (seo: SEOConfig) => {
    const canonicalUrl = seo.url || `${siteUrl}${route.path}`
    const ogImage = seo.image || defaultImage
    const pageType = seo.type || 'website'

    useHead({
      title: seo.title,
      meta: [
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
        { name: 'twitter:site', content: '@highlevelkit' }, // TODO: Update with actual Twitter handle

        // Additional meta tags
        ...(seo.tags ? seo.tags.map(tag => ({ name: 'keywords', content: tag })) : []),
        ...(seo.publishedTime ? [{ property: 'article:published_time', content: seo.publishedTime }] : []),
        ...(seo.modifiedTime ? [{ property: 'article:modified_time', content: seo.modifiedTime }] : []),
      ],
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
        // TODO: Add social media URLs
        // 'https://twitter.com/highlevelkit',
        // 'https://facebook.com/highlevelkit',
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
        item: `${siteUrl}${item.url}`,
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
    generateOrganizationSchema,
    generateAppSchema,
    generateBreadcrumbSchema,
    generateWebsiteSchema,
    setStructuredData,
    setMultipleSchemas,
    siteUrl,
    siteName,
  }
}

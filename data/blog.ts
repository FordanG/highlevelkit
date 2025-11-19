// Blog Post Types and Data for HighLevelKit
// Following ColdIQ's proven SEO content strategy

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string // Full markdown content
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  publishedAt: string // ISO date
  updatedAt?: string // ISO date
  category: BlogCategory
  tags: string[]
  featuredImage?: string
  readTime: number // minutes
  featured?: boolean
  seoKeywords: string[] // Target keywords for SEO
  relatedTools?: string[] // IDs of related apps
  relatedPosts?: string[] // IDs of related blog posts
}

export type BlogCategory =
  // ColdIQ-style categories
  | 'best-tools' // "Best X Tools in 2025"
  | 'comparisons' // "Tool A vs Tool B"
  | 'guides' // "How to" strategy guides
  | 'case-studies' // Success stories
  | 'integration-tutorials' // GHL integration guides
  | 'industry-news' // Latest updates
  | 'ghl-tips' // GoHighLevel tips and tricks
  | 'automation' // Automation strategies
  | 'agency-growth' // Agency scaling content

export const blogCategories: {
  id: BlogCategory
  name: string
  description: string
  slug: string
}[] = [
  {
    id: 'best-tools',
    name: 'Best Tools',
    description: 'Curated lists of the best tools for specific use cases',
    slug: 'best-tools'
  },
  {
    id: 'comparisons',
    name: 'Tool Comparisons',
    description: 'Side-by-side comparisons to help you choose the right tool',
    slug: 'comparisons'
  },
  {
    id: 'guides',
    name: 'Guides & Tutorials',
    description: 'Step-by-step guides to accomplish your goals',
    slug: 'guides'
  },
  {
    id: 'case-studies',
    name: 'Case Studies',
    description: 'Real-world success stories and results',
    slug: 'case-studies'
  },
  {
    id: 'integration-tutorials',
    name: 'Integration Tutorials',
    description: 'Learn how to integrate tools with GoHighLevel',
    slug: 'integration-tutorials'
  },
  {
    id: 'industry-news',
    name: 'Industry News',
    description: 'Latest updates in the GoHighLevel ecosystem',
    slug: 'industry-news'
  },
  {
    id: 'ghl-tips',
    name: 'GHL Tips',
    description: 'Tips and tricks for GoHighLevel users',
    slug: 'ghl-tips'
  },
  {
    id: 'automation',
    name: 'Automation',
    description: 'Automation strategies and workflows',
    slug: 'automation'
  },
  {
    id: 'agency-growth',
    name: 'Agency Growth',
    description: 'Scale your agency with proven strategies',
    slug: 'agency-growth'
  }
]

export const getBlogCategoryName = (categoryId: BlogCategory): string => {
  return blogCategories.find(c => c.id === categoryId)?.name || categoryId
}

export const getBlogCategorySlug = (categoryId: BlogCategory): string => {
  return blogCategories.find(c => c.id === categoryId)?.slug || categoryId
}

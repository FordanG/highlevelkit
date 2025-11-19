<template>
  <div class="min-h-screen">
    <div v-if="post" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumbs -->
      <Breadcrumbs :items="breadcrumbItems" class="mb-6" />

      <!-- Article Header -->
      <article class="prose prose-invert prose-lg max-w-none">
        <!-- Category Badge -->
        <div class="flex items-center gap-2 mb-4">
          <Tag :value="getBlogCategoryName(post.category)" severity="secondary" />
          <span class="text-slate-400">•</span>
          <span class="text-slate-400">{{ post.readTime }} min read</span>
        </div>

        <!-- Title -->
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          {{ post.title }}
        </h1>

        <!-- Meta Info -->
        <div class="flex items-center gap-4 text-slate-400 mb-8 not-prose">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
              {{ post.author.name.charAt(0) }}
            </div>
            <div>
              <div class="text-white font-medium">{{ post.author.name }}</div>
              <div class="text-sm">{{ formatDate(post.publishedAt) }}</div>
            </div>
          </div>
        </div>

        <!-- Featured Image Placeholder -->
        <div class="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-8xl mb-8 not-prose">
          {{ getCategoryIcon(post.category) }}
        </div>

        <!-- Excerpt -->
        <p class="text-xl text-slate-300 font-medium border-l-4 border-purple-500 pl-4 mb-8">
          {{ post.excerpt }}
        </p>

        <!-- Article Content (Markdown) -->
        <div class="article-content" v-html="renderedContent"></div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10 not-prose">
          <Tag v-for="tag in post.tags" :key="tag" :value="`#${tag}`" severity="info" />
        </div>
      </article>

      <!-- Related Tools -->
      <div v-if="relatedTools.length > 0" class="mt-16 pt-8 border-t border-white/10">
        <h2 class="text-2xl font-bold text-white mb-6">Tools Mentioned in This Article</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            v-for="tool in relatedTools"
            :key="tool.id"
            :to="`/apps/${tool.slug}`"
            class="group"
          >
            <Card class="h-full hover:shadow-xl transition-shadow">
              <template #title>
                <div class="flex items-center gap-3">
                  <div class="text-3xl">{{ tool.logo }}</div>
                  <span class="group-hover:text-purple-400 transition-colors">{{ tool.name }}</span>
                </div>
              </template>
              <template #content>
                <p class="text-slate-300 text-sm">{{ tool.tagline }}</p>
                <div class="flex items-center gap-2 mt-4">
                  <span class="text-yellow-500">⭐</span>
                  <span class="text-white font-semibold">{{ tool.rating }}</span>
                  <span class="text-slate-400 text-sm">({{ tool.reviewCount }} reviews)</span>
                </div>
              </template>
            </Card>
          </NuxtLink>
        </div>
      </div>

      <!-- Related Posts -->
      <div v-if="relatedPosts.length > 0" class="mt-16 pt-8 border-t border-white/10">
        <h2 class="text-2xl font-bold text-white mb-6">Related Articles</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NuxtLink
            v-for="relatedPost in relatedPosts"
            :key="relatedPost.id"
            :to="`/blog/${relatedPost.slug}`"
            class="group"
          >
            <Card class="h-full hover:shadow-xl transition-shadow">
              <template #header>
                <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-5xl">
                  {{ getCategoryIcon(relatedPost.category) }}
                </div>
              </template>
              <template #title>
                <span class="group-hover:text-purple-400 transition-colors">
                  {{ relatedPost.title }}
                </span>
              </template>
              <template #subtitle>
                <div class="flex items-center gap-2 text-sm text-slate-400 mt-2">
                  <span>{{ formatDate(relatedPost.publishedAt) }}</span>
                  <span>•</span>
                  <span>{{ relatedPost.readTime }} min read</span>
                </div>
              </template>
              <template #content>
                <p class="text-slate-300 text-sm">{{ relatedPost.excerpt }}</p>
              </template>
            </Card>
          </NuxtLink>
        </div>
      </div>

      <!-- Newsletter CTA -->
      <div class="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-center">
        <h3 class="text-2xl font-bold text-white mb-4">
          Enjoyed this article?
        </h3>
        <p class="text-purple-100 mb-6">
          Get more expert insights delivered to your inbox every week.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <InputText
            v-model="email"
            placeholder="Enter your email"
            class="flex-1"
          />
          <Button
            label="Subscribe"
            severity="secondary"
            @click="subscribe"
          />
        </div>
      </div>
    </div>

    <!-- Post Not Found -->
    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="text-6xl mb-4">📝</div>
      <h2 class="text-2xl font-semibold text-white mb-4">
        Article Not Found
      </h2>
      <p class="text-slate-300 mb-8">
        The article you're looking for doesn't exist or has been removed.
      </p>
      <Button
        as="a"
        href="/blog"
        label="Back to Blog"
        severity="primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import type { BlogPost, BlogCategory } from '~/data/blog'
import { getBlogCategoryName } from '~/data/blog'
import blogPostsData from '~/data/blog-posts.json'
import appsData from '~/data/apps.json'
import type { App } from '~/data/apps'

const route = useRoute()
const slug = route.params.slug as string

// Type assertion for imported JSON
const blogPosts = blogPostsData as BlogPost[]
const apps = appsData as App[]

// Find the blog post
const post = computed(() => {
  return blogPosts.find(p => p.slug === slug)
})

// SEO
useHead(() => ({
  title: post.value ? `${post.value.title} | HighLevelKit Blog` : 'Article Not Found | HighLevelKit',
  meta: [
    {
      name: 'description',
      content: post.value?.excerpt || 'Article not found'
    },
    {
      name: 'keywords',
      content: post.value?.seoKeywords.join(', ') || ''
    },
    // Open Graph
    {
      property: 'og:title',
      content: post.value?.title || 'Article Not Found'
    },
    {
      property: 'og:description',
      content: post.value?.excerpt || ''
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      property: 'article:published_time',
      content: post.value?.publishedAt || ''
    },
    {
      property: 'article:author',
      content: post.value?.author.name || ''
    },
    // Twitter Card
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: post.value?.title || ''
    },
    {
      name: 'twitter:description',
      content: post.value?.excerpt || ''
    }
  ]
}))

// Breadcrumbs
const breadcrumbItems = computed(() => [
  { label: 'Home', url: '/' },
  { label: 'Blog', url: '/blog' },
  { label: post.value?.title || 'Article', url: `/blog/${slug}` }
])

// Render markdown content
const renderedContent = computed(() => {
  if (!post.value) return ''
  return marked(post.value.content, {
    breaks: true,
    gfm: true
  })
})

// Related tools
const relatedTools = computed(() => {
  if (!post.value?.relatedTools) return []
  return apps.filter(app => post.value?.relatedTools?.includes(app.id))
})

// Related posts
const relatedPosts = computed(() => {
  if (!post.value?.relatedPosts) return []
  return blogPosts.filter(p => post.value?.relatedPosts?.includes(p.id))
})

// State
const email = ref('')

// Methods
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getCategoryIcon = (category: BlogCategory) => {
  const icons: Record<BlogCategory, string> = {
    'best-tools': '⭐',
    'comparisons': '⚖️',
    'guides': '📚',
    'case-studies': '📊',
    'integration-tutorials': '🔧',
    'industry-news': '📰',
    'ghl-tips': '💡',
    'automation': '🤖',
    'agency-growth': '📈'
  }
  return icons[category] || '📝'
}

const subscribe = () => {
  if (email.value) {
    // TODO: Implement newsletter subscription
    alert('Newsletter subscription coming soon!')
    email.value = ''
  }
}
</script>

<style scoped>
.article-content :deep(h1) {
  @apply text-3xl font-bold text-white mt-8 mb-4;
}

.article-content :deep(h2) {
  @apply text-2xl font-bold text-white mt-8 mb-4;
}

.article-content :deep(h3) {
  @apply text-xl font-bold text-white mt-6 mb-3;
}

.article-content :deep(h4) {
  @apply text-lg font-bold text-white mt-6 mb-3;
}

.article-content :deep(p) {
  @apply text-slate-300 mb-4 leading-relaxed;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  @apply text-slate-300 mb-4 pl-6;
}

.article-content :deep(li) {
  @apply mb-2;
}

.article-content :deep(ul li) {
  @apply list-disc;
}

.article-content :deep(ol li) {
  @apply list-decimal;
}

.article-content :deep(a) {
  @apply text-purple-400 hover:text-purple-300 underline;
}

.article-content :deep(strong) {
  @apply text-white font-bold;
}

.article-content :deep(em) {
  @apply italic;
}

.article-content :deep(code) {
  @apply bg-slate-800 text-purple-400 px-1.5 py-0.5 rounded text-sm;
}

.article-content :deep(pre) {
  @apply bg-slate-800 p-4 rounded-lg mb-4 overflow-x-auto;
}

.article-content :deep(pre code) {
  @apply bg-transparent p-0;
}

.article-content :deep(blockquote) {
  @apply border-l-4 border-purple-500 pl-4 italic text-slate-300 my-4;
}

.article-content :deep(table) {
  @apply w-full mb-4 border-collapse;
}

.article-content :deep(table thead) {
  @apply bg-slate-800;
}

.article-content :deep(table th) {
  @apply text-white font-bold p-3 text-left border border-slate-700;
}

.article-content :deep(table td) {
  @apply text-slate-300 p-3 border border-slate-700;
}

.article-content :deep(table tr:nth-child(even)) {
  @apply bg-slate-800/50;
}

.article-content :deep(hr) {
  @apply border-white/10 my-8;
}
</style>

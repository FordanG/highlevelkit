<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="text-4xl font-bold text-white mb-4">GoHighLevel guides</h1>
    <p class="text-slate-300 mb-10">Choose tools for your workflow and plan the skills your agency needs.</p>
    <NuxtLink to="/guides/ghl-hire" class="block card p-8 mb-10 hover:border-primary-400">
      <span class="text-primary-300 text-sm">HIRING & CAREERS</span>
      <h2 class="text-2xl font-bold text-white mt-2">GHL Hire: finding GoHighLevel jobs and hiring specialists</h2>
      <p class="text-slate-300 mt-3">A practical guide to roles, portfolio evidence, remote job searches and hiring briefs.</p>
    </NuxtLink>
    <h2 class="text-2xl font-bold text-white mb-6">Explore tools by workflow</h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink v-for="category in populatedCategories" :key="category.id" :to="`/guides/category/${category.id}`" class="card p-5 hover:border-primary-400">
        <h3 class="font-semibold text-white">{{ category.name }}</h3>
        <p class="text-slate-400 text-sm mt-2">{{ category.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import categories from '~/data/categories.json'
import apps from '~/data/apps.json'
const populatedCategories = categories.filter(c => apps.some(a => a.category.includes(c.id)))
const { setPageMeta, generateBreadcrumbSchema, setStructuredData } = useSEO()
setPageMeta({ title: 'GoHighLevel Guides: Tools, Hiring & Workflows | HighLevelKit', description: 'Explore GoHighLevel tools by workflow, learn what to look for in a GHL specialist, and prepare for remote GoHighLevel jobs.' })
setStructuredData(generateBreadcrumbSchema([{name:'Home',url:'/'},{name:'Guides',url:'/guides'}]))
</script>

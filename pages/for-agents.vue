<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-slate-300">
    <h1 class="text-4xl font-bold text-white mb-5">HighLevelKit for agents</h1>
    <p class="text-lg mb-8">Search the GoHighLevel tools directory without running JavaScript or signing in. Every result includes a canonical page and a provider link.</p>
    <section class="card p-6 mb-8"><h2 class="text-2xl font-semibold text-white mb-4">Search API</h2>
      <p class="mb-4">Send a GET request to <code>/api/search</code>. Search is case-insensitive; all words must match. Results are ordered by relevance, then name.</p>
      <a href="/api/search?q=automation" class="text-primary-300 underline break-all">https://highlevelkit.com/api/search?q=automation</a>
      <dl class="mt-5 space-y-3"><div><dt class="font-semibold text-white">q</dt><dd>Optional search words, up to 200 characters. Omit to list records.</dd></div><div><dt class="font-semibold text-white">category</dt><dd>Optional exact category ID from the JSON catalog, such as automation or hiring.</dd></div><div><dt class="font-semibold text-white">limit and offset</dt><dd>Limit defaults to 10 (maximum 50). Offset defaults to 0. Follow nextOffset until it is null.</dd></div></dl>
      <p class="mt-5">Responses include total, results, canonical URLs and a data caveat. Unknown terms return an empty results array; invalid parameters return HTTP 400. Only GET and HEAD are supported. No API key is required.</p>
    </section>
    <section class="mb-8"><h2 class="text-2xl font-semibold text-white mb-4">Download the directory</h2><ul class="list-disc pl-5 space-y-3"><li><a href="/llms.txt" class="text-primary-300 underline">llms.txt — discovery index</a></li><li><a href="/llms-full.txt" class="text-primary-300 underline">llms-full.txt — full plain-text catalog</a></li><li><a href="/catalog.json" class="text-primary-300 underline">catalog.json — complete structured records</a></li><li><a href="/openapi.json" class="text-primary-300 underline">openapi.json — search API contract</a></li><li><a href="/sitemap.xml" class="text-primary-300 underline">sitemap.xml — canonical web pages</a></li></ul></section>
    <section><h2 class="text-2xl font-semibold text-white mb-4">Use the data accurately</h2><p class="mb-4">HighLevelKit is an independent directory, not the official GoHighLevel marketplace. Listings describe possible workflows; they do not certify integrations. Confirm current pricing, compatibility and availability with each provider.</p><p>App records have no independently verified review counts or ratings. A null providerDetailsVerifiedAt means current provider details have not been reverified. The GHL Hire guide describes a waitlist observed on November 16, 2026, not live vacancies. Cite the canonical page when referring to a directory entry.</p></section>
  </main>
</template>
<script setup lang="ts">
const {setPageMeta,setStructuredData}=useSEO()
setPageMeta({title:'HighLevelKit for Agents: Search API & GoHighLevel Catalog',description:'Search GoHighLevel tools and guides with a public API, JSON catalog, plain-text records and an OpenAPI contract. No login or JavaScript required.'})
setStructuredData({'@context':'https://schema.org','@type':'DataCatalog',name:'HighLevelKit tool catalog',url:'https://highlevelkit.com/for-agents',description:'An independent directory of tools used with GoHighLevel.',dataset:{'@type':'Dataset',name:'HighLevelKit listings',url:'https://highlevelkit.com/catalog.json',description:'Directory descriptions with provider links; verify current pricing and compatibility with providers.',distribution:{'@type':'DataDownload',contentUrl:'https://highlevelkit.com/catalog.json',encodingFormat:'application/json'}}})
</script>

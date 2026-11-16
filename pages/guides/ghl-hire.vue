<template>
  <article class="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-slate-300">
    <Breadcrumbs :items="breadcrumbs" class="mb-8" />
    <p class="text-primary-300 text-sm mb-3">GOHIGHLEVEL HIRING & CAREERS</p>
    <h1 class="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">GHL Hire: find GoHighLevel jobs and hire the right specialist</h1>
    <p class="text-lg leading-relaxed mb-6">GoHighLevel work can involve CRM setup, funnels, workflow automation, integrations and ongoing client support. The right match starts with a clear role and evidence of the work, whether you are looking for a remote GHL job or hiring for an agency.</p>
    <aside class="card p-6 mb-10 border-primary-500/30">
      <h2 class="text-xl font-semibold text-white mb-3">Looking for the GHL Hire job board?</h2>
      <p>As checked on November 16, 2026, GHL Hire is being rebuilt and its homepage offers a waitlist for job seekers and employers. This guide does not list current vacancies.</p>
      <a href="https://ghlhire.com/" target="_blank" rel="noopener noreferrer" class="inline-block text-primary-300 underline mt-4">Visit GHL Hire for its current status and waitlist</a>
    </aside>
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Which GoHighLevel role fits your needs?</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-white"><tr><th class="p-3 border-b border-white/20">Role</th><th class="p-3 border-b border-white/20">Typical work</th><th class="p-3 border-b border-white/20">Evidence to request</th></tr></thead>
          <tbody><tr v-for="role in roles" :key="role.name"><th class="p-3 border-b border-white/10 font-medium text-white">{{ role.name }}</th><td class="p-3 border-b border-white/10">{{ role.work }}</td><td class="p-3 border-b border-white/10">{{ role.evidence }}</td></tr></tbody>
        </table>
      </div>
    </section>
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">How to look for remote GHL jobs</h2>
      <ol class="list-decimal pl-6 space-y-3 leading-relaxed">
        <li>Search for both platform and role terms: “GHL jobs remote,” “GoHighLevel automation specialist,” “GHL virtual assistant” and “GoHighLevel funnel builder.” Check the original employer listing before applying.</li>
        <li>Compare required working hours, location restrictions, contract type and responsibilities. A remote role may still require overlap with a particular time zone.</li>
        <li>Build a small portfolio using test data. Show a lead entering a pipeline, the workflow it triggers, failure handling and the result. Explain what you built yourself.</li>
        <li>Tailor your application to the workflow in the brief. Include a short walkthrough and describe your testing and handoff process.</li>
        <li>Confirm the employer and payment terms. Do not pay an application fee or share client credentials in an application. Use a paid, limited trial when practical work is requested.</li>
      </ol>
    </section>
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Write a hiring brief that can be tested</h2>
      <p class="mb-4">Replace “we need a GHL expert” with a defined result. For example: “When a qualified form submission arrives, create or update the contact, assign an owner, create a pipeline opportunity and notify the team without sending duplicate messages.”</p>
      <ul class="list-disc pl-6 space-y-2"><li>List the existing tools, access needed and the workflows in scope.</li><li>Specify the deliverables: working configuration, a test checklist, a walkthrough and handoff notes.</li><li>Agree on budget, availability, ownership and support after delivery.</li><li>Test duplicate submissions, missing fields, failed integrations and opt-out behavior before launch.</li></ul>
    </section>
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Tools to discuss with a candidate</h2>
      <p class="mb-5">Tools support a role; knowing a product name is not proof of competence. Ask the candidate to explain when an integration is needed and how they would monitor it.</p>
      <div class="grid sm:grid-cols-2 gap-4"><NuxtLink v-for="tool in tools" :key="tool.slug" :to="`/apps/${tool.slug}`" class="card p-5"><h3 class="font-semibold text-white">{{ tool.name }}</h3><p class="text-sm mt-2">{{ tool.reason }}</p></NuxtLink></div>
    </section>
    <section><h2 class="text-2xl font-bold text-white mb-5">Common questions</h2><div v-for="faq in faqs" :key="faq.question" class="mb-6"><h3 class="text-lg font-semibold text-white mb-2">{{ faq.question }}</h3><p>{{ faq.answer }}</p></div></section>
  </article>
</template>
<script setup lang="ts">
const breadcrumbs = [{name:'Home',url:'/'},{name:'Guides',url:'/guides'},{name:'GHL Hire guide',url:'/guides/ghl-hire'}]
const roles = [
  {name:'GHL virtual assistant',work:'Contact upkeep, calendar administration, pipeline updates and routine support.',evidence:'A repeatable checklist and an example of clean CRM records.'},
  {name:'Automation specialist',work:'Triggers, conditions, follow-ups, routing and integration troubleshooting.',evidence:'A workflow walkthrough with duplicate and failure tests.'},
  {name:'Funnel builder',work:'Landing pages, forms, calendars and mobile layouts.',evidence:'Responsive pages plus a tested form-to-CRM journey.'},
  {name:'Integration developer',work:'APIs, webhooks and connections with other systems.',evidence:'A documented integration with authentication, retries and logging.'}
]
const tools = [
  {slug:'make',name:'Make',reason:'Discuss multi-step integrations and how failures are handled.'},
  {slug:'n8n',name:'n8n',reason:'Discuss workflow logic, hosting responsibilities and monitoring.'},
  {slug:'zapier',name:'Zapier',reason:'Discuss app connections, task usage and duplicate prevention.'},
  {slug:'supercloner',name:'SuperCloner',reason:'Discuss funnel migration and checking the resulting pages.'}
]
const faqs = [
  {question:'What does GHL mean in a job listing?',answer:'GHL usually refers to GoHighLevel. Read the duties carefully: one listing may focus on administrative support, while another requires automation or development skills.'},
  {question:'Are all GoHighLevel jobs remote?',answer:'No. Check each listing for location requirements, working hours and whether remote work is available. This guide does not verify or advertise open roles.'},
  {question:'What should I include in a GHL portfolio?',answer:'Use test data to show a complete workflow, explain your contribution, include mobile and failure-case tests, and provide a concise handoff document.'}
]
const {setPageMeta,generateBreadcrumbSchema,generateFAQSchema,setMultipleSchemas}=useSEO()
setPageMeta({title:'GHL Hire Guide: GoHighLevel Jobs & Hiring Specialists | HighLevelKit',description:'Looking for GHL jobs or hiring a GoHighLevel specialist? Compare roles, prepare portfolio evidence, plan remote applications and write a clear hiring brief.'})
setMultipleSchemas([generateBreadcrumbSchema(breadcrumbs),generateFAQSchema(faqs)])
</script>

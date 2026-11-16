import fs from 'node:fs/promises'
const base = 'https://highlevelkit.com'
const apps = JSON.parse(await fs.readFile('data/apps.json', 'utf8'))
const categories = JSON.parse(await fs.readFile('data/categories.json', 'utf8'))
const records = apps.map(app => ({
  type: 'app', slug: app.slug, name: app.name, summary: app.tagline,
  description: app.description, url: `${base}/apps/${app.slug}`,
  textUrl: `${base}/catalog/${app.slug}.md`, website: app.website,
  categories: app.category, categoryNames: app.category.map(id=>categories.find(c=>c.id===id)?.name || id),
  features: app.features || [], useCases: app.useCase || [], userTypes: app.userType || [],
  integrationLevel: app.integrationLevel, setupDifficulty: app.setupDifficulty,
  pricingModel: app.pricing.model, providerDetailsVerifiedAt: null,
  image: app.image ? `${base}${app.image}` : null,
}))
const guide = {
  type: 'guide', slug: 'ghl-hire', name: 'GHL Hire: GoHighLevel jobs and hiring specialists',
  summary: 'A guide to remote GHL jobs, role selection, portfolio evidence and hiring briefs. GHL Hire had a rebuild waitlist when checked on November 16, 2026; this is not a list of open jobs.',
  description: 'Covers GHL virtual assistants, automation specialists, funnel builders and integration developers. Check the original employer listing for availability and working conditions.',
  url: `${base}/guides/ghl-hire`, textUrl: `${base}/catalog/ghl-hire.md`, website: 'https://ghlhire.com/', categories:['hiring'], categoryNames:['Hiring & careers'],features:[],useCases:['GoHighLevel jobs','GHL jobs remote','Hiring GoHighLevel specialists'],userTypes:['Job seekers','Agency owners'],providerDetailsVerifiedAt:'2026-11-16',
}
const catalog = {schemaVersion:'1.0',name:'HighLevelKit',url:base,description:'An independent directory of tools used with GoHighLevel. Not the official GoHighLevel marketplace.',dataCaveat:'Listings are directory descriptions, not hands-on verification. Confirm pricing, compatibility and current availability with the provider. No unverified review counts or ratings are supplied.',categories:[...categories.filter(c=>records.some(r=>r.categories.includes(c.id))).map(({id,name})=>({id,name})),{id:'hiring',name:'Hiring & careers'}],records:[...records,guide]}
await fs.mkdir('public/catalog',{recursive:true})
await fs.writeFile('public/catalog.json',JSON.stringify(catalog,null,2)+'\n')
const documents=[]
for(const r of catalog.records){
 const text=`# ${r.name}\n\n${r.summary}\n\nCanonical page: ${r.url}\nProvider: ${r.website}\nCategories: ${r.categoryNames.join(', ')}\n\n${r.description}\n\n${r.features.length?'## Listed features\n'+r.features.map(f=>`- ${f}`).join('\n')+'\n\n':''}${r.useCases.length?'## Use cases\n'+r.useCases.map(f=>`- ${f}`).join('\n')+'\n\n':''}## Verification\n${r.providerDetailsVerifiedAt ? 'Status checked: '+r.providerDetailsVerifiedAt+'. Recheck the provider for current status.' : 'Provider details have not been independently reverified. Check current pricing, compatibility and availability with the provider.'}\n\nSource: ${r.url}\n`
 await fs.writeFile(`public/catalog/${r.slug}.md`,text)
 documents.push(text)
}
await fs.writeFile('public/llms-full.txt',`# HighLevelKit catalog\n\n${catalog.description}\n\n${catalog.dataCaveat}\n\n${documents.join('\n---\n\n')}`)
await fs.writeFile('public/llms.txt',`# HighLevelKit\n\n> An independent GoHighLevel tools directory with ${records.length} app listings and a practical hiring guide.\n\n${catalog.dataCaveat}\n\n## Search and data\n- [Agent documentation](${base}/for-agents): Query parameters and response semantics.\n- [Search API](${base}/api/search?q=automation): Public GET endpoint; no key required. Supports q, category, limit and offset.\n- [OpenAPI specification](${base}/openapi.json): Machine-readable search API contract.\n- [Catalog JSON](${base}/catalog.json): Complete records, canonical URLs and provider links.\n- [Full text catalog](${base}/llms-full.txt): All records in one plain-text response.\n- [Sitemap](${base}/sitemap.xml): Canonical HTML pages.\n\n## Key pages\n- [Browse tools](${base}/apps)\n- [Guides](${base}/guides)\n- [GHL jobs and hiring guide](${base}/guides/ghl-hire): GHL Hire is on a rebuild waitlist as checked November 16, 2026; this guide does not list live jobs.\n\n## App records\n${records.map(r=>`- [${r.name}](${r.textUrl}): ${r.summary}`).join('\n')}\n`)
const openapi={openapi:'3.1.0',info:{title:'HighLevelKit Search API',version:'1.0.0',description:catalog.dataCaveat},servers:[{url:base}],paths:{'/api/search':{get:{operationId:'searchHighLevelKit',summary:'Search GoHighLevel tools and guides',description:'Case-insensitive keyword search. All query words must match. Results are ordered by relevance, then name. Empty q lists all records. Categories use exact IDs from catalog.json.',parameters:[{name:'q',in:'query',schema:{type:'string',maxLength:200},description:'Keyword query, for example automation or GHL jobs remote.'},{name:'category',in:'query',schema:{type:'string'},description:'Exact category ID from catalog.json.'},{name:'limit',in:'query',schema:{type:'integer',minimum:1,maximum:50,default:10}},{name:'offset',in:'query',schema:{type:'integer',minimum:0,default:0}}],responses:{'200':{description:'Matching records and pagination',content:{'application/json':{schema:{type:'object',required:['query','total','limit','offset','results'],properties:{query:{type:'string'},total:{type:'integer'},limit:{type:'integer'},offset:{type:'integer'},nextOffset:{type:['integer','null']},results:{type:'array',items:{$ref:'#/components/schemas/Record'}}}}}}},'400':{description:'Invalid query or pagination'},'405':{description:'Only GET and HEAD are supported'}}}}},components:{schemas:{Record:{type:'object',required:['type','slug','name','url','summary'],properties:{type:{enum:['app','guide']},slug:{type:'string'},name:{type:'string'},summary:{type:'string'},description:{type:'string'},url:{type:'string',format:'uri'},textUrl:{type:'string',format:'uri'},website:{type:'string',format:'uri'},categories:{type:'array',items:{type:'string'}},features:{type:'array',items:{type:'string'}},providerDetailsVerifiedAt:{type:['string','null']}}}}}}
await fs.writeFile('public/openapi.json',JSON.stringify(openapi,null,2)+'\n')
console.log(`Generated ${records.length} app records, 1 guide, llms.txt and OpenAPI contract`)

import test from 'node:test'
import assert from 'node:assert/strict'
import search from '../netlify/functions/search.mjs'
const call = (query='',method='GET')=>search(new Request(`https://highlevelkit.com/api/search${query}`,{method}))
test('search finds named apps and job intent with source links',async()=>{
 const apps=await (await call('?q=SUPERCLONER')).json();assert.equal(apps.results[0].slug,'supercloner');assert.match(apps.results[0].url,/https:\/\/highlevelkit.com\/apps\//)
 const jobs=await (await call('?q=ghl%20jobs%20remote')).json();assert.equal(jobs.results[0].slug,'ghl-hire');assert.match(jobs.results[0].summary,/waitlist/)
})
test('category and pagination constrain results',async()=>{
 const all=await(await call('?limit=50')).json();assert.equal(all.total,42)
 const first=await(await call('?limit=2')).json();const next=await(await call('?limit=2&offset=2')).json();assert.equal(first.nextOffset,2);assert(!next.results.some(a=>first.results.some(b=>a.slug===b.slug)))
 const filtered=await(await call('?category=automation&limit=50')).json();assert(filtered.results.length);assert(filtered.results.every(r=>r.categories.includes('automation')))
})
test('unknown terms return empty results; invalid input is rejected',async()=>{
 assert.equal((await(await call('?q=not-a-real-listing-xyz')).json()).total,0)
 for(const q of ['?limit=0','?limit=51','?limit=1.2','?offset=-1','?offset=NaN','?q='+ 'a'.repeat(201)])assert.equal((await call(q)).status,400)
 assert.equal((await call('','POST')).status,405)
 assert.equal(await(await call('?q=make','HEAD')).text(),'')
})

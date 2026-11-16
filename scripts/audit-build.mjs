import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { load } from 'cheerio'
import sharp from 'sharp'
const root = '.output/public'
const apps = JSON.parse(fs.readFileSync('data/apps.json'))
const files = fs.readdirSync(root, {recursive:true}).filter(p=>p.endsWith('.html')&&!['200.html','404.html'].includes(p))
const errors=[]
let images=0
for(const file of files){
 const $=load(fs.readFileSync(path.join(root,file),'utf8'))
 const route='/' + file.replace(/index\.html$/,'').replace(/\/$/,'')
 if($('h1').length!==1)errors.push(`${route}: ${$('h1').length} H1s`)
 if($('link[rel=canonical]').length!==1)errors.push(`${route}: missing or duplicate canonical`)
 for(const el of $('img').toArray()){
  const src=$(el).attr('src');if(!$(el).attr('alt'))errors.push(`${route}: missing alt`)
  if(src?.startsWith('/')&&!fs.existsSync(path.join(root,decodeURI(src))))errors.push(`${route}: missing image ${src}`)
  if(src?.startsWith('http'))errors.push(`${route}: external image ${src}`)
  images++
 }
 for(const el of $('meta[property="og:image"],meta[name="twitter:image"]').toArray()){
  const src=$(el).attr('content');if(!src?.startsWith('https://highlevelkit.com/'))errors.push(`${route}: nonabsolute social image ${src}`)
  else if(!fs.existsSync(path.join(root,new URL(src).pathname)))errors.push(`${route}: missing social image ${src}`)
 }
 for(const el of $('script[type="application/ld+json"]').toArray()){
  try{const s=JSON.parse($(el).html());if(s.aggregateRating)errors.push(`${route}: unsourced aggregate rating`)}catch{errors.push(`${route}: invalid JSON-LD`)}
 }
 if($('a a').length)errors.push(`${route}: nested links`)
}
for(const app of apps){
 const file=path.join(root,'apps',app.slug,'index.html')
 if(!fs.existsSync(file))errors.push(`Missing app HTML ${app.slug}`)
 else if(!load(fs.readFileSync(file))('h1').text().includes(app.name))errors.push(`Wrong app content ${app.slug}`)
}
const guide=load(fs.readFileSync(path.join(root,'guides/ghl-hire/index.html')))
assert.match(guide('h1').text(),/GHL Hire/)
const xml=load(fs.readFileSync(path.join(root,'sitemap.xml')),{xmlMode:true})
const locations=xml('url > loc').toArray().map(el=>xml(el).text())
for(const url of locations){
 const route=new URL(url).pathname
 if(/^\/(es|de|fr|pt)(\/|$)/.test(route)||url.includes('?'))errors.push(`Duplicate sitemap URL ${url}`)
 const file=path.join(root,route,'index.html')
 if(!fs.existsSync(file))errors.push(`Sitemap page missing ${url}`)
 else if(/noindex/.test(load(fs.readFileSync(file))('meta[name=robots]').attr('content')||''))errors.push(`Noindex page in sitemap ${url}`)
}
for(const a of apps)assert(locations.includes(`https://highlevelkit.com/apps/${a.slug}`))
for(const p of fs.readdirSync('public/apps',{recursive:true}).filter(p=>p.endsWith('.webp')))await sharp(path.join('public/apps',p)).metadata()
const report={pages:files.length,appPages:apps.length,imageReferences:images,sitemapURLs:locations.length,errors}
fs.writeFileSync('outputs/seo-audit-2026-11-16/build-audit.json',JSON.stringify(report,null,2)+'\n')
console.log(report);assert.equal(errors.length,0)

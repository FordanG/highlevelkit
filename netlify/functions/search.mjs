import catalog from '../../public/catalog.json' with { type: 'json' }

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=300',
  'X-Content-Type-Options': 'nosniff',
}
const normalize = text => text.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()

export default async function search(request) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    return Response.json({ error: 'Use GET or HEAD.' }, { status: 405, headers: { Allow: 'GET, HEAD' } })
  }
  const params = new URL(request.url).searchParams
  const query = (params.get('q') || '').trim()
  const category = params.get('category') || ''
  const rawLimit = params.get('limit') ?? '10'
  const rawOffset = params.get('offset') ?? '0'
  const limit = Number(rawLimit), offset = Number(rawOffset)
  if (query.length > 200 || !/^\d+$/.test(rawLimit) || !/^\d+$/.test(rawOffset) || !Number.isSafeInteger(limit) || limit < 1 || limit > 50 || !Number.isSafeInteger(offset) || offset < 0) {
    return Response.json({ error: 'q must be at most 200 characters; limit must be 1–50; offset must be a non-negative integer.' }, { status: 400 })
  }
  const terms = normalize(query).split(/[^\p{L}\p{N}]+/u).filter(Boolean)
  const matches = catalog.records.map(record => {
    const title = normalize(record.name)
    const haystack = normalize([record.name, record.summary, record.description, ...record.categories, ...record.categoryNames, ...record.features, ...record.useCases, ...record.userTypes].join(' '))
    const match = (!category || record.categories.includes(category)) && terms.every(term => haystack.includes(term))
    const score = terms.reduce((sum, term) => sum + (title.includes(term) ? 3 : 1), 0)
    return { record, match, score }
  }).filter(r => r.match).sort((a,b)=>b.score-a.score || a.record.name.localeCompare(b.record.name))
  const result = {query,category:category || null,total:matches.length,limit,offset,nextOffset:offset+limit<matches.length?offset+limit:null,dataCaveat:catalog.dataCaveat,results:matches.slice(offset,offset+limit).map(r=>r.record)}
  return new Response(request.method === 'HEAD' ? null : JSON.stringify(result), { headers })
}

export const config = { path: '/api/search' }

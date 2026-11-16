# HighLevelKit SEO, image and agent-access audit

Date: 2026-11-16 (Asia/Manila). Repository: https://github.com/FordanG/highlevelkit. Baseline: `4a02d10`.

## Reporting baseline

Google Search Console, Web, August 15–November 14, 2026:

| Property | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| highlevelkit.com | 0 | 200 | 0% | 60.3 |
| ghlhire.com | 1.4K (UI rounded) | 37.7K (UI rounded) | 3.7% | 8.6 |

HighLevelKit indexing report last updated November 13: 5 indexed; 135 not indexed (115 discovered, 11 crawled, 9 redirects). This establishes symptoms, not proof of a single cause. Existing sitemap submission was successful with 126 discovered pages, last read November 6.

GHL Hire top queries (clicks / impressions): `ghl hire` 124/179; `ghl jobs` 114/911; `gohighlevel jobs` 75/948; `go high level jobs` 54/715; `ghl jobs remote` 39/269; `ghl hiring` 30/299; `ghlhire` 30/38; `gohighlevel hiring` 24/170; `ghl remote jobs` 20/127; `gohighlevel careers` 16/1,268.

GHL Hire landing pages: `/jobs` 793 clicks / 15,388 impressions; homepage 605 / 24,306. The live homepage currently says the job board is being rebuilt and offers a waitlist. These historical search totals are not HighLevelKit traffic. Preserve the existing GHL Hire jobs URL and investigate its current state in a separate project task; this change does not edit that site.

GA4 Highlevel Kit property `514302268`, October 19–November 15: 43 active users (home card), 51 views, 146 events; traffic acquisition shows 43 sessions, 8 engaged sessions, 18.6% engagement rate, 2 seconds average engagement, 0 key events. Channels: Direct 41, Referral 1, Unassigned 1. Direct attribution does not establish visitor identity or prove bot traffic.

Reporting sources:
- https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Ahighlevelkit.com
- https://search.google.com/search-console/index?resource_id=sc-domain%3Ahighlevelkit.com
- https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aghlhire.com
- https://analytics.google.com/analytics/web/#/a376029543p514302268/reports/intelligenthome
- https://ghlhire.com/

## Repairs

- Replaced third-party image transformations with local responsive WebP variants. Recovered seven missing/external logos. Four unrecoverable logos and one preview use intentional text fallbacks. Shared image component handles errors on all directory surfaces, with eager hero loading and lazy cards.
- Removed opacity gating that could leave cached or pre-hydration images invisible; removed invalid nested links from app cards.
- Repaired nonexistent Open Graph images and organization logo references; made app social images absolute.
- Fixed JSON-LD scripts that previously serialized JSON into a `children` attribute, leaving the script body empty. Removed unsourced aggregate rating and duplicate Product markup. Unknown paid pricing is no longer represented as a free offer.
- Replaced unsupported sitemap configuration with explicit app URLs and image records; no fabricated build-time lastmod dates. Removed English-only locale duplicates and added permanent redirects to their English equivalents.
- Preserved genuine 404 responses. Corrected nested guide routing, breadcrumb field names and missing category handling. Added useful guide index, category links and a GHL hiring guide that clearly describes the current waitlist.
- Replaced unsupported homepage user-count claims with actual directory counts. Added `app_website_click` GA4 event; it is not marked as a key event in GA4, and collection is subject to browser consent/blockers.

## Agent access

- `/llms.txt`: discovery index. This is a convenience format, not a Google ranking requirement.
- `/llms-full.txt`, `/catalog.json`, `/catalog/{slug}.md`: complete text/JSON records generated from the app database. Provider verification dates are null unless independently checked; unverified review scores and exact price claims are omitted.
- `/api/search`: public read-only GET/HEAD search, keyword matching, category filter, bounded pagination, source URLs and explicit data caveats.
- `/openapi.json` and `/for-agents`: API contract and usage documentation.
- Catalog generation runs before build/generate so these surfaces stay consistent with the listings. Search endpoint uses bundled catalog data and no external service or credentials.

## Cloudflare decision

Kept existing Netlify CDN hosting. The checked failures were image sources, HTML/schema generation, routing and content duplication. Moving the same files to R2 would not fix them. The complete original image directory was only 3.3 MB. R2 is useful if asset volume or delivery requirements grow, but production caching requires a custom domain; the S3 API endpoint is not an appropriate public image base URL. No Cloudflare credentials were saved or infrastructure changed.

References: https://developers.cloudflare.com/r2/buckets/public-buckets/ ; https://developers.google.com/search/docs/appearance/ai-features ; https://docs.netlify.com/build/functions/api/ . Google AI visibility still depends on crawlability, indexing, content quality and eligibility; no ranking or AI citation outcome is claimed.

## Validation and follow-up

Run `npm run generate`, then `npm run test:seo` and `npm run test:agents`. Local evidence is under ignored `outputs/seo-audit-2026-11-16/`. Build audit verifies every generated page, all app HTML, local image references, social-image files, JSON-LD and sitemap URLs. Search tests cover named tools, job intent, categories, pagination, empty results, invalid inputs and unsupported methods. Browser QA checks actual image decoding and mobile layout.

Deployment and Search Console submission outcomes are recorded below after verification. Recheck indexing and query trends after Google has recrawled; no recovery is established by deployment alone.

### Verified build and preview

- Production generation passed: 72 HTML pages, 41 app pages, 754 image references, 67 sitemap URLs; zero build-audit findings. Three search test groups passed.
- Preview `6afb1a386b71e26570cd0536`: verified HTTP 200 for HTML, JSON search, llms.txt, catalog JSON, per-record Markdown and XML sitemap; locale redirect returned 301; unknown URL returned 404. `GHL jobs remote` returned the hiring guide; `automation` returned 30 matches.
- Browser: directory images decoded successfully; app and hiring-guide mobile layouts checked. Preview: https://6afb1a386b71e26570cd0536--highlevelkit.netlify.app .

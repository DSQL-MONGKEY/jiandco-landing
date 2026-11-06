import { mkdir, writeFile } from 'node:fs/promises'
import { loadEnv } from 'vite'

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '')
const siteUrl = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || 'https://www.jiandco.id').replace(/\/+$/, '')
const apiUrl = (process.env.VITE_API_BASE_URL || env.VITE_API_BASE_URL || 'https://api.jiandco.id/api/v1').replace(/\/+$/, '')

const paths = new Set(['/', '/catalog'])

try {
  const response = await fetch(`${apiUrl}/public/catalog`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10000),
  })
  if (response.ok) {
    const payload = await response.json()
    for (const product of payload?.data?.products ?? []) {
      if (product?.slug) paths.add(`/catalog/${product.slug}`)
    }
  } else {
    console.warn(`Sitemap: catalog API returned ${response.status}; using static routes.`)
  }
} catch (error) {
  console.warn(`Sitemap: could not fetch catalog API; using static routes. ${error.message}`)
}

const lastmod = new Date().toISOString().slice(0, 10)
const entries = [...paths].map((path) => {
  const loc = new URL(path, `${siteUrl}/`).toString()
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path === '/catalog' ? '0.9' : '0.8'}</priority>
  </url>`
})
const urls = entries.join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

await mkdir('dist', { recursive: true })
await writeFile('dist/sitemap.xml', xml)
console.log(`Sitemap written: ${entries.length} URLs`)

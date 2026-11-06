# SEO

## Static SEO

- `index.html` contains the default home metadata, Open Graph, Twitter Card, manifest,
  icons, preconnect to the API, and Organization/WebSite JSON-LD.
- `public/site.webmanifest` provides PWA metadata.
- `public/images/og-jiandco.jpg` is the 1200×630 social preview image.
- `public/robots.txt` allows public pages, blocks `/cart` and `/checkout`, and points to
  `https://www.jiandco.id/sitemap.xml`.
- `scripts/generate-sitemap.mjs` generates `dist/sitemap.xml` at build time from the
  public catalog API. If the API is unavailable, it falls back to `/` and `/catalog`.

## Runtime SEO

`src/components/Seo.tsx` updates per-route metadata:

- title, description, canonical
- Open Graph and Twitter Card
- robots
- JSON-LD
- product price metadata

Home, catalog, and product pages provide page-specific JSON-LD. Cart and checkout are
`noindex`.

## Site URL

Set the canonical site URL at build time:

```env
VITE_SITE_URL=https://www.jiandco.id
```

If unset, the app falls back to `window.location.origin` in the browser.

## Verification

```bash
bun run build
cat dist/sitemap.xml
curl -I https://www.jiandco.id/robots.txt
curl -I https://www.jiandco.id/cart
```

Validate JSON-LD with Schema Markup Validator or Google Rich Results Test.

## Limitation

This is a client-side SPA. Static HTML contains the default home metadata; product and
catalog metadata is applied by JavaScript. Crawlers that do not execute JavaScript may
only see the default metadata. For stronger product-level SEO, migrate to SSR or edge
metadata injection.

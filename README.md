# Ji&Co Landing & Catalog

Vite + React landing page and public catalog for Ji&Co, a brand of PT. Sadhika Cipta Mandiri.

## Setup

```bash
cp .env.example .env.local
bun install
bun run dev
```

```env
VITE_API_BASE_URL=http://localhost:2900/api/v1
VITE_SITE_URL=https://www.jiandco.id
```

The catalog, product detail, cart, and checkout use the Jiandco Go API. Dashboard admin edits are reflected on the public catalog; only products with status `Active` are shown. Product colors are custom per product and each color can have its own preview image from `cdn.jiandco.id`.

## Deployment

Lihat [docs/deployment.md](docs/deployment.md) untuk build Docker, nginx, CI/CD GHCR, dan deployment VPS rjm.

## SEO

Lihat [docs/seo.md](docs/seo.md) untuk metadata, structured data, sitemap, dan batasan SPA.

## Scripts

```bash
bun run dev
bun run build
bun run preview
bun run lint
```

# Ji&Co Landing & Catalog

Vite + React landing page and public catalog for Ji&Co.

## Setup

```bash
cp .env.example .env.local
bun install
bun run dev
```

```env
VITE_API_BASE_URL=http://localhost:2900/api/v1
```

The catalog, product detail, cart, and checkout use the Jiandco Go API. Dashboard admin edits are reflected on the public catalog; only products with status `Active` are shown.

## Deployment

Lihat [docs/deployment.md](docs/deployment.md) untuk build Docker, nginx, CI/CD GHCR, dan deployment VPS rjm.

## Scripts

```bash
bun run dev
bun run build
bun run preview
bun run lint
```

# Deployment Landing / Catalog

Landing dan public catalog berjalan sebagai static site Vite di `https://www.jiandco.id`.
Image dibangun oleh GitHub Actions, disimpan di GHCR, lalu dijalankan sebagai container
nginx di VPS rjm.

## Environment build-time

```env
VITE_API_BASE_URL=https://api.jiandco.id/api/v1
```

`VITE_*` di-inline saat build. Jika domain API berubah, image harus di-rebuild.

## Build lokal

```bash
bun install --frozen-lockfile
VITE_API_BASE_URL=https://api.jiandco.id/api/v1 bun run build
```

## Docker

```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://api.jiandco.id/api/v1 \
  -t oinsh-page .
docker run -d \
  --name jiandco-landing \
  --restart unless-stopped \
  -p 8080:80 \
  oinsh-page
```

Nginx melayani SPA fallback untuk `/catalog`, `/catalog/:slug`, `/cart`, dan `/checkout`,
serta cache satu tahun untuk `/assets/`.

## VPS rjm

Stack Jiandco berada di `/opt/jiandco` dan memakai network Docker rjm yang sama.
Service landing bernama `jiandco-landing`:

```yaml
jiandco-landing:
  image: ${IMAGE_PREFIX:-ghcr.io/dsql-mongkey}/oinsh-page:${LANDING_TAG:-latest}
  restart: unless-stopped
  mem_limit: 64m
  networks: [rjm]
```

Cloudflare Tunnel route:

| Hostname | Service |
|---|---|
| `www.jiandco.id` | `http://jiandco-landing:80` |

Apex `jiandco.id` diarahkan ke `https://www.jiandco.id`.

## CI/CD

Workflow `.github/workflows/ci.yml`:

- verify: install, lint, build;
- image: build & push `ghcr.io/dsql-mongkey/oinsh-page:<sha>` dan `:latest`;
- deploy: update `LANDING_TAG` di `/opt/jiandco/.env`, pull, lalu `up -d --wait`.

Secrets:

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`

Variable:

- `VPS_APP_DIR=/opt/jiandco`
- `IMAGE_PREFIX=ghcr.io/dsql-mongkey` (opsional)

## Rollback

```bash
cd /opt/jiandco
sed -i 's/^LANDING_TAG=.*/LANDING_TAG=<sha-lama>/' .env
docker compose pull jiandco-landing
docker compose up -d --wait jiandco-landing
```

## CORS

Landing memanggil API langsung dari browser, jadi origin landing harus ada di
`CORS_ALLOWED_ORIGINS` API:

```env
CORS_ALLOWED_ORIGINS=https://www.jiandco.id,https://jiandco.id
```

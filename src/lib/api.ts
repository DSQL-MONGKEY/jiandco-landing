export type CatalogImage = {
  src: string;
  alt: string;
};

export type CatalogCollection = {
  id: string;
  label: string;
  description: string;
};

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  collection: string;
  color: string;
  whatsappPrice: number;
  shopeePrice: number;
  images: CatalogImage[];
  description: string;
  details: string[];
  sizes: string[];
  shopeeUrl: string;
  badge?: string;
  badgeTone?: "light" | "accent";
};

export type CatalogPromo = {
  badge: string;
  title: string;
  description: string;
  note: string;
  ctaLabel: string;
};

export type CatalogPageSettings = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  footnote: string;
};

export type CatalogCta = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  label: string;
  imageUrl: string;
  secondaryImageUrl: string;
};

export type CatalogPayload = {
  collections: CatalogCollection[];
  products: CatalogProduct[];
  promo: CatalogPromo;
  page: CatalogPageSettings;
  cta: CatalogCta;
  shopeeStoreUrl: string;
};

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:2900/api/v1").replace(
  /\/+$/,
  "",
);

export function resolveMediaUrl(src: string | undefined) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) {
    try {
      return new URL(src, API_BASE).toString();
    } catch {
      return src;
    }
  }
  return `${API_BASE}/${src.replace(/^\/+/, "")}`;
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  const payload = (await response.json()) as ApiEnvelope<T>;
  if (!response.ok || !payload.success || !payload.data) {
    throw new Error(payload.message || `Request failed (${response.status})`);
  }
  return payload.data;
}

export function fetchCatalog() {
  return request<CatalogPayload>("/public/catalog");
}

export function fetchCatalogProduct(slug: string) {
  return request<{ product: CatalogProduct } & Omit<CatalogPayload, "products">>(
    `/public/catalog/products/${encodeURIComponent(slug)}`,
  );
}

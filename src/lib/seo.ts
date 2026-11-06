const FALLBACK_SITE_URL = "https://www.jiandco.id";

export function getSiteUrl() {
  if (typeof window !== "undefined") {
    return (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/+$/, "");
  }
  return (import.meta.env.VITE_SITE_URL || FALLBACK_SITE_URL).replace(/\/+$/, "");
}

export function absoluteUrl(path = "/") {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

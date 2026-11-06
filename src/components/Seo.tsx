import { useEffect } from "react";
import { brand } from "../brand";
import { getSiteUrl } from "../lib/seo";

type Props = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "product";
  noindex?: boolean;
  product?: {
    price: number;
    currency?: string;
  };
  jsonLd?: Record<string, unknown>;
};

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(property ? "property" : "name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function removeMeta(name: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  document.head.querySelector(selector)?.remove();
}

export default function Seo({
  title,
  description,
  path,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  type = "website",
  noindex = false,
  product,
  jsonLd,
}: Props) {
  useEffect(() => {
    document.title = title;
    const siteUrl = getSiteUrl();
    const canonical = `${siteUrl}${path}`;
    const absoluteImage = image
      ? image.startsWith("http")
        ? image
        : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
      : undefined;
    const alt = imageAlt || title;

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:url", canonical, true);
    setMeta("og:locale", "id_ID", true);
    setMeta("og:site_name", brand.name, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("robots", noindex ? "noindex,nofollow" : "index,follow");

    if (absoluteImage) {
      setMeta("og:image", absoluteImage, true);
      setMeta("og:image:alt", alt, true);
      setMeta("twitter:image", absoluteImage);
      setMeta("twitter:image:alt", alt);
    }

    if (imageWidth && imageHeight) {
      setMeta("og:image:width", String(imageWidth), true);
      setMeta("og:image:height", String(imageHeight), true);
    } else {
      removeMeta("og:image:width", true);
      removeMeta("og:image:height", true);
    }

    if (product) {
      setMeta("product:price:amount", String(product.price), true);
      setMeta("product:price:currency", product.currency || "IDR", true);
    } else {
      removeMeta("product:price:amount", true);
      removeMeta("product:price:currency", true);
    }

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;

    const scriptId = "page-jsonld";
    document.getElementById(scriptId)?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [
    title,
    description,
    path,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    type,
    noindex,
    product,
    jsonLd,
  ]);

  return null;
}

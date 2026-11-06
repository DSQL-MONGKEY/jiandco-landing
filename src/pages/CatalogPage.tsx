import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { brand } from "../brand";
import { useCatalog } from "../context/CatalogContext";
import { getSiteUrl } from "../lib/seo";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import CatalogProductCard from "../components/shop/CatalogProductCard";
import PromoBanner from "../components/shop/PromoBanner";
import ShopHeader from "../components/shop/ShopHeader";

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, loading, error, reload } = useCatalog();
  const collections = data?.collections ?? [];
  const catalogProducts = data?.products ?? [];
  const selected = searchParams.get("collection");
  const activeCollection = collections.some((item) => item.id === selected) ? selected : "all";

  const products = useMemo(
    () =>
      activeCollection === "all"
        ? catalogProducts
        : catalogProducts.filter((product) => product.collection === activeCollection),
    [activeCollection, catalogProducts],
  );

  const setCollection = (value: string) => {
    if (value === "all") {
      searchParams.delete("collection");
      setSearchParams(searchParams);
      return;
    }
    setSearchParams({ collection: value });
  };

  const activeLabel = collections.find((collection) => collection.id === activeCollection);
  const siteUrl = getSiteUrl();
  const catalogTitle = "Katalog Chongsam & Blush — Ji&Co";
  const catalogDescription =
    "Jelajahi atasan Ji&Co dari koleksi Chongsam dan Blush. Pilih warna dan ukuran S–XL, lalu checkout melalui WhatsApp atau Shopee.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/catalog#page`,
        name: catalogTitle,
        description: catalogDescription,
        url: `${siteUrl}/catalog`,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        breadcrumb: { "@id": `${siteUrl}/catalog#breadcrumb` },
        mainEntity: { "@id": `${siteUrl}/catalog#products` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/catalog#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Katalog",
            item: `${siteUrl}/catalog`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/catalog#products`,
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}/catalog/${product.slug}`,
          name: product.name,
        })),
      },
    ],
  };

  if (loading) {
    return (
      <>
        <ShopHeader />
        <main className="container-page py-16">
          <div className="h-12 w-64 animate-pulse bg-secondary/60" />
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="aspect-[3/4] animate-pulse bg-secondary/50" key={index} />
            ))}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <ShopHeader />
        <main className="container-page py-16">
          <p className="text-muted">Gagal memuat katalog: {error}</p>
          <button className="btn btn-brand mt-6 min-h-11" type="button" onClick={reload}>
            Coba lagi
          </button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Seo
        title={catalogTitle}
        description={catalogDescription}
        path="/catalog"
        image={brand.seo.ogImage}
        imageAlt="Katalog Ji&Co — Chongsam & Blush"
        imageWidth={1200}
        imageHeight={630}
        jsonLd={jsonLd}
      />
      <ShopHeader />
      <main id="main" className="bg-main">
        <nav
          aria-label="Breadcrumb"
          className="container-page flex items-center gap-2 pt-8 text-[0.56rem] font-semibold tracking-[0.14em] text-muted uppercase"
        >
          <Link className="transition-colors hover:text-accent" to="/">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Katalog</span>
        </nav>
        <section className="container-page pt-8 pb-10 sm:pt-10 sm:pb-14">
          <p className="eyebrow">Catalog — Chongsam &amp; Blush</p>
          <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h1 className="section-title max-w-[13ch]">
              {data?.page.title || "The"}{" "}
              <em className="italic text-accent">{data?.page.titleAccent || "collection."}</em>
            </h1>
            <p className="max-w-[30rem] text-[0.92rem] leading-[1.75] text-muted">
              {data?.page.description ||
                "Atasan pilihan yang dibuat untuk dipadukan dengan ritme harimu. Pilih ukuran, masukkan ke keranjang, lalu checkout dengan cara yang paling nyaman untukmu."}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {[{ id: "all", label: "All" }, ...collections].map((collection) => (
              <button
                className={`min-h-10 rounded-full border px-4 text-[0.58rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
                  activeCollection === collection.id
                    ? "border-burgundy bg-burgundy text-main"
                    : "border-line bg-transparent text-ink hover:border-burgundy"
                }`}
                key={collection.id}
                type="button"
                onClick={() => setCollection(collection.id)}
              >
                {collection.label}
              </button>
            ))}
          </div>
          {activeLabel && (
            <p className="mt-4 max-w-[36rem] text-[0.8rem] leading-[1.65] text-muted">
              {activeLabel.description}
            </p>
          )}
        </section>

        <PromoBanner />

        <section className="container-page py-10 sm:py-14">
          {products.length === 0 ? (
            <div className="border border-line bg-secondary/30 px-6 py-14 text-center">
              <p className="eyebrow">Catalog</p>
              <h2 className="mt-3 font-display text-3xl tracking-[-0.02em]">
                Belum ada produk aktif.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[0.82rem] leading-[1.7] text-muted">
                Produk yang tampil di sini diambil dari dashboard. Aktifkan produk dan pastikan
                memiliki varian serta gambar, lalu muat ulang halaman ini.
              </p>
              <button className="btn btn-brand mt-6 min-h-11" type="button" onClick={reload}>
                Muat ulang katalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
              {products.map((product) => (
                <CatalogProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <p className="mt-10 text-[0.68rem] leading-[1.7] text-muted">
            {data?.page.footnote ||
              "Harga via WhatsApp adalah harga spesial. Harga Shopee mengikuti harga yang tertera di toko Shopee. Ketersediaan dikonfirmasi saat checkout."}
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { brand, formatPrice } from "../brand";
import { useCatalog } from "../context/use-catalog";
import { resolveMediaUrl } from "../lib/api";
import { getSiteUrl } from "../lib/seo";
import Footer from "../components/Footer";
import { MinusIcon, PlusIcon, WhatsAppIcon } from "../components/Icons";
import Seo from "../components/Seo";
import PromoBanner from "../components/shop/PromoBanner";
import ShopHeader from "../components/shop/ShopHeader";
import { useCart } from "../context/use-cart";

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { data, loading, error } = useCatalog();
  const [size, setSize] = useState("");
  const [colorId, setColorId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [showColorImage, setShowColorImage] = useState(true);
  const [added, setAdded] = useState(false);

  if (loading) {
    return (
      <>
        <ShopHeader />
        <main className="container-page py-16">
          <div className="h-96 animate-pulse bg-main" />
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ShopHeader />
        <main className="container-page py-16">
          <p className="text-muted">Gagal memuat produk: {error}</p>
        </main>
      </>
    );
  }

  const product = data?.products.find((item) => item.slug === slug);
  if (!product) return <Navigate to="/catalog" replace />;

  const collection = data?.collections.find((item) => item.id === product.collection);
  const collectionLabel = collection?.label ?? "Ji&Co";
  const colors = product.colors ?? [];
  const selectedColor = colors.find((item) => item.id === colorId) ?? colors[0];
  const availableSizes = selectedColor?.sizes?.length ? selectedColor.sizes : product.sizes;
  const effectiveSize = availableSizes.includes(size) ? size : (availableSizes[0] ?? "");
  const images = product.images;
  const colorImage = selectedColor?.image?.src ? selectedColor.image : undefined;
  const image = (showColorImage ? colorImage : undefined) ?? images[imageIndex] ?? images[0];
  const saving = product.shopeePrice - product.whatsappPrice;
  const siteUrl = getSiteUrl();
  const productUrl = `${siteUrl}/catalog/${product.slug}`;
  const productImage = image ? resolveMediaUrl(image.src) : brand.seo.ogImage;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${productUrl}#product`,
        name: product.name,
        description: product.description,
        image: product.images.map((item) => resolveMediaUrl(item.src)),
        url: productUrl,
        brand: { "@type": "Brand", name: brand.name },
        category: collectionLabel,
        color: colors.map((item) => item.name).join(", ") || product.color,
        size: availableSizes.join(", "),
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: product.whatsappPrice,
          availability: product.sizes.length
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
          itemCondition: "https://schema.org/NewCondition",
          url: productUrl,
          seller: { "@type": "Organization", name: brand.companyName },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${productUrl}#breadcrumb`,
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
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: productUrl,
          },
        ],
      },
    ],
  };

  const handleAdd = () => {
    addItem(product, effectiveSize, quantity, selectedColor);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  const handleBuyNow = () => {
    addItem(product, effectiveSize, quantity, selectedColor);
    navigate("/checkout");
  };

  return (
    <>
      <Seo
        title={`${product.name} — ${collectionLabel} | Ji&Co`}
        description={`${product.name} warna ${product.color} dari koleksi ${collectionLabel}. Tersedia ukuran ${product.sizes.join(", ")}. Harga ${formatPrice(product.whatsappPrice)} via WhatsApp atau Shopee.`}
        path={`/catalog/${product.slug}`}
        image={productImage}
        imageAlt={image?.alt ?? product.name}
        type="product"
        product={{ price: product.whatsappPrice, currency: "IDR" }}
        jsonLd={jsonLd}
      />
      <ShopHeader />
      <main id="main" className="bg-main">
        <nav
          aria-label="Breadcrumb"
          className="container-page flex flex-wrap items-center gap-2 pt-8 pb-6 text-[0.56rem] font-semibold tracking-[0.14em] text-muted uppercase"
        >
          <Link className="transition-colors hover:text-accent" to="/">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link className="transition-colors hover:text-accent" to="/catalog">
            Katalog
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <section className="container-page grid gap-10 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <div className="aspect-[3/4] overflow-hidden bg-main">
              {image ? (
                <img
                  className="h-full w-full object-cover"
                  src={resolveMediaUrl(image.src)}
                  alt={image.alt ?? product.name}
                  fetchPriority="high"
                  decoding="async"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-secondary/40 px-6 text-center text-[0.62rem] tracking-[0.14em] text-muted uppercase">
                  Gambar produk belum tersedia
                </div>
              )}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {product.images.map((item, index) => (
                <button
                  className={`aspect-square overflow-hidden border ${
                    index === imageIndex ? "border-burgundy" : "border-transparent"
                  }`}
                  key={item.src}
                  type="button"
                  onClick={() => {
                    setImageIndex(index);
                    setShowColorImage(false);
                  }}
                  aria-label={`Lihat foto ${index + 1}`}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={resolveMediaUrl(item.src)}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.58rem] font-semibold tracking-[0.16em] text-muted uppercase">
              {[collection?.label ?? "Ji&Co", selectedColor?.name ?? product.color]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <h1 className="mt-2 font-display text-[clamp(2.6rem,4.8vw,4.4rem)] leading-[0.98] font-normal tracking-[-0.03em]">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[1.1rem] font-semibold">
                {formatPrice(product.whatsappPrice)}
              </span>
              <span className="text-[0.75rem] text-muted line-through">
                {formatPrice(product.shopeePrice)}
              </span>
              <span className="text-[0.56rem] font-semibold tracking-[0.12em] text-burgundy uppercase">
                Hemat {formatPrice(saving)} via WhatsApp
              </span>
            </div>

            <p className="mt-5 max-w-[32rem] text-[0.9rem] leading-[1.75] text-muted">
              {product.description}
            </p>

            {colors.length > 0 && (
              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <p className="text-[0.58rem] font-semibold tracking-[0.16em] uppercase">Warna</p>
                  <span className="text-[0.58rem] text-muted">
                    {selectedColor?.name ?? product.color}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      className={`flex min-h-10 items-center gap-2 border px-3 text-[0.65rem] transition-colors ${
                        selectedColor?.id === color.id
                          ? "border-burgundy bg-burgundy text-main"
                          : "border-line hover:border-burgundy"
                      }`}
                      key={color.id}
                      type="button"
                      onClick={() => {
                        setColorId(color.id);
                        setImageIndex(0);
                        setShowColorImage(true);
                      }}
                      aria-pressed={selectedColor?.id === color.id}
                    >
                      <span
                        className="size-4 rounded-full border border-black/10"
                        style={{ backgroundColor: color.hexCode || "transparent" }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-[0.58rem] font-semibold tracking-[0.16em] uppercase">Ukuran</p>
                <span className="text-[0.58rem] text-muted">
                  {availableSizes.length > 0 ? availableSizes.join(" · ") : "—"}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {availableSizes.length === 0 ? (
                  <p className="text-[0.72rem] text-muted">Ukuran belum tersedia.</p>
                ) : (
                  availableSizes.map((option) => (
                    <button
                      className={`grid min-h-11 min-w-12 place-items-center border px-3 text-[0.7rem] transition-colors ${
                        effectiveSize === option
                          ? "border-burgundy bg-burgundy text-main"
                          : "border-line hover:border-burgundy"
                      }`}
                      key={option}
                      type="button"
                      onClick={() => setSize(option)}
                    >
                      {option}
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border border-line">
                <button
                  className="grid size-11 place-items-center disabled:opacity-30"
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  disabled={quantity <= 1}
                  aria-label="Kurangi jumlah"
                >
                  <MinusIcon />
                </button>
                <span className="grid min-w-9 place-items-center text-[0.8rem]">{quantity}</span>
                <button
                  className="grid size-11 place-items-center"
                  type="button"
                  onClick={() => setQuantity((value) => Math.min(9, value + 1))}
                  aria-label="Tambah jumlah"
                >
                  <PlusIcon />
                </button>
              </div>
              <button
                className="btn btn-brand min-h-12 flex-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={handleAdd}
                disabled={!effectiveSize}
              >
                {added ? "Ditambahkan" : "Tambah ke Keranjang"}
              </button>
            </div>

            <button
              className="btn btn-outline mt-3 min-h-12 w-full disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              onClick={handleBuyNow}
              disabled={!effectiveSize}
            >
              Beli Sekarang
            </button>

            <div className="mt-5">
              <PromoBanner compact />
            </div>

            <div className="mt-7 border-t border-line pt-5">
              <p className="text-[0.58rem] font-semibold tracking-[0.16em] uppercase">Detail</p>
              <ul className="mt-3 flex flex-col gap-1.5 text-[0.8rem] leading-[1.6] text-muted">
                {product.details.map((detail) => (
                  <li key={detail}>— {detail}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.62rem] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <WhatsAppIcon size={13} />
                Harga spesial via WhatsApp
              </span>
              <a
                className="underline underline-offset-2 transition-colors hover:text-accent"
                href={product.shopeeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Checkout Shopee: QRIS, ShopeePay, PayLater
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

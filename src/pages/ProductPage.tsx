import { useState } from 'react'
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { brand, formatPrice } from '../brand'
import { collections, getProduct } from '../catalog'
import Footer from '../components/Footer'
import { ArrowLeft, MinusIcon, PlusIcon, WhatsAppIcon } from '../components/Icons'
import Seo from '../components/Seo'
import PromoBanner from '../components/shop/PromoBanner'
import ShopHeader from '../components/shop/ShopHeader'
import { useCart } from '../context/CartContext'

export default function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug ?? '')
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [size, setSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const [added, setAdded] = useState(false)

  if (!product) return <Navigate to="/catalog" replace />

  const collection = collections.find((item) => item.id === product.collection)
  const image = product.images[imageIndex] ?? product.images[0]
  const saving = product.shopeePrice - product.whatsappPrice
  const origin = window.location.origin
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((item) => `${origin}${item.src}`),
    brand: { '@type': 'Brand', name: brand.name },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      price: product.whatsappPrice,
      availability: 'https://schema.org/InStock',
      url: `${origin}/catalog/${product.slug}`,
    },
  }

  const handleAdd = () => {
    addItem(product.id, size, quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
  }

  const handleBuyNow = () => {
    addItem(product.id, size, quantity)
    navigate('/checkout')
  }

  return (
    <>
      <Seo
        title={`${product.name} — Ji&Co`}
        description={`${product.name} dari koleksi ${collection?.label}. Tersedia S–XL. Checkout via WhatsApp atau Shopee.`}
        path={`/catalog/${product.slug}`}
        image={product.images[0]?.src}
        type="product"
        jsonLd={jsonLd}
      />
      <ShopHeader />
      <main id="main" className="bg-main">
        <div className="container-page pt-8 pb-6">
          <Link
            className="inline-flex items-center gap-2 text-[0.58rem] font-semibold tracking-[0.14em] text-muted uppercase transition-colors hover:text-accent"
            to="/catalog"
          >
            <ArrowLeft size={13} />
            Kembali ke katalog
          </Link>
        </div>

        <section className="container-page grid gap-10 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <div className="aspect-[3/4] overflow-hidden bg-main">
              <img
                className="h-full w-full object-cover"
                src={image.src}
                alt={image.alt}
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {product.images.map((item, index) => (
                <button
                  className={`aspect-square overflow-hidden border ${
                    index === imageIndex
                      ? 'border-burgundy'
                      : 'border-transparent'
                  }`}
                  key={item.src}
                  type="button"
                  onClick={() => setImageIndex(index)}
                  aria-label={`Lihat foto ${index + 1}`}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.58rem] font-semibold tracking-[0.16em] text-muted uppercase">
              {collection?.label} · {product.color}
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

            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-[0.58rem] font-semibold tracking-[0.16em] uppercase">
                  Ukuran
                </p>
                <span className="text-[0.58rem] text-muted">S–XL</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((option) => (
                  <button
                    className={`grid min-h-11 min-w-12 place-items-center border px-3 text-[0.7rem] transition-colors ${
                      size === option
                        ? 'border-burgundy bg-burgundy text-main'
                        : 'border-line hover:border-burgundy'
                    }`}
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                  >
                    {option}
                  </button>
                ))}
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
                <span className="grid min-w-9 place-items-center text-[0.8rem]">
                  {quantity}
                </span>
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
                className="btn btn-brand min-h-12 flex-1"
                type="button"
                onClick={handleAdd}
              >
                {added ? 'Ditambahkan' : 'Tambah ke Keranjang'}
              </button>
            </div>

            <button
              className="btn btn-outline mt-3 min-h-12 w-full"
              type="button"
              onClick={handleBuyNow}
            >
              Beli Sekarang
            </button>

            <div className="mt-5">
              <PromoBanner compact />
            </div>

            <div className="mt-7 border-t border-line pt-5">
              <p className="text-[0.58rem] font-semibold tracking-[0.16em] uppercase">
                Detail
              </p>
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
  )
}

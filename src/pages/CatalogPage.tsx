import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { catalogProducts, collections } from '../catalog'
import Footer from '../components/Footer'
import Seo from '../components/Seo'
import CatalogProductCard from '../components/shop/CatalogProductCard'
import PromoBanner from '../components/shop/PromoBanner'
import ShopHeader from '../components/shop/ShopHeader'

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selected = searchParams.get('collection')
  const activeCollection = collections.some((item) => item.id === selected)
    ? selected
    : 'all'

  const products = useMemo(
    () =>
      activeCollection === 'all'
        ? catalogProducts
        : catalogProducts.filter(
            (product) => product.collection === activeCollection,
          ),
    [activeCollection],
  )

  const setCollection = (value: string) => {
    if (value === 'all') {
      searchParams.delete('collection')
      setSearchParams(searchParams)
      return
    }
    setSearchParams({ collection: value })
  }

  const activeLabel = collections.find(
    (collection) => collection.id === activeCollection,
  )

  return (
    <>
      <Seo
        title="Katalog — Ji&Co"
        description="Jelajahi koleksi Chongsam dan Blush dari Ji&Co. Pilih atasan, ukuran S–XL, dan checkout melalui WhatsApp atau Shopee."
        path="/catalog"
        image="/catalog/chongsam/ivory-1.webp"
      />
      <ShopHeader />
      <main id="main" className="bg-main">
        <section className="container-page pt-12 pb-10 sm:pt-16 sm:pb-14">
          <p className="eyebrow">Catalog — Chongsam &amp; Blush</p>
          <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h1 className="section-title max-w-[13ch]">
              The <em className="italic text-accent">collection.</em>
            </h1>
            <p className="max-w-[30rem] text-[0.92rem] leading-[1.75] text-muted">
              Atasan pilihan yang dibuat untuk dipadukan dengan ritme harimu.
              Pilih ukuran, masukkan ke keranjang, lalu checkout dengan cara
              yang paling nyaman untukmu.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {[{ id: 'all', label: 'All' }, ...collections].map((collection) => (
              <button
                className={`min-h-10 rounded-full border px-4 text-[0.58rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
                  activeCollection === collection.id
                    ? 'border-burgundy bg-burgundy text-main'
                    : 'border-line bg-transparent text-ink hover:border-burgundy'
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
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
            {products.map((product) => (
              <CatalogProductCard key={product.id} product={product} />
            ))}
          </div>
          <p className="mt-10 text-[0.68rem] leading-[1.7] text-muted">
            Harga via WhatsApp adalah harga spesial. Harga Shopee mengikuti
            harga yang tertera di toko Shopee. Ketersediaan dikonfirmasi saat
            checkout.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}

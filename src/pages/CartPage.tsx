import { Link } from 'react-router-dom'
import { formatPrice } from '../brand'
import Footer from '../components/Footer'
import { MinusIcon, PlusIcon, TrashIcon } from '../components/Icons'
import Seo from '../components/Seo'
import ShopHeader from '../components/shop/ShopHeader'
import { useCart } from '../context/CartContext'
import { resolveMediaUrl } from '../lib/api'

export default function CartPage() {
  const {
    lines,
    count,
    whatsappTotal,
    shopeeTotal,
    updateQuantity,
    removeItem,
  } = useCart()

  return (
    <>
      <Seo
        title="Keranjang — Ji&Co"
        description="Keranjang belanja Ji&Co."
        path="/cart"
        noindex
      />
      <ShopHeader />
      <main id="main" className="min-h-[60vh] bg-main">
        <section className="container-page py-12 sm:py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Your Selection</p>
              <h1 className="section-title">
                Keranjang <em className="italic text-accent">kamu.</em>
              </h1>
            </div>
            <Link
              className="text-link hidden sm:inline-flex"
              to="/catalog"
            >
              Lanjut belanja
            </Link>
          </div>

          {lines.length === 0 ? (
            <div className="mt-12 border-y border-line py-16 text-center">
              <p className="font-display text-[2rem]">Keranjang masih kosong.</p>
              <p className="mx-auto mt-3 max-w-[28rem] text-[0.88rem] leading-[1.7] text-muted">
                Temukan atasan favoritmu dari koleksi Chongsam dan Blush.
              </p>
              <Link className="btn btn-brand mt-7 min-h-12" to="/catalog">
                Jelajahi Katalog
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
              <div className="border-t border-line">
                {lines.map((line) => {
                  return (
                    <div
                      className="flex gap-4 border-b border-line py-5 sm:gap-6"
                      key={`${line.productId}-${line.size}`}
                    >
                      <Link
                        className="w-24 shrink-0 overflow-hidden bg-main sm:w-28"
                        to={`/catalog/${line.slug}`}
                      >
                        <img
                          className="aspect-[3/4] h-full w-full object-cover"
                          src={resolveMediaUrl(line.image)}
                          alt={line.name}
                        />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[0.54rem] tracking-[0.14em] text-muted uppercase">
                              {line.color} · Size {line.size}
                            </p>
                            <Link
                              className="mt-1 font-display text-[1.35rem] leading-[1.1] hover:text-accent"
                              to={`/catalog/${line.slug}`}
                            >
                              {line.name}
                            </Link>
                          </div>
                          <p className="shrink-0 text-[0.75rem] font-semibold">
                            {formatPrice(line.whatsappPrice * line.quantity)}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                          <div className="flex items-center border border-line">
                            <button
                              className="grid size-9 place-items-center disabled:opacity-30"
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  line.productId,
                                  line.size,
                                  line.quantity - 1,
                                )
                              }
                              disabled={line.quantity <= 1}
                              aria-label="Kurangi jumlah"
                            >
                              <MinusIcon size={12} />
                            </button>
                            <span className="grid min-w-8 place-items-center text-[0.75rem]">
                              {line.quantity}
                            </span>
                            <button
                              className="grid size-9 place-items-center"
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  line.productId,
                                  line.size,
                                  line.quantity + 1,
                                )
                              }
                              aria-label="Tambah jumlah"
                            >
                              <PlusIcon size={12} />
                            </button>
                          </div>
                          <button
                            className="grid size-8 place-items-center text-muted transition-colors hover:text-accent"
                            type="button"
                            onClick={() => removeItem(line.productId, line.size)}
                            aria-label={`Hapus ${line.name}`}
                          >
                            <TrashIcon size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <aside className="h-fit border border-line bg-white p-6 sm:p-8">
                <p className="text-[0.58rem] font-semibold tracking-[0.16em] uppercase">
                  Ringkasan
                </p>
                <div className="mt-5 flex flex-col gap-3 text-[0.82rem]">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted">Jumlah item</span>
                    <span>{count}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted">Total via WhatsApp</span>
                    <span className="font-semibold">
                      {formatPrice(whatsappTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4 text-[0.72rem] text-muted">
                    <span>Harga Shopee</span>
                    <span className="line-through">
                      {formatPrice(shopeeTotal)}
                    </span>
                  </div>
                </div>
                <p className="mt-4 border-t border-line pt-4 text-[0.68rem] leading-[1.6] text-muted">
                  Harga spesial WhatsApp sudah diterapkan. Checkout Shopee
                  tersedia untuk pembayaran instan via QRIS, ShopeePay, dan
                  PayLater.
                </p>
                <Link
                  className="btn btn-brand mt-6 min-h-12 w-full"
                  to="/checkout"
                >
                  Lanjut ke Checkout
                </Link>
                <Link
                  className="mt-4 block text-center text-[0.6rem] font-semibold tracking-[0.12em] text-muted uppercase hover:text-accent sm:hidden"
                  to="/catalog"
                >
                  Lanjut belanja
                </Link>
              </aside>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

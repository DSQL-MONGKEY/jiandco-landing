import { Link } from 'react-router-dom'
import { brand, formatPrice } from '../brand'
import { shopeeStoreUrl } from '../catalog'
import Footer from '../components/Footer'
import { ArrowUpRight, WhatsAppIcon } from '../components/Icons'
import Seo from '../components/Seo'
import PromoBanner from '../components/shop/PromoBanner'
import ShopHeader from '../components/shop/ShopHeader'
import { getProduct, useCart } from '../context/CartContext'

export default function CheckoutPage() {
  const { lines, whatsappTotal, shopeeTotal } = useCart()

  const resolved = lines.flatMap((line) => {
    const product = getProduct(line.productId)
    return product ? [{ line, product }] : []
  })

  const orderText = resolved
    .map(
      ({ line, product }) =>
        `- ${product.name} (${product.color}) size ${line.size} x${line.quantity} — ${formatPrice(product.whatsappPrice * line.quantity)}`,
    )
    .join('\n')

  const whatsappHref = `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(
    `Halo ${brand.name}, saya ingin checkout pesanan berikut:\n${orderText}\n\nTotal via WhatsApp: ${formatPrice(whatsappTotal)}`,
  )}`

  return (
    <>
      <Seo
        title="Checkout — Ji&Co"
        description="Checkout pesanan Ji&Co melalui WhatsApp atau Shopee."
        path="/checkout"
        noindex
      />
      <ShopHeader />
      <main id="main" className="min-h-[60vh] bg-main">
        <section className="container-page py-12 sm:py-16">
          <p className="eyebrow">Final Step</p>
          <h1 className="section-title">
            Checkout <em className="italic text-accent">pesananmu.</em>
          </h1>

          {resolved.length === 0 ? (
            <div className="mt-12 border-y border-line py-16 text-center">
              <p className="font-display text-[2rem]">
                Belum ada pesanan untuk di-checkout.
              </p>
              <Link className="btn btn-brand mt-7 min-h-12" to="/catalog">
                Jelajahi Katalog
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-8">
                <PromoBanner compact />
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                <div className="border border-line bg-white p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.58rem] font-semibold tracking-[0.16em] uppercase">
                      Pesanan Kamu
                    </p>
                    <Link
                      className="text-[0.58rem] tracking-[0.12em] text-muted uppercase hover:text-accent"
                      to="/cart"
                    >
                      Ubah
                    </Link>
                  </div>
                  <div className="mt-5 border-t border-line">
                    {resolved.map(({ line, product }) => (
                      <div
                        className="flex gap-4 border-b border-line py-4"
                        key={`${line.productId}-${line.size}`}
                      >
                        <div className="w-16 shrink-0 overflow-hidden bg-main">
                          <img
                            className="aspect-[3/4] h-full w-full object-cover"
                            src={product.images[0].src}
                            alt={product.images[0].alt}
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                          <div>
                            <p className="font-display text-[1.1rem] leading-[1.1]">
                              {product.name}
                            </p>
                            <p className="mt-1 text-[0.6rem] text-muted">
                              Size {line.size} · Qty {line.quantity}
                            </p>
                          </div>
                          <p className="shrink-0 text-[0.72rem] font-semibold">
                            {formatPrice(
                              product.whatsappPrice * line.quantity,
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex justify-between text-[0.85rem]">
                    <span className="text-muted">Total via WhatsApp</span>
                    <span className="font-semibold">
                      {formatPrice(whatsappTotal)}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-[0.72rem] text-muted">
                    <span>Total harga Shopee</span>
                    <span className="line-through">
                      {formatPrice(shopeeTotal)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="border border-burgundy/20 bg-white p-6 sm:p-8">
                    <p className="text-[0.56rem] font-semibold tracking-[0.16em] text-burgundy uppercase">
                      Opsi 1 · Harga Lebih Hemat
                    </p>
                    <h2 className="mt-2 font-display text-[2rem] leading-[1.05]">
                      Checkout via WhatsApp
                    </h2>
                    <p className="mt-3 text-[0.82rem] leading-[1.7] text-muted">
                      Pesan langsung ke admin untuk harga spesial, konfirmasi
                      stok, dan ongkir. Pesananmu sudah tersusun otomatis di
                      pesan WhatsApp.
                    </p>
                    <a
                      className="btn btn-brand mt-5 min-h-12 w-full"
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <WhatsAppIcon size={16} />
                      Pesan via WhatsApp
                    </a>
                  </div>

                  <div className="border border-line bg-white p-6 sm:p-8">
                    <p className="text-[0.56rem] font-semibold tracking-[0.16em] text-muted uppercase">
                      Opsi 2 · Pembayaran Instan
                    </p>
                    <h2 className="mt-2 font-display text-[2rem] leading-[1.05]">
                      Checkout via Shopee
                    </h2>
                    <p className="mt-3 text-[0.82rem] leading-[1.7] text-muted">
                      Bayar instan dengan QRIS, ShopeePay, atau PayLater.
                      Selesaikan pembayaran di Shopee, lalu kirim bukti pesanan
                      ke WhatsApp bila diperlukan.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {['QRIS', 'ShopeePay', 'PayLater'].map((method) => (
                        <span
                          className="border border-line px-2.5 py-1 text-[0.54rem] font-semibold tracking-[0.1em] text-muted uppercase"
                          key={method}
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                    {resolved.length === 1 ? (
                      <a
                        className="btn btn-outline mt-5 min-h-12 w-full"
                        href={resolved[0].product.shopeeUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Checkout di Shopee
                        <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <div className="mt-5 flex flex-col gap-2">
                        {resolved.map(({ line, product }) => (
                          <a
                            className="flex items-center justify-between border border-line px-3 py-3 text-[0.7rem] transition-colors hover:border-burgundy"
                            href={product.shopeeUrl}
                            target="_blank"
                            rel="noreferrer"
                            key={`${line.productId}-${line.size}`}
                          >
                            <span>
                              {product.name} · {line.size} · x{line.quantity}
                            </span>
                            <ArrowUpRight size={13} />
                          </a>
                        ))}
                        <a
                          className="mt-1 text-center text-[0.58rem] tracking-[0.1em] text-muted uppercase underline underline-offset-2 hover:text-accent"
                          href={shopeeStoreUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Buka toko Shopee Ji&Co
                        </a>
                      </div>
                    )}
                    <p className="mt-4 text-[0.65rem] leading-[1.6] text-muted">
                      Shopee tidak mendukung checkout multi-item melalui satu
                      tautan. Untuk beberapa item, selesaikan tiap produk di
                      Shopee atau gunakan WhatsApp untuk satu pesanan.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

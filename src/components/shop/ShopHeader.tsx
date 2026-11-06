import { Link } from 'react-router-dom'
import { useCatalog } from '../../context/CatalogContext'
import { useCart } from '../../context/CartContext'
import { BagIcon } from '../Icons'
import Wordmark from '../Wordmark'

export default function ShopHeader() {
  const { count } = useCart()
  const { data } = useCatalog()
  const promo = data?.promo

  return (
    <>
      <div className="bg-burgundy px-4 py-2 text-center text-[0.55rem] font-medium tracking-[0.18em] text-main/90 uppercase">
        {promo?.badge ?? 'Harga Spesial WhatsApp'} — lebih hemat dibanding Shopee
      </div>
      <header className="sticky top-0 z-40 border-b border-line bg-main/95 backdrop-blur-md">
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            className="shrink-0"
            to="/"
            aria-label="Ji&Co — kembali ke home"
          >
            <Wordmark className="text-[1.75rem]" />
          </Link>

          <nav className="flex items-center gap-5 sm:gap-7">
            <Link
              className="hidden text-[0.6rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:text-accent sm:block"
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-[0.6rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:text-accent"
              to="/catalog"
            >
              Catalog
            </Link>
            <Link
              className="flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:text-accent"
              to="/cart"
              aria-label={`Keranjang, ${count} item`}
            >
              <BagIcon size={17} />
              <span className="grid size-5 place-items-center rounded-full bg-burgundy text-[0.55rem] text-main">
                {count}
              </span>
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}

import { useEffect, type CSSProperties } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { brand } from './brand'
import { CatalogProvider } from './context/CatalogContext'
import { CartProvider } from './context/CartContext'
import CartPage from './pages/CartPage'
import CatalogPage from './pages/CatalogPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'

const themeStyle = (() => {
  const style: Record<string, string> = {}

  Object.entries(brand.theme.colors).forEach(([name, value]) => {
    style[`--${name}`] = value
  })

  style['--brand-display'] = brand.theme.fonts.display
  style['--brand-body'] = brand.theme.fonts.body

  return style as CSSProperties
})()

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 60)
      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <CatalogProvider>
        <CartProvider>
        <div
          className="min-h-screen overflow-x-clip bg-main font-body text-ink"
          style={themeStyle}
        >
          <ScrollManager />
          <a
            className="fixed top-4 left-4 z-[200] -translate-y-[200%] bg-ink px-4 py-3 text-[0.65rem] font-semibold tracking-[0.14em] text-white uppercase transition-transform focus:translate-y-0"
            href="#main"
          >
            Lewati ke konten
          </a>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        </CartProvider>
      </CatalogProvider>
    </BrowserRouter>
  )
}

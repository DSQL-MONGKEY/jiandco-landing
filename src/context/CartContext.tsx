import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { catalogProducts, type CatalogProduct } from '../catalog'

export type CartLine = {
  productId: string
  size: string
  quantity: number
}

type CartContextValue = {
  lines: CartLine[]
  count: number
  whatsappTotal: number
  shopeeTotal: number
  addItem: (productId: string, size: string, quantity?: number) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  removeItem: (productId: string, size: string) => void
  clearCart: () => void
}

const STORAGE_KEY = 'jico-cart'

const CartContext = createContext<CartContextValue | null>(null)

export function getProduct(productId: string): CatalogProduct | undefined {
  return catalogProducts.find((product) => product.id === productId)
}

function readCart(): CartLine[] {
  if (typeof window === 'undefined') return []

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (line): line is CartLine =>
        typeof line?.productId === 'string' &&
        typeof line?.size === 'string' &&
        typeof line?.quantity === 'number' &&
        Boolean(getProduct(line.productId)),
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readCart)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines])

  const addItem = (productId: string, size: string, quantity = 1) => {
    setLines((current) => {
      const existing = current.find(
        (line) => line.productId === productId && line.size === size,
      )

      if (existing) {
        return current.map((line) =>
          line === existing
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        )
      }

      return [...current, { productId, size, quantity }]
    })
  }

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    setLines((current) =>
      current.map((line) =>
        line.productId === productId && line.size === size
          ? { ...line, quantity: Math.max(1, quantity) }
          : line,
      ),
    )
  }

  const removeItem = (productId: string, size: string) => {
    setLines((current) =>
      current.filter(
        (line) => !(line.productId === productId && line.size === size),
      ),
    )
  }

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((total, line) => total + line.quantity, 0)
    const whatsappTotal = lines.reduce((total, line) => {
      const product = getProduct(line.productId)
      return total + (product?.whatsappPrice ?? 0) * line.quantity
    }, 0)
    const shopeeTotal = lines.reduce((total, line) => {
      const product = getProduct(line.productId)
      return total + (product?.shopeePrice ?? 0) * line.quantity
    }, 0)

    return {
      lines,
      count,
      whatsappTotal,
      shopeeTotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart: () => setLines([]),
    }
  }, [lines])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

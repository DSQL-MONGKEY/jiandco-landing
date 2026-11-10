import { createContext } from "react";
import type { CatalogColor, CatalogProduct } from "../lib/api";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  color: string;
  colorId: string;
  colorName: string;
  image: string;
  whatsappPrice: number;
  shopeePrice: number;
  shopeeUrl: string;
  size: string;
  quantity: number;
};

export type CartContextValue = {
  lines: CartLine[];
  count: number;
  whatsappTotal: number;
  shopeeTotal: number;
  addItem: (product: CatalogProduct, size: string, quantity?: number, color?: CatalogColor) => void;
  updateQuantity: (productId: string, colorId: string, size: string, quantity: number) => void;
  removeItem: (productId: string, colorId: string, size: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

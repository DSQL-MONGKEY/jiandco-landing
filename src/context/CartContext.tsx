import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { CatalogColor, CatalogProduct } from "../lib/api";
import { CartContext, type CartContextValue, type CartLine } from "./cart-context";

const STORAGE_KEY = "jico-cart";

function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (line): line is CartLine =>
          typeof line?.productId === "string" &&
          typeof line?.slug === "string" &&
          typeof line?.name === "string" &&
          typeof line?.image === "string" &&
          typeof line?.whatsappPrice === "number" &&
          typeof line?.size === "string" &&
          typeof line?.quantity === "number",
      )
      .map((line) => ({
        ...line,
        color: line.color || "",
        colorId: line.colorId || line.color || "",
        colorName: line.colorName || line.color || "",
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readCart);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const addItem = (product: CatalogProduct, size: string, quantity = 1, color?: CatalogColor) => {
    setLines((current) => {
      const colorId = color?.id ?? product.color;
      const existing = current.find(
        (line) => line.productId === product.id && line.colorId === colorId && line.size === size,
      );

      if (existing) {
        return current.map((line) =>
          line === existing ? { ...line, quantity: line.quantity + quantity } : line,
        );
      }

      return [
        ...current,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          color: color?.name ?? product.color,
          colorId,
          colorName: color?.name ?? product.color,
          image: color?.image?.src ?? product.images[0]?.src ?? "",
          whatsappPrice: product.whatsappPrice,
          shopeePrice: product.shopeePrice,
          shopeeUrl: product.shopeeUrl,
          size,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (productId: string, colorId: string, size: string, quantity: number) => {
    setLines((current) =>
      current.map((line) =>
        line.productId === productId && line.colorId === colorId && line.size === size
          ? { ...line, quantity: Math.max(1, quantity) }
          : line,
      ),
    );
  };

  const removeItem = (productId: string, colorId: string, size: string) => {
    setLines((current) =>
      current.filter(
        (line) => !(line.productId === productId && line.colorId === colorId && line.size === size),
      ),
    );
  };

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((total, line) => total + line.quantity, 0);
    const whatsappTotal = lines.reduce(
      (total, line) => total + line.whatsappPrice * line.quantity,
      0,
    );
    const shopeeTotal = lines.reduce((total, line) => total + line.shopeePrice * line.quantity, 0);

    return {
      lines,
      count,
      whatsappTotal,
      shopeeTotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

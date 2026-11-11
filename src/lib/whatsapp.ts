import { brand, formatPrice } from "../brand";
import type { CartLine } from "../context/cart-context";
import { getSiteUrl } from "./seo";

export function buildWhatsAppOrderMessage(lines: CartLine[], total: number) {
  const siteUrl = getSiteUrl();

  const items = lines
    .map((line, index) =>
      [
        `${index + 1}. ${line.name}`,
        `   Warna: ${line.colorName || line.color}`,
        `   Ukuran: ${line.size}`,
        `   Jumlah: ${line.quantity}`,
        `   Subtotal: ${formatPrice(line.whatsappPrice * line.quantity)}`,
        `   Produk: ${siteUrl}/catalog/${line.slug}`,
      ].join("\n"),
    )
    .join("\n\n");

  return [
    `Halo ${brand.name}, saya ingin melakukan pemesanan:`,
    "",
    items || "- (keranjang masih kosong)",
    "",
    `Total pesanan via WhatsApp: ${formatPrice(total)}`,
    "",
    "Mohon dibantu konfirmasi ketersediaan, ongkir, dan langkah pembayaran. Terima kasih.",
  ].join("\n");
}

export function buildWhatsAppOrderUrl(lines: CartLine[], total: number) {
  return `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(
    buildWhatsAppOrderMessage(lines, total),
  )}`;
}

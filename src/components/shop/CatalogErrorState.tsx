import { brand } from "../../brand";
import { WhatsAppIcon } from "../Icons";

type CatalogErrorStateProps = {
  title?: string;
  description?: string;
  onRetry: () => void;
};

export default function CatalogErrorState({
  title = "Katalog belum bisa dimuat.",
  description = "Koneksi ke katalog sedang terganggu. Coba muat ulang beberapa saat lagi, atau hubungi admin lewat WhatsApp untuk dibantu memilih produk.",
  onRetry,
}: CatalogErrorStateProps) {
  const whatsappHref = `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(
    `Halo ${brand.name}, saya sedang membuka katalog dan halaman katalog belum bisa dimuat. Mohon dibantu, terima kasih.`,
  )}`;

  return (
    <section className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-2xl border border-line bg-white p-8 text-center sm:p-12">
        <p className="eyebrow">Koneksi terputus</p>
        <h1 className="mt-4 font-display text-[clamp(2.2rem,7vw,3.8rem)] leading-[0.98] tracking-[-0.02em]">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[0.85rem] leading-[1.75] text-muted">
          {description}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button className="btn btn-brand min-h-12" type="button" onClick={onRetry}>
            Muat ulang katalog
          </button>
          <a
            className="btn btn-outline min-h-12"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon size={16} />
            Tanya via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

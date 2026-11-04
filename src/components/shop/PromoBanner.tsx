import { brand } from '../../brand'
import { promo } from '../../catalog'
import { ArrowUpRight, WhatsAppIcon } from '../Icons'

type Props = {
  compact?: boolean
}

export default function PromoBanner({ compact = false }: Props) {
  const href = `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(
    brand.contact.whatsappMessage,
  )}`

  if (compact) {
    return (
      <div className="flex flex-col gap-3 border border-burgundy/20 bg-secondary/60 p-4 text-ink sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.56rem] font-semibold tracking-[0.16em] text-burgundy uppercase">
            {promo.badge}
          </p>
          <p className="mt-1 text-[0.78rem] leading-[1.6]">
            {promo.description}
          </p>
        </div>
        <a
          className="text-link shrink-0 text-burgundy"
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          Tanya via WhatsApp
          <ArrowUpRight size={13} />
        </a>
      </div>
    )
  }

  return (
    <section className="bg-burgundy text-main">
      <div className="container-page grid gap-6 py-7 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-[42rem]">
          <span className="inline-flex items-center gap-2 bg-secondary px-3 py-1.5 text-[0.55rem] font-semibold tracking-[0.15em] text-burgundy uppercase">
            <WhatsAppIcon size={13} />
            {promo.badge}
          </span>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.05] font-normal">
            {promo.title}
          </h2>
          <p className="mt-2 text-[0.82rem] leading-[1.65] text-main/70">
            {promo.description}
          </p>
        </div>
        <a
          className="btn btn-cream min-h-12 shrink-0"
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon size={15} />
          Chat Admin
        </a>
      </div>
    </section>
  )
}

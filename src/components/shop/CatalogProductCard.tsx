import { Link } from 'react-router-dom'
import { formatPrice } from '../../brand'
import { collections, type CatalogProduct } from '../../catalog'

type Props = {
  product: CatalogProduct
}

export default function CatalogProductCard({ product }: Props) {
  const collection = collections.find((item) => item.id === product.collection)
  const primaryImage = product.images[0]

  return (
    <Link
      className="group flex min-w-0 flex-col"
      to={`/catalog/${product.slug}`}
      aria-label={`Lihat ${product.name}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-main">
        <img
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.04]"
          src={primaryImage.src}
          alt={primaryImage.alt}
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-3.5 left-3.5 bg-burgundy px-2.5 py-1.5 text-[0.5rem] leading-none font-semibold tracking-[0.14em] text-main uppercase">
            {product.badge}
          </span>
        )}
        <span className="absolute inset-x-3.5 bottom-3.5 flex min-h-[2.5rem] translate-y-2 items-center justify-center bg-white/95 text-[0.56rem] font-semibold tracking-[0.14em] text-ink uppercase opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-md:translate-y-0 max-md:opacity-100">
          Lihat Detail
        </span>
      </div>
      <div className="flex flex-col gap-1 pt-4">
        <p className="text-[0.54rem] font-medium tracking-[0.14em] text-muted uppercase">
          {collection?.label} · {product.color}
        </p>
        <h3 className="font-display text-[clamp(1.25rem,1.7vw,1.55rem)] leading-[1.15] font-medium tracking-[-0.02em]">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-[0.72rem] font-semibold">
            {formatPrice(product.whatsappPrice)}
          </span>
          <span className="text-[0.6rem] text-muted line-through">
            {formatPrice(product.shopeePrice)}
          </span>
          <span className="text-[0.5rem] tracking-[0.08em] text-burgundy uppercase">
            via WA
          </span>
        </div>
      </div>
    </Link>
  )
}

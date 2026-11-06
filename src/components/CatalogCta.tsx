import { Link } from 'react-router-dom'
import { catalogCta as fallbackCta } from '../catalog'
import { useCatalog } from '../context/CatalogContext'
import { resolveMediaUrl } from '../lib/api'
import { ArrowUpRight } from './Icons'
import Reveal from './Reveal'

export default function CatalogCta() {
  const { data } = useCatalog()
  const cta = data?.cta
  const catalogCta = {
    eyebrow: cta?.eyebrow || fallbackCta.eyebrow,
    title: cta?.title || fallbackCta.title,
    titleAccent: cta?.titleAccent || fallbackCta.titleAccent,
    description: cta?.description || fallbackCta.description,
    cta: cta?.label || fallbackCta.cta,
    image: resolveMediaUrl(cta?.imageUrl) || fallbackCta.image,
    imageAlt: fallbackCta.imageAlt,
    secondaryImage: resolveMediaUrl(cta?.secondaryImageUrl) || fallbackCta.secondaryImage,
    secondaryImageAlt: fallbackCta.secondaryImageAlt,
  }

  return (
    <section className="section-space bg-white">
      <div className="container-page grid items-center gap-[clamp(2.5rem,6vw,6rem)] lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="eyebrow">{catalogCta.eyebrow}</p>
          <h2 className="section-title">
            {catalogCta.title}{' '}
            <em className="italic text-accent">{catalogCta.titleAccent}</em>
          </h2>
          <p className="mt-6 max-w-[28rem] text-[0.94rem] leading-[1.8] text-muted">
            {catalogCta.description}
          </p>
          <Link className="btn btn-brand mt-8 min-h-12" to="/catalog">
            {catalogCta.cta}
            <ArrowUpRight size={14} />
          </Link>
        </Reveal>

        <Reveal className="grid grid-cols-[0.9fr_1.1fr] items-start gap-4 sm:gap-6" delay={100}>
          <div className="aspect-[3/4] overflow-hidden bg-main">
            <img
              className="h-full w-full object-cover"
              src={catalogCta.image}
              alt={catalogCta.imageAlt}
              loading="lazy"
            />
          </div>
          <div className="mt-12 aspect-[3/4] overflow-hidden bg-main sm:mt-20">
            <img
              className="h-full w-full object-cover"
              src={catalogCta.secondaryImage}
              alt={catalogCta.secondaryImageAlt}
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { brand } from '../brand'
import { ArrowRight, ArrowUpRight } from './Icons'
import Reveal from './Reveal'

export default function BlushEdit() {
  const edit = brand.blushEdit

  return (
    <section
      className="section-space scroll-mt-24 overflow-hidden bg-secondary text-ink"
      id="blush-edit"
    >
      <div className="container-page grid grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] items-center gap-[clamp(2.5rem,6vw,6rem)] max-[960px]:grid-cols-1 max-[960px]:gap-10">
        <Reveal className="max-[960px]:max-w-[40rem]">
          <p className="flex items-center gap-3 text-[0.63rem] leading-[1.4] font-bold tracking-[0.22em] text-ink uppercase before:h-px before:w-7 before:shrink-0 before:bg-current">
            {edit.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-[clamp(3.1rem,6.1vw,5.7rem)] leading-[0.9] font-normal tracking-[-0.04em] text-balance">
            {edit.title}{' '}
            <em className="italic text-accent">{edit.titleAccent}</em>
          </h2>
          <p className="mt-6 max-w-[30rem] text-[0.96rem] leading-[1.8] text-ink/70">
            {edit.description}
          </p>

          <ul className="mt-8 border-t border-ink/20">
            {edit.points.map((point, index) => (
              <li
                className="flex justify-between gap-6 border-b border-ink/20 py-3 text-[0.58rem] leading-[1.5] font-semibold tracking-[0.15em] uppercase"
                key={point}
              >
                <span>{point}</span>
                <span className="opacity-50">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-[2.1rem] flex flex-wrap items-center gap-[1.6rem]">
            <Link className="btn btn-brand min-h-12" to={edit.primaryCta.href}>
              {edit.primaryCta.label}
              <ArrowUpRight size={14} />
            </Link>
            <a className="text-link" href={edit.secondaryCta.href}>
              {edit.secondaryCta.label}
              <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>

        <Reveal
          className="max-[960px]:w-full max-[960px]:max-w-[34rem]"
          delay={120}
        >
          <figure className="p-[clamp(0.75rem,1.5vw,1.1rem)] bg-white">
            <div className="aspect-[4/5] overflow-hidden bg-sand">
              <img
                className="h-full w-full object-cover object-[50%_34%]"
                src={edit.image}
                alt={edit.imageAlt}
                loading="lazy"
              />
            </div>
            <figcaption className="flex justify-between gap-4 pt-[0.85rem] text-[0.54rem] leading-[1.5] tracking-[0.15em] text-muted uppercase max-sm:text-[0.49rem]">
              <span>{edit.captionLeft}</span>
              <span>{edit.captionRight}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
